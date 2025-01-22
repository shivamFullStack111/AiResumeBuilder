const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./graphql/mainGraphQl");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: "dosyxpa1r",
  api_key: "765438266656881",
  api_secret: "9cT_7OJZJHZtz_EsrTNKzsXeCOA",
});
const upload = multer({
  storage: multer.diskStorage({}),
});

const mongoose = require("mongoose");
const { Resumes } = require("./schemas/resumeSchema");
mongoose
  .connect(
    "mongodb+srv://shivam111:shivam111@cluster0.rpeveqo.mongodb.net/AiResumeBuilder?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connection established"))
  .catch((error) => console.log(error.message));

app.get("/health", (req, res) => {
  res.status(200).send("Server is running!");
});

app.post("/upload-image", upload.single("file"), async (req, res) => {
  try {
    const { resumeId, userEmail } = req.body;

    console.log(req.body);

    const resume = await Resumes.findById(resumeId);

    // if (!resume) throw new Error("resume not found");

    if (resume.userEmail !== userEmail)
      return res.send({ erroe: "this not yours" });

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    resume.imageUrl = result?.secure_url;

    await resume.save();

    return res.send({
      success: true,
      message: "image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.log(error.message);
  }
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));
};

startServer();

app.listen(5050, async () => {
  console.log("server is running on port 8000");
});
