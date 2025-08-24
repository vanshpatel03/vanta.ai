'use server';
/**
 * @fileOverview A 1-on-1 AI career mentor.
 *
 * - generateMentorChatResponse - A function that generates a response from the AI career mentor.
 * - GenerateMentorChatResponseInput - The input type for the function.
 * - GenerateMentorChatResponseOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const GenerateMentorChatResponseInputSchema = z.object({
  userMessage: z.string().describe('The latest message from the user.'),
  chatHistory: z.array(ChatMessageSchema).describe('The history of the conversation so far.'),
});
export type GenerateMentorChatResponseInput = z.infer<typeof GenerateMentorChatResponseInputSchema>;

const GenerateMentorChatResponseOutputSchema = z.object({
  response: z.string().describe('The AI mentor\'s response to the user.'),
});
export type GenerateMentorChatResponseOutput = z.infer<typeof GenerateMentorChatResponseOutputSchema>;

export async function generateMentorChatResponse(input: GenerateMentorChatResponseInput): Promise<GenerateMentorChatResponseOutput> {
  return generateMentorChatResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMentorChatResponsePrompt',
  input: {schema: GenerateMentorChatResponseInputSchema},
  output: {schema: GenerateMentorChatResponseOutputSchema},
  prompt: `You are an expert career mentor with years of experience helping professionals at all levels. Your expertise spans resume writing, interview skills, career strategy, networking, and salary negotiation. You are empathetic, insightful, and always provide actionable advice.

A user is seeking your guidance. Engage in a natural, conversational way. Use the provided chat history to maintain context and provide relevant, personalized advice.

Chat History:
{{#each chatHistory}}
{{role}}: {{{content}}}
{{/each}}

New User Message:
{{{userMessage}}}

Your response should be helpful, encouraging, and tailored to the user's situation. Provide specific, actionable steps whenever possible.`,
});

const generateMentorChatResponseFlow = ai.defineFlow(
  {
    name: 'generateMentorChatResponseFlow',
    inputSchema: GenerateMentorChatResponseInputSchema,
    outputSchema: GenerateMentorChatResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
