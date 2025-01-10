import { CloudFlareServiceInterface } from "../interfaces/ExternalCacheServiceInterface";
import { UserRepositoryInterface } from "../interfaces/UserRepositoryInterface";
import { NotificationServiceInterface } from "../interfaces/NotificationServiceInterface";

export class PurgeCacheAndNotifyUsersUseCase {
  constructor(
    private cacheService: CloudFlareServiceInterface,
    private userRepository: UserRepositoryInterface,
    private notificationService: NotificationServiceInterface
  ) {}

  async execute(url: string): Promise<void> {
    console.log(`[PurgeCacheAndNotifyUsersUseCase] Purging cache and notifying users for URL: ${url}`);

    // Purge cache
    await this.cacheService.purgeCache(url);

    // Notify users
    const users = await this.userRepository.findAllUsers();

    for (const user of users) {
      await this.notificationService.notifyUser(user.email, `Cache purged for ${url}`);
    }

    console.log(`[PurgeCacheAndNotifyUsersUseCase] Process complete.`);
  }
}