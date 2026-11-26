import { spawnSync } from 'node:child_process';
import { stat, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('./dist/portfolio.pdf', import.meta.url));
const printPage = new URL('./dist/print.html', import.meta.url);
await unlink(output).catch((error) => {
  if (error.code !== 'ENOENT') throw error;
});

const result = spawnSync(process.env.CHROME_BIN || 'google-chrome', [
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  `--print-to-pdf=${output}`,
  printPage.href,
], { stdio: 'inherit' });

if (result.error) throw result.error;
if (result.status !== 0 || !(await stat(output)).size) throw new Error('PDF 생성 실패');
await unlink(printPage);
