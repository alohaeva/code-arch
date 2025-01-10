import { NotificationServiceInterface } from "../interfaces/NotificationServiceInterface";

export class NotificationService implements NotificationServiceInterface {
  async notifyUser(email: string, message: string): Promise<void> {
    console.log(`[Notification Service] Sending email to ${email}: ${message}`);
    return Promise.resolve();
  }
}