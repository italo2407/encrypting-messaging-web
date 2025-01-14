export function convertBase64ToPEM(base64Key: string, type: 'PUBLIC' | 'PRIVATE'): string {
  const header =
    type === 'PRIVATE' ? '-----BEGIN PRIVATE KEY-----\n' : '-----BEGIN PUBLIC KEY-----\n';
  const footer = type === 'PRIVATE' ? '\n-----END PRIVATE KEY-----' : '\n-----END PUBLIC KEY-----';

  // Divide el contenido Base64 en líneas de 64 caracteres para cumplir con el formato PEM
  const keyLines = base64Key.match(/.{1,64}/g)?.join('\n');

  return header + keyLines + footer;
}
