import coursImg from "../source/غلاف الكورس المخصص.jpg"; // Main course image
import photoshopLogo from "../source/photoshop.png"; // Photoshop logo
import illustratorLogo from "../source/illustrator.png"; // Illustrator logo
import indesignLogo from "../source/InDesign.png"; // InDesign logo
import premiereProLogo from "../source/premiereProLogo.png"; // Premiere Pro logo

const courses = [
  {
    id: 1,
    title: "Special Course",
    img: coursImg,
    instructor: "Eng.Mahmoud ELKhawaga",
    price: 4000,
    description:
      "This course covers four major programs: Photoshop, Illustrator, InDesign, and Premiere Pro. You'll learn everything from installation to mastering tools, specific use cases for photography, social media, digital prints, logo design, video editing, and more. The course duration is 80 days, with 40 videos and 40 Zoom sessions (live group workshops). Perfect for those looking to enhance their creative skills across different media.",
    curriculum: {
      Photoshop: {
        logo: photoshopLogo, // Add logo here
        lessons: [
          "Installation and Setup",
          "Program Interface and Tools Overview",
          "Photoshop for Photographers",
          "Photoshop for Social Media Design",
          "Photoshop for Digital Prints",
          "Photoshop for Banners and Large Prints",
        ],
      },
      Illustrator: {
        logo: illustratorLogo, // Add logo here
        lessons: [
          "Installation and Setup",
          "Interface and Tools Overview",
          "Logo Design",
          "2D Illustration",
          "3D Illustration",
        ],
      },
      InDesign: {
        logo: indesignLogo, // Add logo here
        lessons: [
          "Installation and Setup",
          "Interface and Tools Overview",
          "Inserting Covers, Master Pages, and Automatic Numbering",
          "Preparing Study Notes for All Subjects",
          "Preparing Books for All Subjects",
          "Simplified University Materials Preparation",
        ],
      },
      PremierePro: {
        logo: premiereProLogo, // Add logo here
        lessons: [
          "Installation and Setup",
          "Interface and Tools Overview",
          "Assembling a Video on the Timeline",
          "Cutting and Removing Unwanted Parts",
          "Installing and Using Plugins",
          "Applying Plugin Effects",
          "Preparing a Wedding Video",
          "Preparing an Educational Video",
        ],
      },
    },
  },
];

export default courses;
