import { build } from 'esbuild';
import { tsconfigPaths } from '@esbuild-plugins/tsconfig-paths';

(async () => {
  await build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: './dist',
    platform: 'node',
    // external: ['awilix'],
    plugins: [tsconfigPaths()],
  });
})()
  .then(() => {
    console.debug('Build Complete ✅');
  })
  .catch(() => console.error('Some error occured during the build process'));
