import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import axios from "axios";

async function resumeScreener(resume, jobDescription) {
  const generativeAI = new GoogleGenerativeAI( "AIzaSyD0C3UXKbLHySByr23khF1e8cAa-zU3MrA");
  const model = generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const cloudinaryUrl = resume;

  // Function to download PDF locally
  const downloadPdfLocally = async (url, destinationPath) => {
    try {
      const response = await axios.get(url, { responseType: "stream" });
      const writer = fs.createWriteStream(destinationPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    } catch (error) {
      throw new Error("Error downloading PDF: " + error.message);
    }
  };

  const localDestinationPath = "E:\\SICKUI\\sickUI\\backend\\file.pdf";

  await downloadPdfLocally(cloudinaryUrl, localDestinationPath)
    .then(() => {
      console.log("PDF downloaded successfully.");
    })
    .catch((error) => {
      console.error(error.message);
    });

  const loader = new PDFLoader(localDestinationPath, {
    splitPages: false,
  });

  const job = jobDescription;
  console.log("job", job);
  
  const docs = await loader.load();
  
  if (!docs[0]?.pageContent) {
    throw new Error("Resume content is missing or invalid.");
  }

  function categorizeSkills(rtext, jtext) {
    // Ensure inputs are strings and fallback to empty strings if undefined or null
    rtext = typeof rtext === "string" ? rtext : "";
    jtext = typeof jtext === "string" ? jtext : "";
  
    // Convert the skill lists to lowercase
    const majorTechnicalSkills = [
      "Java", 
      "Python", 
      "SQL (Postgres)", 
      "JavaScript", 
      "Dart", 
      "HTML/CSS", 
      "React", 
      "Node.js", 
      "Flask", 
      "Flutter", 
      "FlutterFlow", 
      "Express.js", 
      "LangChain", 
      "Llama", 
      "Supabase", 
      "MongoDB", 
      "Redis", 
      "Firebase", 
      "AWS", 
      "Docker", 
      "Git", 
      "VS Code", 
      "Visual Studio", 
      "PyCharm", 
      "IntelliJ", 
      "Linux"
    ].map(skill => skill.toLowerCase());
  
    const mainSoftSkills = [
      "Collaboration and Teamwork", 
      "Problem-Solving", 
      "Leadership", 
      "Adaptability", 
      "Communication", 
      "Project Management", 
      "Innovation and Creativity"
    ].map(skill => skill.toLowerCase());
  
    const rtechnicalSkills = [];
    const rsoftSkills = [];
    const rother = [];
  
    const jtechnicalSkills = [];
    const jsoftSkills = [];
    const jother = [];
  
    // Normalize text to lowercase and split into words, remove non-alphanumeric characters
    const words = rtext.toLowerCase().split(/\s+|\W+/).filter(Boolean);
    const jwords = jtext.toLowerCase().split(/\s+|\W+/).filter(Boolean);
  
    // Function to match skills with better flexibility
    function matchSkills(textWords, skillsList) {
      return textWords.filter(word => {
        return skillsList.some(skill => word.includes(skill));
      });
    }
  
    // Categorize skills in job description (jtext)
    jtechnicalSkills.push(...matchSkills(jwords, majorTechnicalSkills));
    jsoftSkills.push(...matchSkills(jwords, mainSoftSkills));
    jother.push(...jwords.filter(word => !majorTechnicalSkills.some(skill => word.includes(skill)) && !mainSoftSkills.some(skill => word.includes(skill))));
  
    // Categorize skills in resume (rtext)
    rtechnicalSkills.push(...matchSkills(words, majorTechnicalSkills));
    rsoftSkills.push(...matchSkills(words, mainSoftSkills));
    rother.push(...words.filter(word => !majorTechnicalSkills.some(skill => word.includes(skill)) && !mainSoftSkills.some(skill => word.includes(skill))));
  
    const jlist = [...jtechnicalSkills, ...jsoftSkills];
    const rlist = [...rtechnicalSkills, ...rsoftSkills];
  
    const jtechnicalMatchPercentage = calcMatch(jtechnicalSkills, rtechnicalSkills);
    const jsoftMatchPercentage = calcMatch(jsoftSkills, rsoftSkills);
  
    return {
      rlist,
      jlist,
      isResumeSelected: jtechnicalMatchPercentage >= 70 && jsoftMatchPercentage >= 70,
    };
  }
  
  function calcMatch(jobSkills, resumeSkills) {
    const intersection = jobSkills.filter(skill => resumeSkills.includes(skill));
    const matchPercentage = (intersection.length / jobSkills.length) * 100;
    return matchPercentage;
  }
  
  
  const categorizedSkills = categorizeSkills(docs[0].pageContent, job);
  console.log(categorizedSkills.jlist, categorizedSkills.rlist);
  const requiredSkills = job.skills.toLowerCase().split(', ');
  const userMessage = `Job Title: ${job.jobTitle}
  Job Description: ${job.jobDescription}
  Required Skills: ${requiredSkills.join(', ')}
  Candidate's Skills: ${categorizedSkills.rlist.join(', ')}
  
  Generate a short report informing the candidate about the skills they need to improve to get the job.`;
  
// Use GoogleGenerativeAI to generate a response
const response = await model.generateContent(userMessage);
  console.log(response.response.candidates[0].content);
  
  return response.response.candidates[0].content.parts[0].text;
}

export {resumeScreener};
