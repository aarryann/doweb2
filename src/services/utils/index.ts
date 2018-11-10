import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import fetch from 'isomorphic-fetch';

declare const process: IProcess;

const algorithm = 'aes-256-ctr';
const password = 'a8E7Yg2S';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const buildHeaders = () => {
  const authToken = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);

  return { ...defaultHeaders, Authorization: authToken };
};

export const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: any = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

export const parseJSON = (response: any) => {
  return response.json();
};

export const httpGet = (url: string) => {
  return fetch(url, { headers: buildHeaders() } as any)
    .then(checkStatus)
    .then(parseJSON);
};

export const httpPost = (url: string, data: any) => {
  const body = JSON.stringify(data);

  return fetch(url, { method: 'post', headers: buildHeaders(), body } as any)
    .then(checkStatus)
    .then(parseJSON);
};

export const httpDelete = (url: string) => {
  return fetch(url, { method: 'delete', headers: buildHeaders() } as any)
    .then(checkStatus)
    .then(parseJSON);
};

export const encrypt = (text: string) => {
  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const decrypt = (text: string) => {
  const decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

export const hash = (pass: string) => {
  return bcrypt.hashSync(pass, 10);
};

export const compareHash = (pass: string, hashed: string) => {
  return bcrypt.compareSync(pass, hashed);
};
