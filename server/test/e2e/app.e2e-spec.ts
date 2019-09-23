import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Request } from '../helpers/request.helpers';
import { GenerateUser, GenerateBadUser } from '../fixtures/user.fixtures';

import { AppModule } from '../../src/app/app.module';
import { AuthService } from '../../src/modules/auth/auth.service';

describe('', () => {
  let app: INestApplication;
  let authService: AuthService;
  let request: Request;

  let generateUser = new GenerateUser();
  let generateBadUser = new GenerateBadUser();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication().useGlobalPipes(new ValidationPipe());
    authService = module.get<AuthService>(AuthService);
    request = new Request(app);

    return await app.init();
  });

  describe('User flow (api/user):', () => {
    describe('[POST]: Create', () => {
      it('[201]: Create', async () => {
        const { body } = await request.post('/user', 201, generateUser);
        return await request.setPasport(authService.signIn(body));
      });

      it('[400]: Bad-Request', async () => {
        return await request.post('/user', 400, generateBadUser);
      });

      it('[409]: Conflict', async () => {
        return await request.post('/user', 409, generateUser);
      });
    });

    describe('[Get]: Reflection', () => {
      it('[401]: Unauthorized', async () => {
        return await request.get('/user', 401);
      });

      it('[200]: OK', async () => {
        return await request.getAuth('/user', 200);
      });
    });

    describe('[Patch]: Update', () => {
      it('[401]: Unauthorized', async () => {
        return await request.patch('/user', 401, generateUser);
      });

      it('[400]: Bad-Request', async () => {
        return await request.patchAuth('/user', 400, generateBadUser);
      });

      it('[200]: OK', async () => {
        const { body } = await request.patchAuth(
          '/user',
          200,
          new GenerateUser(),
        );
        generateUser = body;
        return await request.setPasport(authService.signIn(body));
      });
    });

    describe('[Delete]: Delete', () => {
      it('[401]: Unauthorized', async () => {
        return await request.delete('/user', 401);
      });

      it('[200]: OK', async () => {
        return await request.deleteAuth('/user', 200);
      });
    });
  });

  describe('Auth flow (api/auth):', () => {
    describe('[POST]: Create', () => {
      it('[401]: Unauthorized', async () => {
        return await request.post('/auth', 401, new GenerateUser());
      });

      it('[400]: Bad-Request', async () => {
        return await request.post('/auth', 400, generateBadUser);
      });

      it('[201]: Create', async () => {
        const { body } = await request.post('/auth', 201, generateUser);
        return await request.setPasport(body);
      });
    });

    describe('[Patch]: Update', () => {
      it('[401]: Unauthorized', async () => {
        return await request.patch('/auth', 401);
      });

      it('[200]: OK', async () => {
        const { body } = await request.patchAuth('/auth', 200);
        return await request.setPasport(body);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
