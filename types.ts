
export interface PageProps {
  onNext: () => void;
  onPrev?: () => void;
  data: {
    name: string;
    birthDate: string;
  };
}

export enum AppState {
  LOCKED = 'LOCKED',
  HERO = 'HERO',
  COUNTDOWN = 'COUNTDOWN',
  MEMORIES = 'MEMORIES',
  GOMBALAN = 'GOMBALAN',
  RIDDLES = 'RIDDLES',
  PRAYERS = 'PRAYERS',
  AI_MESSAGE = 'AI_MESSAGE',
  CELEBRATION = 'CELEBRATION',
  FINALE = 'FINALE',
  WHATSAPP_CHAT = 'WHATSAPP_CHAT'
}
