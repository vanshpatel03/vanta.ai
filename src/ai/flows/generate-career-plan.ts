'use server';
/**
 * @fileOverview An AI agent to generate a 30-day career plan.
 *
 * - generateCareerPlan - A function that handles the career plan generation process.
 * - GenerateCareerPlanInput - The input type for the generateCareerPlan function.
 * - GenerateCareerPlanOutput - The return type for the generateCareerPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerPlanInputSchema = z.object({
  currentRole: z.string().describe('The user\'s current role or position.'),
  careerGoal: z.string().describe('The user\'s desired career goal or next role.'),
});
export type GenerateCareerPlanInput = z.infer<typeof GenerateCareerPlanInputSchema>;

const DailyPlanSchema = z.object({
    day: z.number().describe('The day number in the plan (1-30).'),
    task: z.string().describe('A specific, actionable task for the day.'),
    details: z.string().describe('A brief explanation of why this task is important and how to approach it.'),
});

const GenerateCareerPlanOutputSchema = z.object({
  plan: z.array(DailyPlanSchema).describe('A 30-day career plan with daily tasks.'),
});
export type GenerateCareerPlanOutput = z.infer<typeof GenerateCareerPlanOutputSchema>;

export async function generateCareerPlan(input: GenerateCareerPlanInput): Promise<GenerateCareerPlanOutput> {
  return generateCareerPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerPlanPrompt',
  input: {schema: GenerateCareerPlanInputSchema},
  output: {schema: GenerateCareerPlanOutputSchema},
  prompt: `You are an expert career strategist. Your goal is to create a detailed, actionable 30-day roadmap for a user looking to transition from their current role to their desired career goal.

The plan should be broken down into daily tasks that are realistic and build upon each other. Cover areas like skill development, networking, resume updating, project building, and interview preparation.

Current Role: {{{currentRole}}}
Desired Career Goal: {{{careerGoal}}}

Generate a 30-day plan.`,
});

const generateCareerPlanFlow = ai.defineFlow(
  {
    name: 'generateCareerPlanFlow',
    inputSchema: GenerateCareerPlanInputSchema,
    outputSchema: GenerateCareerPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
