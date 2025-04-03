import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { dreamLottoPrompt } from 'src/constants/prompt';

@Injectable()
export class DreamLottoService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async analyzeDream(message: string) {
    const payload = {
      model: 'deepseek/deepseek-chat',
      messages: [
        {
          role: 'system',
          content: dreamLottoPrompt,
        },
        {
          role: 'user',
          content: `꿈 내용: "${message}"\n결과를 JSON 형식으로 응답해줘.`,
        },
      ],
    };

    try {
      const response$ = this.http.post(
        'https://openrouter.ai/api/v1/chat/completions',
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.config.get('OPENROUTER_API_KEY')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const response = await firstValueFrom(response$);
      const text = response.data.choices[0].message?.content.trim();

      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      const jsonText = text.slice(jsonStart, jsonEnd + 1);

      return JSON.parse(jsonText);
    } catch (err) {
      console.error('Dream Lotto Error:', err);
      throw new InternalServerErrorException('꿈 해석에 실패했습니다.');
    }
  }
}
