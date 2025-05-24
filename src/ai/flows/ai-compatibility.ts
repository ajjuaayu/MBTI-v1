'use server';

/**
 * @fileOverview Provides AI-driven personality compatibility insights.
 *
 * - aiCompatibility - A function to determine compatible and rival MBTI types.
 * - AICompatibilityInput - The input type for the aiCompatibility function.
 * - AICompatibilityOutput - The return type for the aiCompatibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICompatibilityInputSchema = z.object({
  mbtiType: z
    .string()
    .describe('The users MBTI type, for example: INFP, ESTJ etc.'),
});
export type AICompatibilityInput = z.infer<typeof AICompatibilityInputSchema>;

const AICompatibilityOutputSchema = z.object({
  mostCompatible: z
    .string()
    .describe('The most compatible MBTI types with the given type.'),
  leastCompatible: z
    .string()
    .describe('The least compatible MBTI types with the given type.'),
});
export type AICompatibilityOutput = z.infer<typeof AICompatibilityOutputSchema>;

export async function aiCompatibility(input: AICompatibilityInput): Promise<AICompatibilityOutput> {
  return aiCompatibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCompatibilityPrompt',
  input: {schema: AICompatibilityInputSchema},
  output: {schema: AICompatibilityOutputSchema},
  prompt: `You are an expert in personality types and compatibility.

  Given the MBTI type: {{{mbtiType}}}, determine which types are most and least compatible.
  Explain your reasoning.
  Return your response as a JSON object.
  `,
});

const aiCompatibilityFlow = ai.defineFlow(
  {
    name: 'aiCompatibilityFlow',
    inputSchema: AICompatibilityInputSchema,
    outputSchema: AICompatibilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
