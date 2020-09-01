export interface NotifyUserDto {
  origin: string;
  kind: string;
  priority: string;
  subject: string;
  content: string;
  domain: string;
  service: string;
  users: string[];
}
