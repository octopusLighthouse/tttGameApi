import { Injectable } from '@nestjs/common';
import { createClient, RedisClient } from 'redis';

@Injectable()
export class RedisService {
  private redisClient: RedisClient;
  constructor() { this.init(); }

  public async init(): Promise<void> {
    this.redisClient = createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });
    this.redisClient.on('connect', () => { console.log('Redis initiated'); });
    this.redisClient.on('ready', () => { console.log('Redis ready'); });
    this.redisClient.on('error', (err) => { console.log(`Redis error: ${err}`); });
    this.redisClient.on('reconnecting', () => { console.log('Redis reconnecting'); });
    this.redisClient.on('end', () => { console.log('Redis end'); });
  }

  public async setKey(key: string, value: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.redisClient.set(key, value, (err, obj) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  public async getKey(key: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, obj) => {
        if (err) reject(err);
        return resolve(obj);
      });
    });
  }
}