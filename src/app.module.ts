import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmailParserModule } from './email-parser/email-parser.module';
import { EmailParserService } from './email-parser/email-parser.service';
import { DriveModule } from './drive/drive.module';
import { GmailModule } from './gmail/gmail.module';
import { GmailController } from './gmail/gmail.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    AuthModule,
    GmailModule,
    DriveModule,
    EmailParserModule,
    DatabaseModule,
  ],
  controllers: [AppController, AuthController, GmailController],
  providers: [AppService, EmailParserService],
})
export class AppModule {}
