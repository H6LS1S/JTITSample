import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export class PasportJWT {
  expiresIn: number;
  token: string;
}

export class Request {
  constructor(private readonly app: INestApplication) {}

  private readonly server: any = request(this.app.getHttpServer());
  private password: PasportJWT = new PasportJWT();

  getPasport(): PasportJWT {
    return this.password;
  }

  async setPasport(payload: Promise<PasportJWT>): Promise<PasportJWT> {
    return (this.password = await payload);
  }

  async post(controler: string, statusCode: number, payload?: any) {
    return await this.server
      .post(controler)
      .send(payload)
      .expect(statusCode)
      .expect('Content-Type', 'application/json; charset=utf-8');
  }

  async postAuth(controler: string, statusCode: number, payload?: any) {
    return await this.server
      .post(controler)
      .send(payload)
      .set('Authorization', 'Bearer ' + this.getPasport().token)
      .expect(statusCode)
      .expect('Content-Type', 'application/json; charset=utf-8');
  }

  async get(controler: string, statusCode: number) {
    return await this.server
      .get(controler)
      .expect(statusCode)
      .expect('Content-Type', 'application/json; charset=utf-8');
  }

  async getAuth(controler: string, statusCode: number) {
    return await this.server
      .get(controler)
      .set('Authorization', 'Bearer ' + this.getPasport().token)
      .expect(statusCode)
      .expect('Content-Type', 'application/json; charset=utf-8');
  }

  async patch(controler: string, statusCode: number, payload?: any) {
    return await this.server
      .patch(controler)
      .send(payload)
      .expect(statusCode)
      .expect('Content-Type', 'application/json; charset=utf-8');
  }

  async patchAuth(controler: string, statusCode: number, payload?: any) {
    return await this.server
      .patch(controler)
      .send(payload)
      .set('Authorization', 'Bearer ' + this.getPasport().token)
      .expect(statusCode)
      .expect('Content-Type', 'application/json; charset=utf-8');
  }

  async delete(controler: string, statusCode: number) {
    return await this.server
      .delete(controler)
      .expect(statusCode)
      .expect('Content-Type', 'application/json; charset=utf-8');
  }

  async deleteAuth(controler: string, statusCode: number) {
    return await this.server
      .delete(controler)
      .set('Authorization', 'Bearer ' + this.getPasport().token)
      .expect(statusCode)
      .expect('Content-Type', 'application/json; charset=utf-8');
  }
}
