//the pactum library will be used when sending a request to server
//the rest of the testing is carried out by jest
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
// describe('App e2e', () => {
//   it.todo('should pass');
// });

describe('prisma test', () => {
  beforeAll(async () => {
    //we are creating a module that will import a module we want to test (app module here)
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });
  it.todo('testing app module');
});
//to execute the command is
//!yarn test:e2e
