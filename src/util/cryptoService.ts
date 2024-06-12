import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const algorithm = 'aes-256-ctr';
const password = 'KLOUDE_CRYPTO_PASSWORD';
const salt = 'salt'; // Use a proper salt value

const encryptPassword = async (textToEncrypt: string) => {
  const iv = randomBytes(16);
  const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;
  const cipher = createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + encrypted;
};

const decryptPassword = async (encryptedText: string) => {
  const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extract the IV from the encrypted text
  const encrypted = encryptedText.slice(32); // Extract the encrypted data
  
  const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;
  const decipher = createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

export { encryptPassword, decryptPassword };