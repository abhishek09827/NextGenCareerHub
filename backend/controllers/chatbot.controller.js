import { asyncHandler } from "../utils/asyncHandler.js";
import {runSample} from '../chatbot/chatbot.js'
import { ApiResponse } from "../utils/ApiResponse.js";

const chatBot = asyncHandler(async (req, res) => {

    console.log(req);
    const {text} = req.body;
    const [result,intent] = await runSample(text)
    console.log(result);
    if(intent === 'ListJobSeekers')
    {
        const formattedText = result.map(application => {
            return `
              Applicant: ${application.applicant.firstName} ${application.applicant.lastName}
              Email: ${application.applicant.email}
              Phone: ${application.applicant.phone}
              Resume: ${application.applicant.resume}
              
              Job Details:
                Position: ${application.jobDetails.position}
                Company: ${application.jobDetails.company}
                Location: ${application.jobDetails.location}
                Experience: ${application.jobDetails.experience}
                Education: ${application.jobDetails.education}
                
              Keywords: ${application.keywords.join(', ')}
              
              ID: ${application._id}
            `;
          }).join('\n\n');
          
        
    return res.status(200).json(formattedText);}

    return res.status(200).json(result)

} );
export {
    chatBot
}