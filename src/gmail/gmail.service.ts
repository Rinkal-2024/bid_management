/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleStrategy } from 'src/auth/google.strategy';

@Injectable()
export class GmailService {
  constructor(private readonly authService: GoogleStrategy) {}
  async listMessages(accessToken: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });

    return res.data.messages || [];
  }

  async getMessageDetails(accessToken: string, messageId: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.get({ userId: 'me', id: messageId });

    return res.data;
  }
  async fetchRecentEmails() {
    const auth = this.authService.getClient();
    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });

    const messages = (res.data.messages || []).filter(
      (msg) => typeof msg.id === 'string',
    );
    return Promise.all(
      messages.map(async (msg) => {
        const detail = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id as string,
        });
        return detail.data;
      }),
    );
  }
}
