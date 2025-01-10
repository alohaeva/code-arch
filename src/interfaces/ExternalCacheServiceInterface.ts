export interface CloudFlareServiceInterface {
  purgeCache(url: string): Promise<void>;
}