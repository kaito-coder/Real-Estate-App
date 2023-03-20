import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

export const users = [
  {
    id: mongoose.Types.ObjectId(),
    firstName: 'tran',
    lastName: 'duy',
    email: 'duytran@gmail.com',
    gender: 'male',
    nationalId: '123123',
    password: 'duyduyduy',
    passwordConfirm: 'duyduyduy',
  },
];
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const estatesJson = fs.readFileSync(
  path.join(__dirname, 'estates.json'),
  'utf-8'
);
const estates_v1 = JSON.parse(estatesJson);

export const estates_v2 = (estateStatus, estateType) => {
  return estates_v1.map((estate) => {
    return {
      ...estate,
      currentStatus: estateStatus,
      type: estateType,
      owner: users.filter((user) => user.lastName === 'duy')[0]?.id,
    };
  });
};
