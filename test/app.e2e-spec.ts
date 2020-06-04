import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/game/api/v1/board (GET)', () => {
    return request(app.getHttpServer())
      .get('/game/api/v1/board')
      .expect(200);
  });

  it('/game/api/v1/board (POST)', () => {
    return request(app.getHttpServer())
      .post('/game/api/v1/board')
      .expect(200);
  });

  it('/game/api/v1/reset (POST)', () => {
    return request(app.getHttpServer())
      .post('/game/api/v1/reset')
      .expect(200);
  });
});
