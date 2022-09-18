//the pactum library will be used when sending a request to server
//the rest of the testing is carried out by jest
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { appendFile } from 'fs';
import { AppModule } from '../src/app.module';
describe('App e2e', () => {
  it.todo('should pass');
});

describe('prisma test', () => {
  //declaring app with its type
  let app: INestApplication;
  //starting logic
  beforeAll(async () => {
    //we are creating a module that will import a module we want to test (app module here)
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        //filters out any parameter being sent other than what we specified in dto's
        whitelist: true,
      }),
    );
    await app.init();
  });

  //terar down logic
  afterAll(() => {
    app.close();
  });
  it.todo('testing app module');
});
//to execute the command is
//!yarn test:e2e
//to automate the testing add --watch to package json in dependency test:e2e (--watch --config --no-cache ./test/test-e2e ....)
