// This is an AI-powered persona generator that creates unique descriptions of MBTI types.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPersonaGeneratorInputSchema = z.object({
  mbtiType: z.string().describe('The 4-letter MBTI personality type (e.g., INFP).'),
});
export type AIPersonaGeneratorInput = z.infer<typeof AIPersonaGeneratorInputSchema>;

const AIPersonaGeneratorOutputSchema = z.object({
  personaDescription: z.string().describe('A creative and unique description of the MBTI type.'),
});
export type AIPersonaGeneratorOutput = z.infer<typeof AIPersonaGeneratorOutputSchema>;

export async function generateAIPersona(input: AIPersonaGeneratorInput): Promise<AIPersonaGeneratorOutput> {
  return aiPersonaGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPersonaGeneratorPrompt',
  input: {schema: AIPersonaGeneratorInputSchema},
  output: {schema: AIPersonaGeneratorOutputSchema},
  prompt: `You are a creative persona generator. You generate unique and engaging persona descriptions for different MBTI types.

  Given the MBTI type {{mbtiType}}, generate a persona description that captures the essence of this type in a creative and memorable way.
  The description should be around 100-150 words.
  Make sure to describe unique strengths, tendencies, and potential pitfalls. The persona should resonate with individuals of that type.
  Focus on making each persona distinct and avoid using the same titles (e.g., "The Architect") for multiple types. Use vivid language.
`,
});

const aiPersonaGeneratorFlow = ai.defineFlow(
  {
    name: 'aiPersonaGeneratorFlow',
    inputSchema: AIPersonaGeneratorInputSchema,
    outputSchema: AIPersonaGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
