/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
console.log('Google Strategy Loaded', process.env.GOOGLE_CLIENT_ID);
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private oAuth2Client;
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/drive.file',
      ],
      accessType: 'offline',
      prompt: 'consent',
    });
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = {
      accessToken,
      refreshToken,
      profile,
    };
    done(null, user);
  }
  getClient() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.oAuth2Client;
  }
}
