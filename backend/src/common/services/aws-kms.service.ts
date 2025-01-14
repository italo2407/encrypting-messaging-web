import { Injectable } from '@nestjs/common';
import {
  KMSClient,
  GenerateDataKeyPairCommand,
  DataKeyPairSpec,
  DecryptCommand,
} from '@aws-sdk/client-kms';

@Injectable()
export class AwsKmsService {
  private kmsClient: KMSClient;

  constructor() {
    this.kmsClient = new KMSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async generateDataKeyPair(): Promise<{ publicKey: any; privateKey: string }> {
    const params = {
      KeyId: process.env.AWS_KMS_KEY_ID, // ID de tu clave KMS principal
      KeyPairSpec: DataKeyPairSpec.RSA_2048, // Tipo de clave (puedes usar DataKeyPairSpec.ECC_NIST_P256, etc.)
    };

    const command = new GenerateDataKeyPairCommand(params);
    const response = await this.kmsClient.send(command);

    // Devuelve las claves en formato deseado
    return {
      publicKey: response.PublicKey ? Buffer.from(response.PublicKey).toString('base64') : '',
      privateKey: response.PrivateKeyCiphertextBlob
        ? Buffer.from(response.PrivateKeyCiphertextBlob).toString('base64')
        : '',
    };
  }

  async decryptPrivateKey(privateKeyCiphertextBlobToDecrypt: Uint8Array): Promise<Uint8Array> {
    // Crear la solicitud de descifrado
    const decRequest = new DecryptCommand({
      CiphertextBlob: privateKeyCiphertextBlobToDecrypt,
    });

    try {
      // Ejecutar el comando de descifrado
      const decResponse = await this.kmsClient.send(decRequest);

      // Retornar el texto descifrado como Uint8Array
      if (decResponse.Plaintext) {
        return decResponse.Plaintext;
      } else {
        throw new Error('No plaintext returned from KMS');
      }
    } catch (error) {
      console.error('Error decrypting data:', error);
      throw error;
    }
  }
}
