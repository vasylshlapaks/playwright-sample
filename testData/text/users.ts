export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  authTokenName: string;
}

export const userForSettingsTests: User = {
  email: 'testingemails@uitests4.mail7.io',
  password: process.env.USER_PASSWORD,
  firstName: 'automation',
  lastName: 'test',
  phoneNumber: '+995511111111',
  authTokenName: 'AUTH_TOKEN_FOR_SETTINGS'
}; 
