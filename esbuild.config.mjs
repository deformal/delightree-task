import { build } from 'esbuild';
import { TsconfigPathsPlugin } from '@esbuild-plugins/tsconfig-paths';

(async () => {
  await build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: './dist',
    platform: 'node',
    // external: ['awilix'],
    plugins: [
      TsconfigPathsPlugin({
        tsconfig: {
          compilerOptions: {
            module: 'CommonJS',
            declaration: true,
            removeComments: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            allowSyntheticDefaultImports: true,
            target: 'ES2023',
            sourceMap: true,
            esModuleInterop: true,
            strict: true,
            outDir: './dist',
            baseUrl: './',
            incremental: true,
            skipLibCheck: true,
            strictNullChecks: true,
            forceConsistentCasingInFileNames: true,
            strictPropertyInitialization: false,
            noImplicitAny: false,
            strictBindCallApply: false,
            noFallthroughCasesInSwitch: false,
            paths: {
              '@delightree-task/*': ['./src/types/*'],
              '@delightree-task-models/*': ['./src/infra/mongo/schemas/*'],
              '@delightree-task/constants': ['./src/constants'],
              '@delightree-task-mongo/connect': [
                './src/infra/mongo/mongo-connect',
              ],
            },
          },
        },
      }),
    ],
  });
})()
  .then(() => {
    console.debug('Build Complete ✅');
  })
  .catch((err) => console.error(err));
