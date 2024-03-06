import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: { [key: string]: { data: any, expiration: number } } = {};
  constructor() { }

  set(key: string, data: any): void {
    this.cache[key] = {
      data: data,
      expiration: Date.now() + 300000 // 5 minutes expiration time
    };
  }

  get(key: string): any {
    const cachedItem = this.cache[key];
    if (cachedItem && Date.now() < cachedItem.expiration) {
      console.log(`Retrieving data from cache for key '${key}'`);
      return cachedItem.data;
    } else {
      console.log(`Cache miss for key '${key}'`);
      this.clear(key);
      return null;
    }
  }

  clear(key: string): void {
    delete this.cache[key];
    console.log(`Cache cleared for key '${key}'`);
  }
}
