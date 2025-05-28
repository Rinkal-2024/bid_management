/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/gmail/gmail.controller.ts
import { Controller, Get } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { EmailParserService } from '../email-parser/email-parser.service';

@Controller('gmail')
export class GmailController {
  constructor(
    private readonly gmailService: GmailService,
    private readonly parser: EmailParserService,
  ) {}

  @Get('fetch')
  async fetchEmails() {
    const rawEmails = await this.gmailService.fetchRecentEmails();
    return rawEmails.map((email) => this.parser.parseEmailPayload(email));
  }
}
