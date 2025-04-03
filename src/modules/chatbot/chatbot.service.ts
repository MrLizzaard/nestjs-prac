import { Injectable } from '@nestjs/common';
import { chatbotManual } from './manual/chatbot-manual';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { systemPrompt } from 'src/constants/prompt';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async respondTo(message: string) {
    const intent = await this.detectIntent(message);
    console.log('Intent:', intent);

    switch (intent) {
      case 'greeting':
        return chatbotManual.intro;
      case 'list-features':
        return `현재 제공되는 기능은:\n${chatbotManual.features.join('\n')}입니다.`;
      case 'dream-lotto':
        return `꿈 해석 및 로또 번호 추천 기능은 ${chatbotManual.usage['dream-lotto'].method} 방식으로 ${chatbotManual.usage['dream-lotto'].path}에 요청을 보내면 됩니다.\n예시: ${chatbotManual.usage['dream-lotto'].params.message}`;
      case 'frequency':
        return `주파수 추천 기능은 ${chatbotManual.usage['frequency'].method} 방식으로 ${chatbotManual.usage['frequency'].path}에 요청을 보내면 됩니다.\n예시: ${chatbotManual.usage['frequency'].params.mood}`;
      case 'payment':
        return `결제 기능은 ${chatbotManual.usage['payment'].method} 방식으로 ${chatbotManual.usage['payment'].path}에 요청을 보내면 됩니다.`;
      case 'chat':
      default:
        return '죄송합니다. 이해하지 못했습니다.';
    }
  }

  async detectIntent(message: string): Promise<string> {
    try {
      const response$ = this.httpService.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'deepseek/deepseek-r1:free',
          // model: 'mistralai/mistral-7b-instruct:free',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: `문장: "${message}"\n결과:`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get('OPENROUTER_API_KEY')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const response = await firstValueFrom(response$);
      const raw = response.data.choices[0].message?.content.trim();

      if (raw.startsWith('"') && raw.endsWith('"')) {
        return JSON.parse(raw);
      }

      const match = raw.match(/\{[\s\S]*?\}/);
      if (match?.[0]) {
        const parsed = JSON.parse(match[0]);
        if (typeof parsed === 'object' && 'intent' in parsed) {
          return parsed.intent;
        }
      }

      return 'unknown';
    } catch (error) {
      console.error('Error detecting intent:', error);
      return 'error';
    }
  }
}
