import { publicEncrypt, privateDecrypt } from 'crypto';
import { convertBase64ToPEM } from './convert-base64-PEM';

export function encryptMessage(publicKey: string, message: string) {
  const buffer = Buffer.from(message, 'utf8');
  //const publicKeyPEM = getPublicKey(Buffer.from(publicKey, 'base64'));
  const publicKeyPEM = convertBase64ToPEM(publicKey, 'PUBLIC');
  const encrypted = publicEncrypt(publicKeyPEM, buffer);
  //return encrypted.toString('base64'); // El mensaje cifrado se almacena como texto base64
  return encrypted;
}

export function decryptMessage(privateKey: string, encryptedMessage: Buffer): string {
  const privateKeyPEM = convertBase64ToPEM(privateKey, 'PRIVATE');
  console.log(privateKeyPEM);
  const decrypted = privateDecrypt(privateKeyPEM, encryptedMessage);
  return decrypted.toString('utf8');
}
