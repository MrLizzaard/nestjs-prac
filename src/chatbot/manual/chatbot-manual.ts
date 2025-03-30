export const chatbotManual = {
  intro: '안녕하세요! 저는 이 프로젝트의 API 사용법을 안내하는 챗봇입니다.',
  features: [
    '1. 꿈 해석 후 로또 번호 추천',
    '2. 주파수 추천 기능',
    '3. 결제 기능',
    '4. 실시간 채팅 기능',
  ],
  usage: {
    'dream-lotto': {
      desc: '꿈을 해석하고 로또 번호를 추천해줍니다.',
      method: 'POST',
      path: '/dream-lotto/analyze',
      params: {
        message: 'body: { message : "어제 이런 꿈을 꿨어요..." }',
      },
    },
    frequency: {
      desc: '사용자 상태에 맞는 명상용 주파수를 추천합니다.',
      method: 'GET',
      path: '/frequencies/recommend',
      params: {
        mood: 'string (예: 집중, 불면, 스트레스)',
      },
    },
    payment: {
      desc: '결제관련 api입니다',
      method: 'GET',
      path: '/payment',
      params: {
        message: '결제 관련 메시지',
      },
    },
  },
};
