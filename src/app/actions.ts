"use server";

import { generateResume } from '@/ai/flows/generate-resume';
import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import { generateLinkedInOutreachMessage } from '@/ai/flows/generate-linkedin-outreach-message';
import { generateInterviewQuestions } from '@/ai/flows/generate-interview-questions';
import { generateCareerPlan } from '@/ai/flows/generate-career-plan';
import { generateLinkedInProfile } from '@/ai/flows/generate-linkedin-profile';

export interface ActionState {
  message: string;
  output?: any;
}

export async function generateResumeAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const workExperience = formData.get('workExperience') as string;
  const jobDescription = formData.get('jobDescription') as string;

  if (!workExperience || workExperience.length < 50) {
    return { message: "Please provide more detailed work experience (at least 50 characters)." };
  }
  if (!jobDescription || jobDescription.length < 50) {
    return { message: "Please provide a job description to tailor the resume to (at least 50 characters)." };
  }

  try {
    const result = await generateResume({ workExperience, jobDescription });
    return { message: "success", output: result.resume };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while generating the resume." };
  }
}

export async function generateCoverLetterAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const resumeText = formData.get('resumeText') as string;
  const jobDescription = formData.get('jobDescription') as string;

  if (!resumeText || resumeText.length < 50) {
    return { message: "Please provide your resume text (at least 50 characters)." };
  }
  if (!jobDescription || jobDescription.length < 50) {
    return { message: "Please provide a job description (at least 50 characters)." };
  }

  try {
    const result = await generateCoverLetter({ resumeText, jobDescription });
    return { message: "success", output: result.coverLetter };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while generating the cover letter." };
  }
}


export async function generateLinkedInOutreachAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const targetCompany = formData.get('targetCompany') as string;
  const role = formData.get('role') as string;
  const recruiterName = formData.get('recruiterName') as string;

  if (!targetCompany || !role || !recruiterName) {
    return { message: "Please fill in all fields." };
  }
  
  try {
    const result = await generateLinkedInOutreachMessage({ targetCompany, role, recruiterName });
    return { message: "success", output: result.outreachMessage };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while generating the message." };
  }
}

export async function generateInterviewQuestionsAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const jobDescription = formData.get('jobDescription') as string;
  const resumeText = formData.get('resumeText') as string;
  if (!jobDescription || jobDescription.length < 50) {
    return { message: "Please provide a more detailed job description (at least 50 characters)." };
  }
  if (!resumeText || resumeText.length < 50) {
    return { message: "Please provide your resume text to generate personalized suggestions (at least 50 characters)." };
  }
  try {
    const result = await generateInterviewQuestions({ jobDescription, resumeText });
    return { message: "success", output: result.questions };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while generating interview questions." };
  }
}

export async function generateCareerPlanAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const currentRole = formData.get('currentRole') as string;
  const careerGoal = formData.get('careerGoal') as string;

  if (!currentRole || !careerGoal) {
    return { message: "Please fill in all fields." };
  }
  
  try {
    const result = await generateCareerPlan({ currentRole, careerGoal });
    return { message: "success", output: result.plan };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while generating the career plan." };
  }
}

export async function generateLinkedInProfileAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const currentRole = formData.get('currentRole') as string;
  const field = formData.get('field') as string;
  const keySkills = formData.get('keySkills') as string;

  if (!currentRole || !field || !keySkills) {
    return { message: "Please fill in all fields." };
  }
  
  try {
    const result = await generateLinkedInProfile({ currentRole, field, keySkills });
    return { message: "success", output: result };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while generating your LinkedIn profile." };
  }
}
