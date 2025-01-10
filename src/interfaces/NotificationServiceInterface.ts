export interface NotificationServiceInterface {
  notifyUser(email: string, message: string): Promise<void>;
}