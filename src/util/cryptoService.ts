import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

const algorithm = 'aes-256-ctr';
const iv = randomBytes(16);
const password = 'KLOUDE_CRYPTO_PASSWORD';

const encryptPassword = async (textToEncrypt: string) => {
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);

return Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]).toString('hex')
};

const decryptPassword = async (encryptedText: string) => {
    const key = await promisify(scrypt)(password, 'salt', 32) as Buffer;
    const decipher = createDecipheriv(algorithm, key, iv);
  
    const encryptedBuffer = Buffer.from(encryptedText, 'hex');
    return Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]).toString();
};

export  {encryptPassword,decryptPassword};
