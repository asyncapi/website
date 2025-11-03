import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

const baseDir = dirname(fileURLToPath(import.meta.url));

/**
 * Generate a PNG QR code pointing to the Join page and save it under public/img/join-qr.png.
 */
async function main() {
  const outPath = resolve(baseDir, '..', 'public', 'img', 'join-qr.png');
  const url = 'https://www.asyncapi.com/join';

  const buffer = await QRCode.toBuffer(url, {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 2,
    width: 512,
    color: {
      dark: '#000000',
      light: '#FFFFFFFF'
    }
  });

  await writeFile(outPath, new Uint8Array(buffer));
  // eslint-disable-next-line no-console
  console.log(`QR generated at ${outPath}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
