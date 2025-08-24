'use server';
/**
 * @fileOverview An AI agent to generate interview questions from a job description and provide personalized suggestions based on a resume.
 *
 * - generateInterviewQuestions - A function that handles the interview question generation process.
 * - GenerateInterviewQuestionsInput - The input type for the generateInterviewQuestions function.
 * - GenerateInterviewQuestionsOutput - The return type for the generateInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterviewQuestionsInputSchema = z.object({
  jobDescription: z.string().describe('The job description for the target role.'),
  resumeText: z.string().describe('The text content of the user\'s resume.'),
});
export type GenerateInterviewQuestionsInput = z.infer<typeof GenerateInterviewQuestionsInputSchema>;

const GenerateInterviewQuestionsOutputSchema = z.object({
  questions: z.array(z.object({
    question: z.string().describe('The interview question.'),
    suggestion: z.string().describe('A suggestion on how to answer the question, personalized based on the user\'s resume.'),
  })).describe('A list of generated interview questions and personalized suggestions for answering them.'),
});
export type GenerateInterviewQuestionsOutput = z.infer<typeof GenerateInterviewQuestionsOutputSchema>;

export async function generateInterviewQuestions(input: GenerateInterviewQuestionsInput): Promise<GenerateInterviewQuestionsOutput> {
  return generateInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterviewQuestionsPrompt',
  input: {schema: GenerateInterviewQuestionsInputSchema},
  output: {schema: GenerateInterviewQuestionsOutputSchema},
  prompt: `You are an expert career coach and interviewer. Your goal is to generate a list of insightful interview questions based on a given job description.

For each question, provide a brief, personalized suggestion on what a good answer should cover, referencing the user's resume to make the advice specific and actionable. For example, if the resume mentions a project, suggest how they can use that project as an example in their answer.

Job Description:
{{{jobDescription}}}

User's Resume:
{{{resumeText}}}
`,
});

const generateInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'generateInterviewQuestionsFlow',
    inputSchema: GenerateInterviewQuestionsInputSchema,
    outputSchema: GenerateInterviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
