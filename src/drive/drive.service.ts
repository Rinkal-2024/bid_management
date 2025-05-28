/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleStrategy } from 'src/auth/google.strategy';
import * as fs from 'fs';

@Injectable()
export class DriveService {
  constructor(private readonly authService: GoogleStrategy) {}

  async uploadFile(filePath: string, fileName: string) {
    const auth = this.authService.getClient();
    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
      },
      media: {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(filePath),
      },
    });

    return response.data;
  }
}
