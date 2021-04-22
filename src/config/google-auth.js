import credentials from './client-secret.json'

const { google } = require('googleapis');

export const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/contacts.other.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile']

const { client_secret, client_id, redirect_uris } = credentials.installed;
export const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

