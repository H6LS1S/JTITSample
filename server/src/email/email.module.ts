import { Module, Global } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

import { ConfigService } from '../config/config.service';
import { EmailService } from './email.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          secureConnection: configService.get('NODE_TLS_REJECT_UNAUTHORIZED'),
          port: configService.get('EMAIL_PORT'),
          host: configService.get('EMAIL_HOST'),
          user: configService.get('EMAIL_USERNAME'),
          password: configService.get('EMAIL_PASSWORD'),

          tls: {
            rejectUnauthorized: configService.get(
              'NODE_TLS_REJECT_UNAUTHORIZED',
            ),
            ciphers: configService.get('EMAIL_CIPHERS'),
          },
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
