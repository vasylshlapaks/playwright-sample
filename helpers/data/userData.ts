import { config } from 'dotenv';

config();

export const GMAIL_USER = {
  EMAIL: 'testerok444u1@gmail.com',
  PASSWORD: process.env.GMAIL_PASSWORD,
  RECOVERY_EMAIL: 'testerok333@gmail.com',
  NAME: 'testing user',
};

export const GMAIL_EMAILS = [
  GMAIL_USER.EMAIL
];

export const GMAIL_USERS = [GMAIL_USER];
