import dialogflow from '@google-cloud/dialogflow'
import config from '../config/devKey.js'
import crypto from 'crypto'
import { JobApplicant } from '../models/jobApplicant.model.js';


const PROJECT_ID  = config.googleProjectId;

function extractTechKeywords(queryInput) {
  // Define a regular expression pattern for tech-related roles
  const techRolePattern = /\b(?:developer|programmer|engineer|designer|analyst|architect|administrator|data scientist|data analyst|database administrator|software|hardware)\b/gi;

  // Extract tech-related roles using the regular expression
  const techRoles = queryInput.match(techRolePattern);

  // Filter out duplicate keywords (if any)
  const uniqueTechRoles = techRoles ? [...new Set(techRoles)] : [];

  return uniqueTechRoles;
}


async function runSample(queryInput,projectId = "acquired-cargo-408016") {
  // A unique identifier for the given session
  const sessionId =  crypto.randomUUID();
  

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  try {
    const responses = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: { text: { text: queryInput, languageCode: 'en-US' } },
    });

    const intent = responses[0].queryResult.intent.displayName;
    const fulfillmentText = responses[0].queryResult.fulfillmentText;
    console.log(intent);
    const techKeywordsArray = extractTechKeywords(queryInput);

    if (intent === 'ListJobSeekers') {
      const keywords = ["Developer"];

  // const lowercasedInput = queryInput.toLowerCase();

  // keywords.forEach((keyword) => {
  //   const pattern = new RegExp(`\\b${keyword.toLowerCase()}\\b`);
  //   if (pattern.test(lowercasedInput)) {
  //     keywords.push(keyword);
  //   }
  // });
  console.log(techKeywordsArray);

  const result = await JobApplicant.find({
    'keywords': { $regex: new RegExp(techKeywordsArray.join('|'), 'i') }
}).exec();

    return [result,intent]

    } else {
      return [fulfillmentText,intent];
    }
  } catch (error) {
    console.error('Error communicating with Dialogflow:', error);

  }
}
export {
  runSample
}