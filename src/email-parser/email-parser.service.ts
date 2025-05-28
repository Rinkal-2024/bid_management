/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/email-parser/email-parser.service.ts
import { Injectable } from '@nestjs/common';

interface EmailHeader {
  name: string;
  value: string;
}

@Injectable()
export class EmailParserService {
  parseEmailPayload(payload: any) {
    const headers = payload.payload.headers;
    const subject = headers.find((h) => h.name === 'Subject')?.value;
    const from = headers.find((h: EmailHeader) => h.name === 'From')?.value;
    const to = headers.find((h) => h.name === 'To')?.value;

    const parts = payload.payload.parts || [];
    const bodyPart = parts.find((p) => p.mimeType === 'text/plain');

    const body = bodyPart?.body?.data
      ? Buffer.from(bodyPart.body.data, 'base64').toString('utf8')
      : '';

    return { subject, from, to, body };
  }
}
