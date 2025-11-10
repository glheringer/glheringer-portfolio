export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: 'unread' | 'read' | 'replied' | 'archived';
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessageRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}
