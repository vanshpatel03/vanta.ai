'use server';
/**
 * @fileOverview Resume generation AI agent.
 *
 * - generateResume - A function that handles the resume generation process.
 * - GenerateResumeInput - The input type for the generateResume function.
 * - GenerateResumeOutput - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeInputSchema = z.object({
  workExperience: z.string().describe('The work experience of the user, either as a LinkedIn URL or plain text.'),
  jobDescription: z.string().describe('The job description for the role the user is applying for.'),
});
export type GenerateResumeInput = z.infer<typeof GenerateResumeInputSchema>;

const GenerateResumeOutputSchema = z.object({
  resume: z.string().describe('The generated resume in a professional, ATS-friendly format, tailored to the job description.'),
});
export type GenerateResumeOutput = z.infer<typeof GenerateResumeOutputSchema>;

export async function generateResume(input: GenerateResumeInput): Promise<GenerateResumeOutput> {
  return generateResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: {schema: GenerateResumeInputSchema},
  output: {schema: GenerateResumeOutputSchema},
  prompt: `You are a professional resume writer. Your task is to generate a tailored, professional, and ATS-friendly resume.

Analyze the user's work experience and the provided job description. Rewrite and structure the resume to highlight the skills and experiences that are most relevant to the job description. Emphasize achievements and use action verbs.

User's Work Experience:
{{{workExperience}}}

Target Job Description:
{{{jobDescription}}}
`,
});

const generateResumeFlow = ai.defineFlow(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GenerateResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
