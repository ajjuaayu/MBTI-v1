
// This is an AI-powered persona generator that creates unique descriptions of MBTI types.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPersonaGeneratorInputSchema = z.object({
  mbtiType: z.string().describe('The 4-letter MBTI personality type (e.g., INFP).'),
});
export type AIPersonaGeneratorInput = z.infer<typeof AIPersonaGeneratorInputSchema>;

const AIPersonaGeneratorOutputSchema = z.object({
  personaDescription: z.string().describe('A creative, detailed, and unique description of the MBTI type, around 200-250 words.'),
});
export type AIPersonaGeneratorOutput = z.infer<typeof AIPersonaGeneratorOutputSchema>;

export async function generateAIPersona(input: AIPersonaGeneratorInput): Promise<AIPersonaGeneratorOutput> {
  return aiPersonaGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPersonaGeneratorPrompt',
  input: {schema: AIPersonaGeneratorInputSchema},
  output: {schema: AIPersonaGeneratorOutputSchema},
  prompt: `You are a creative persona generator. You generate unique, insightful, and engaging persona descriptions for different MBTI types.

  Given the MBTI type {{mbtiType}}, generate a detailed persona description that captures the essence of this type in a creative and memorable way.
  The description should be approximately 200-250 words, or 2-3 well-developed paragraphs.
  
  Please elaborate on:
  - Unique strengths and how they manifest.
  - Common tendencies in behavior and thought patterns.
  - Potential pitfalls or challenges this type might face.
  - Core motivations or underlying desires.
  - How they might typically approach relationships or work.

  The persona should resonate with individuals of that type, offering genuine insights.
  Focus on making each persona distinct and avoid using generic titles (e.g., "The Architect") if possible, instead weaving descriptive language throughout. Use vivid and evocative language.
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

