import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Request } from '../helpers/request.helpers';
import { GenerateUser, GenerateBadUser } from '../fixtures/user.fixtures';
import {
  GenerateCompany,
  GenerateBadCompany,
} from '../fixtures/company.fixtures';
import {
  GenerateEmployee,
  GenerateBadEmployee,
} from '../fixtures/employee.fixtures';

import { AppModule } from '../../src/app/app.module';
import { AuthService } from '../../src/modules/auth/auth.service';

describe('', () => {
  let app: INestApplication;
  let request: Request;
  let authService: AuthService;

  let generateUser = new GenerateUser();
  const generateBadUser = new GenerateBadUser();

  const generateCompany = new GenerateCompany();
  const generateBadCompany = new GenerateBadCompany();

  const generateEmployee = new GenerateEmployee(2);
  const generateBadEmployee = new GenerateBadEmployee(1);

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
    const route = '/user';

    describe('[POST]: Create', () => {
      it('[201]: Create', async () => {
        const { body } = await request.post(route, 201, generateUser);
        return await request.setPasport(authService.createToken(body));
      });

      it('[400]: Bad-Request', async () => {
        return await request.post(route, 400, generateBadUser);
      });

      it('[409]: Conflict', async () => {
        return await request.post(route, 409, generateUser);
      });
    });

    describe('[Get]: Reflection', () => {
      it('[401]: Unauthorized', async () => {
        return await request.get(route, 401);
      });

      it('[200]: OK', async () => {
        return await request.getAuth(route, 200);
      });
    });

    describe('[Patch]: Update', () => {
      generateUser = new GenerateUser();

      it('[401]: Unauthorized', async () => {
        return await request.patch(route, 401, generateUser);
      });

      it('[400]: Bad-Request', async () => {
        return await request.patchAuth(route, 400, generateBadUser);
      });

      it('[200]: OK', async () => {
        await request.patchAuth(route, 200, generateUser);
        return await request.setPasport(authService.createToken(generateUser));
      });
    });

    describe('[Delete]: Delete', () => {
      it('[401]: Unauthorized', async () => {
        return await request.delete(route, 401);
      });

      it('[200]: OK', async () => {
        return await request.deleteAuth(route, 200);
      });
    });
  });

  describe('Auth flow (api/auth):', () => {
    const route = '/auth';

    describe('[POST]: Create', () => {
      it('[401]: Unauthorized - Unknow user', async () => {
        return await request.post(route, 401, new GenerateUser());
      });

      it('[401]: Unauthorized - Wrong password', async () => {
        return await request.post(route, 401, {
          email: generateUser.email,
          password: 'password111',
        });
      });

      it('[400]: Bad-Request', async () => {
        return await request.post(route, 400, generateBadUser);
      });

      it('[201]: Create', async () => {
        const { body } = await request.post(route, 201, generateUser);
        return await request.setPasport(body);
      });
    });
  });

  describe('Company flow (api/company):', () => {
    const route = '/company';

    describe('[POST]: Create', () => {
      it('[201]: Create', async () => {
        await request.postAuth(route, 201, new GenerateCompany());
        return await request.postAuth(route, 201, generateCompany);
      });

      it('[401]: Unauthorized', async () => {
        return await request.post(route, 401, generateCompany);
      });

      it('[400]: Bad-Request', async () => {
        return await request.postAuth(route, 400, generateBadCompany);
      });

      it('[409]: Conflict', async () => {
        return await request.postAuth(route, 409, generateCompany);
      });
    });

    describe('[Get]: Reflection limited', () => {
      it('[200]: OK', async () => {
        return await request.getAuth(`${route}?page=1&limit=10`, 200);
      });
    });

    describe('[Get:{id}]: Reflection by id', () => {
      it('[200]: OK', async () => {
        return await request.getAuth(route + '/1', 200);
      });

      it('[404]: Not Found', async () => {
        return await request.getAuth(route + '/9999', 404);
      });
    });

    describe('[Patch:{id}]: Update', () => {
      it('[404]: Not Found', async () => {
        return await request.patchAuth(route + '/8999', 400, generateBadCompany);
      });

      it('[401]: Unauthorized', async () => {
        return await request.patch(route + '/1', 401, generateCompany);
      });

      it('[400]: Bad-Request', async () => {
        return await request.patchAuth(route + '/1', 400, generateBadCompany);
      });

      it('[200]: OK', async () => {
        return await request.patchAuth(
          route + '/1',
          200,
          new GenerateCompany(),
        );
      });
    });

    describe('[Delete:{id}]: Delete', () => {
      it('[404]: Not Found', async () => {
        return await request.deleteAuth(route + '/9999', 404);
      });

      it('[401]: Unauthorized', async () => {
        return await request.delete(route + '/1', 401);
      });

      it('[200]: OK', async () => {
        return await request.deleteAuth(route + '/1', 200);
      });
    });
  });

  describe('Employee flow (api/employee):', () => {
    const route = '/employee';

    describe('[POST]: Create', () => {
      it('[201]: Create', async () => {
        return await request.postAuth(route, 201, generateEmployee);
      });

      it('[401]: Unauthorized', async () => {
        return await request.post(route, 401, generateEmployee);
      });

      it('[400]: Bad-Request', async () => {
        return await request.postAuth(route, 400, generateBadEmployee);
      });

      it('[409]: Conflict', async () => {
        return await request.postAuth(route, 409, generateEmployee);
      });
    });

    describe('[Get]: Reflection limited', () => {
      it('[200]: OK', async () => {
        return await request.getAuth(`${route}?page=1&limit=10`, 200);
      });
    });

    describe('[Get:{id}]: Reflection by id', () => {
      it('[200]: OK', async () => {
        return await request.getAuth(route + '/1', 200);
      });

      it('[404]: Not Found', async () => {
        return await request.getAuth(route + '/9999', 404);
      });
    });

    describe('[Patch:{id}]: Update', () => {
      it('[404]: Not Found', async () => {
        return await request.patchAuth(route + '/8999', 400, generateBadEmployee);
      });

      it('[401]: Unauthorized', async () => {
        return await request.patch(route + '/1', 401, generateEmployee);
      });

      it('[400]: Bad-Request', async () => {
        return await request.patchAuth(route + '/1', 400, generateBadEmployee);
      });

      it('[200]: OK', async () => {
        return await request.patchAuth(
          route + '/1',
          200,
          new GenerateEmployee(2),
        );
      });
    });

    describe('[Delete:{id}]: Delete', () => {
      it('[404]: Not Found', async () => {
        return await request.deleteAuth(route + '/9999', 404);
      });

      it('[401]: Unauthorized', async () => {
        return await request.delete(route + '/1', 401);
      });

      it('[200]: OK', async () => {
        return await request.deleteAuth(route + '/1', 200);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
