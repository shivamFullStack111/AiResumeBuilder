import html2canvas from "html2canvas";
import jsPDF from "jspdf";



export const downloadResume = async (resumeRef) => {
  const element = resumeRef.current; // Target the resume div

  // Increase canvas quality
  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better resolution
    useCORS: true, // To avoid cross-origin issues
  });

  const data = canvas.toDataURL("image/png"); // Convert canvas to image
  const pdf = new jsPDF("p", "mm", "a4"); // A4 size PDF

  const imgWidth = 210; // PDF width in mm
  const pageHeight = 297; // PDF height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  let heightLeft = imgHeight;
  let position = 0;

  // Add the first page
  pdf.addImage(data, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Add additional pages if the content overflows
  while (heightLeft > 0) {
    position = heightLeft - imgHeight; // Adjust position for the new page
    pdf.addPage();
    pdf.addImage(data, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("resume.pdf"); // Save the PDF
};