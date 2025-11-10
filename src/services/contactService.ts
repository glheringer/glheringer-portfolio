import { api } from '@/lib/api';

export interface ContactMessageData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactMessageResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    created_at: string;
  };
}

export interface ContactMessagesListResponse {
  success: boolean;
  data: Array<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: 'unread' | 'read' | 'replied' | 'archived';
    ip_address?: string;
    user_agent?: string;
    created_at: string;
    updated_at: string;
  }>;
}

export const contactService = {
  /**
   * Envia uma mensagem de contato
   */
  sendMessage: async (data: ContactMessageData): Promise<ContactMessageResponse> => {
    const response = await api.post<ContactMessageResponse>('/api/contact', data);
    return response.data;
  },

  /**
   * Lista todas as mensagens (admin)
   */
  getMessages: async (): Promise<ContactMessagesListResponse> => {
    const response = await api.get<ContactMessagesListResponse>('/api/contact');
    return response.data;
  },
};
