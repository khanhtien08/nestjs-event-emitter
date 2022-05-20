import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppDTO } from '../dist/app.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('post len nao', function () {
    const appDto = new AppDTO();
    appDto.id = 'kt206';
    appDto.content = 'anbsdf';
    appDto.timeout = 22;
    return request(app.getHttpServer())
      .post('/')
      .send(appDto)
      .expect(201)
      .expect({
        "statusCode": 404,
        "message": "Cannot PUT /messenger/f7d1d998-8067-4887-aeb4-e1f9fef9e5b9fasdfasdf",
        "error": "Not Found"
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
