import { KeyObject, createPublicKey, createPrivateKey } from 'crypto';

export function getPublicKey(byteArrayPublicKey: Buffer): KeyObject {
  try {
    //Generar la clave pública a partir del array de bytes en formato DER
    const publicKey = createPublicKey({
      key: byteArrayPublicKey,
      format: 'der',
      type: 'pkcs1', // El tipo estándar para una clave pública RSA en formato DER
    });
    //const publicKey = createPublicKey(byteArrayPublicKey);
    return publicKey;
  } catch (error) {
    console.error(error);
    console.error('Error al generar la clave pública:', error);
    throw new Error('Error al generar la clave pública');
  }
}

export function getPrivateKey(byteArrayPrivateKey: Buffer): KeyObject {
  try {
    // Generar la clave privada a partir del array de bytes en formato DER
    const privateKey = createPrivateKey({
      key: byteArrayPrivateKey,
      format: 'der',
      type: 'pkcs8', // El tipo estándar para una clave privada en formato DER (PKCS#8)
    });
    return privateKey;
  } catch (error) {
    console.error('Error al generar la clave privada:', error);
    throw new Error('Error al generar la clave privada');
  }
}
