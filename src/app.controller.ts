import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatGptService } from './chat-gpt/chat-gpt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly chatGptService: ChatGptService,
  ) {}

  @Post('/chat')
  async getChatResponse(
    @Body() body: { prompt: string },
  ): Promise<{ response: string }> {
    console.log('Received Prompt:', body.prompt);
    const response = await this.chatGptService.generateResponse(body.prompt);
    return { response };
  }
}
