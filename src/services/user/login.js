import db from '../../models/index.js';
import { oAuth2Client, SCOPES } from '../../config/google-auth';
import of from '../../helpers/awaitof.js';
const { google } = require('googleapis');
import jwt from 'jsonwebtoken';

let auth;
const loginTokens = async ({ code, type }) => {
  if (code && type) {
    const [response, err] = await of(oAuth2Client.getToken(code));
    if (err) return err;
    let token = response.tokens;

    oAuth2Client.setCredentials({ access_token: token.access_token });
    auth = oAuth2Client;
    token.expiry_date = token.expiry_date.toString();

    const service = google.oauth2({ version: 'v2', auth })
    const user = await service.userinfo.get()
    console.log(user.data)

    let jwtToken, userId;
    const dbUser = await db.users.findOne({
      where: { id: user.data.id },
      attributes: ['uuid', 'username']
    });

    if (dbUser) {
      const { uuid, username } = dbUser.dataValues;
      userId = uuid;
      jwtToken = jwt.sign({ uuid, id: user.data.id, username }, process.env.AUTH_SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
    } else {
      const { id, email, name, picture } = user.data;
      const userInfo = { id, email, picture, username: name }
      const [userdata, error] = await of(db.users.create(userInfo));
      const uuid = userdata.dataValues.uuid;
      userId = uuid;
      let data = {
        uuid,
        type,
        ...token
      }
      jwtToken = jwt.sign({ uuid, id, username: name }, process.env.AUTH_SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });

      const [accData, e] = await of(db.accounts.create(data));
      const savedStatus = fetchContacts(accData.dataValues.accid);
    }
    console.log(userId, jwtToken);
    return { userId, 'token': jwtToken };
  }
}

const login = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl
}

const fetchContacts = async (accid) => {
  // console.log(uuid);
  const service = google.people({ version: 'v1', auth });
  const [response, err] = await of(service.people.connections.list({
    resourceName: 'people/me',
    pageSize: 25,
    personFields: 'names,emailAddresses,phoneNumbers',
  }));
  if (err) return err;
  const connections = response.data.connections;
  if (connections) {
    let contact = {
      accid
    };
    let contacts = [];
    connections.forEach(async (person) => {
      if ((person.names && person.names.length > 0) || person.emailAddresses || person.phoneNumbers) {
        contact.name = person.names[0].displayName;
        if (person.emailAddresses)
          contact.email = person.emailAddresses[0].value;
        if (person.phoneNumbers)
          contact.phone = person.phoneNumbers[0].value;
        contacts.push({ ...contact });
      }
      else {
        console.log('No display name found for connection.');
      }
    });
    const [response, e] = await of(db.contacts.bulkCreate(contacts));
    return response;
  } else {
    console.log('No connections found.');
  }
}


export {
  login,
  loginTokens,
}