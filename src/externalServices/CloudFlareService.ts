import {CloudFlareServiceInterface} from "../interfaces/ExternalCacheServiceInterface";

export class CloudFlareService implements CloudFlareServiceInterface {
    async purgeCache(url: string): Promise<void> {
        console.log(`[CloudFlare Service] Purging cache for URL: ${url}`);
        return Promise.resolve();
    }
}