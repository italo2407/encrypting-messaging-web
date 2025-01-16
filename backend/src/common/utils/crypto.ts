import {
  publicEncrypt,
  privateDecrypt,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from 'crypto';
import { convertBase64ToPEM } from './convert-base64-PEM';

export function encryptMessage(publicKey: string, message: string) {
  const buffer = Buffer.from(message, 'utf8');
  //Generar clave AES (clave simétrica)
  const aesKey = randomBytes(32); // Clave AES de 256 bits
  const iv = randomBytes(16);

  //Cifrar los datos grandes con AES-GCM
  const cipher = createCipheriv('aes-256-gcm', aesKey, iv);
  const encryptedData = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  const publicKeyPEM = convertBase64ToPEM(publicKey, 'PUBLIC');
  const encryptedAesKey = publicEncrypt(publicKeyPEM, aesKey);
  //return encrypted.toString('base64'); // El mensaje cifrado se almacena como texto base64
  const encryptedOutput = {
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
    encryptedData: encryptedData.toString('base64'),
    encryptedKey: encryptedAesKey.toString('base64'),
  };

  return Buffer.from(JSON.stringify(encryptedOutput));
}

export function decryptMessage(privateKey: string, encryptedMessage: Buffer): string {
  const encryptedMessageContent = JSON.parse(encryptedMessage.toString('utf-8'));
  const { iv, authTag, encryptedData, encryptedKey } = encryptedMessageContent;

  const privateKeyPEM = convertBase64ToPEM(privateKey, 'PRIVATE');
  const aesKey = privateDecrypt(privateKeyPEM, Buffer.from(encryptedKey, 'base64'));

  const decipher = createDecipheriv('aes-256-gcm', aesKey, Buffer.from(iv, 'base64'));
  decipher.setAuthTag(Buffer.from(authTag, 'base64'));

  const decryptedData = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'base64')),
    decipher.final(),
  ]);

  return decryptedData.toString('utf8');
}
