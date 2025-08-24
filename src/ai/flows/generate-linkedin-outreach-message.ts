'use server';
/**
 * @fileOverview A LinkedIn outreach message generator AI agent.
 *
 * - generateLinkedInOutreachMessage - A function that generates a personalized LinkedIn outreach message.
 * - GenerateLinkedInOutreachMessageInput - The input type for the generateLinkedInOutreachMessage function.
 * - GenerateLinkedInOutreachMessageOutput - The return type for the generateLinkedInOutreachMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInOutreachMessageInputSchema = z.object({
  targetCompany: z.string().describe('The name of the target company.'),
  role: z.string().describe('The target role at the company.'),
  recruiterName: z.string().describe('The name of the recruiter at the company.'),
});
export type GenerateLinkedInOutreachMessageInput = z.infer<typeof GenerateLinkedInOutreachMessageInputSchema>;

const GenerateLinkedInOutreachMessageOutputSchema = z.object({
  outreachMessage: z.string().describe('A personalized outreach message for LinkedIn.'),
});
export type GenerateLinkedInOutreachMessageOutput = z.infer<typeof GenerateLinkedInOutreachMessageOutputSchema>;

export async function generateLinkedInOutreachMessage(input: GenerateLinkedInOutreachMessageInput): Promise<GenerateLinkedInOutreachMessageOutput> {
  return generateLinkedInOutreachMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkedInOutreachMessagePrompt',
  input: {schema: GenerateLinkedInOutreachMessageInputSchema},
  output: {schema: GenerateLinkedInOutreachMessageOutputSchema},
  prompt: `You are an expert in crafting personalized and professional LinkedIn outreach messages. Your goal is to create a message that is both friendly and engaging, increasing the likelihood of a positive response.

  Based on the following information, generate a personalized outreach message:

  Target Company: {{{targetCompany}}}
  Role: {{{role}}}
  Recruiter Name: {{{recruiterName}}}

  The outreach message should:
  - Be addressed to the recruiter by name.
  - Briefly mention the target company and the role.
  - Express interest in the role and highlight relevant skills or experience.
  - Be friendly and professional in tone.
  - Be concise and easy to read.
  - End with a call to action, such as inviting the recruiter to connect or learn more.
  `,
});

const generateLinkedInOutreachMessageFlow = ai.defineFlow(
  {
    name: 'generateLinkedInOutreachMessageFlow',
    inputSchema: GenerateLinkedInOutreachMessageInputSchema,
    outputSchema: GenerateLinkedInOutreachMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
