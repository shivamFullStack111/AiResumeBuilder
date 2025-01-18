import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./user/SignIn";
import Home from "./home/Home";
import EditResume from "./resumeEdit/EditResume";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in*" element={<SignIn />} />
        <Route path="/resume/:resumeid/edit/" element={<EditResume />} />
      </Routes>
    </BrowserRouter>
  );
}
