import { asyncHandler } from "../utils/asyncHandler.js";
import {runSample} from '../chatbot/chatbot.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { performScreening } from "../resumeScreener/resume.js";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";


const loader = new PDFLoader("C:\\Users\\user\\Downloads\\sickUI-main\\sickUI-main\\backend\\RESUMELatest.pdf", {
    splitPages: false,
  });
  
  const job = `Essential Functions- Applies knowledge of industry, domain, workflows, and personas to create requirements that reflect user needs, strategic direction, and project scope- Continually engages with product team members and appropriate client personas to validate deliverables and to ensure that requirements will satisfy the intended purpose- Effectively prioritizes the requirements backlog to address functional and non-functional needs and to provide accuracy and predictability of delivery- Understand data structures and data flow between systems- Ability to represent product workflows and requirements in appropriate visual or graphical representations (i.e. process flow diagram, data flowchart, wireframes, low fidelity prototypes, etc.)- Gain a strong product knowledge and understanding of the healthcare market, client business drivers, and user personas- Build relationships with external clients, internal partners, and leadership- All other duties and responsibilities as assignedSkills needed to be successful- Clear, effective, and persuasive verbal and written communication and presentations skills- Ability to assist internal and external customers by focusing on actions/decisions that meet their needs- Be able to understand and explain the functionality, workflows, interactions, and client usage for the assigned product- Understanding of approaches used to identify, prioritize, and mitigate risks to reduce or eliminate potential threats to patient safety or the business- Ability to represent product workflows as a graphical overview of the flow of data, tasks, or user actions- Confidence to explain the business drivers, user personas, etc. for the assigned product area- Accountability and commitment to quality- Drive and persistence to seek information and take actions necessary to accomplish a goal.Technical Requirements- Experience as a Business Analyst/ Requirement engineer working in the healthcare / Pathology domain.- Candidate should possess 2 to 4 years of experience.- Azure DevOps- Working as part of an agile SCRUM team.Required Experience & Education- Bachelor's degree in software engineering, computer science, math, or equivalent relevant work experience- 2-4 years' experience with software development life cycle, testing methodologies, quality control, and quality assurance- 2-4 years' experience in a software engineering environment- 2-4 years' experience communicating with clinical and technical expertsPreferred Experience & Education- Experience with medical devices- Experience with healthcare/clinical information systems- Experience designing commercial softwareSupervisory Responsibilities- None`;
  
  const docs = await loader.load();
  
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 124,
    chunkOverlap: 32,
  });
  
  console.log(docs[0].pageContent);
  
  const resumeChunks = await splitter.createDocuments([docs[0].pageContent]);
  
  const jobSpecChunks = await splitter.createDocuments([job]);

const perform = asyncHandler(async (req, res) => {

    console.log(req);
    const result = performScreening(resumeChunks,jobSpecChunks)
    console.log(result);

    return res.status(200).json(result)

} );
export {
    perform
}