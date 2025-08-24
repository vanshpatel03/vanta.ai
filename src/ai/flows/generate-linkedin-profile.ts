'use server';
/**
 * @fileOverview A LinkedIn profile optimizer AI agent.
 *
 * - generateLinkedInProfile - A function that generates a personalized LinkedIn headline and bio.
 * - GenerateLinkedInProfileInput - The input type for the generateLinkedInProfile function.
 * - GenerateLinkedInProfileOutput - The return type for the generateLinkedInProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInProfileInputSchema = z.object({
  currentRole: z.string().describe("The user's current role or title."),
  field: z.string().describe('The user\'s industry or field of expertise.'),
  keySkills: z.string().describe('A comma-separated list of the user\'s key skills.'),
});
export type GenerateLinkedInProfileInput = z.infer<typeof GenerateLinkedInProfileInputSchema>;

const GenerateLinkedInProfileOutputSchema = z.object({
  headline: z.string().describe('A compelling and keyword-rich LinkedIn headline.'),
  bio: z.string().describe('A professional and engaging LinkedIn bio/summary.'),
});
export type GenerateLinkedInProfileOutput = z.infer<typeof GenerateLinkedInProfileOutputSchema>;

export async function generateLinkedInProfile(input: GenerateLinkedInProfileInput): Promise<GenerateLinkedInProfileOutput> {
  return generateLinkedInProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkedInProfilePrompt',
  input: {schema: GenerateLinkedInProfileInputSchema},
  output: {schema: GenerateLinkedInProfileOutputSchema},
  prompt: `You are an expert LinkedIn profile strategist and copywriter. Your goal is to create a compelling, keyword-rich headline and a professional, engaging bio for a user based on their role, field, and skills.

The headline should be concise, professional, and optimized for search.
The bio should be written in the first person, highlighting the user's expertise and value proposition.

User Information:
Current Role: {{{currentRole}}}
Field/Industry: {{{field}}}
Key Skills: {{{keySkills}}}

Generate an optimized LinkedIn headline and bio.`,
});

const generateLinkedInProfileFlow = ai.defineFlow(
  {
    name: 'generateLinkedInProfileFlow',
    inputSchema: GenerateLinkedInProfileInputSchema,
    outputSchema: GenerateLinkedInProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
