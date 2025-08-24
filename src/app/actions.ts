"use server";

import { generateResume } from '@/ai/flows/generate-resume';
import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import { generateLinkedInOutreachMessage } from '@/ai/flows/generate-linkedin-outreach-message';

export interface ActionState {
  message: string;
  output?: string;
}

export async function generateResumeAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const workExperience = formData.get('workExperience') as string;
  if (!workExperience || workExperience.length < 50) {
    return { message: "Please provide more detailed work experience (at least 50 characters)." };
  }
  try {
    const result = await generateResume({ workExperience });
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
