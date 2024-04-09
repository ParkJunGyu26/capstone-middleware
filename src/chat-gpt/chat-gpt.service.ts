import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatGptService {
  private readonly openai: any;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY in environment variables');
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      if (
        !chatCompletion ||
        !chatCompletion.choices ||
        chatCompletion.choices.length === 0
      ) {
        console.log('Invalid chat completion response');
        return 'An error occurred. Please try again later.';
      }

      return chatCompletion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response from ChatGPT:', error);
      return 'An error occurred. Please try again later.';
    }
  }
}
