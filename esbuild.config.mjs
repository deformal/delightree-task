import { build } from 'esbuild';

(async () => {
  await build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: './dist',
    platform: 'node',
  });
})()
  .then(() => {
    console.debug('Build Complete ✅');
  })
  .catch(() => console.error('Some error occured during the build process'));
