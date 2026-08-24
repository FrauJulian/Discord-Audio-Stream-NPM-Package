import { defineConfig } from 'tsup';

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    dts: {
        compilerOptions: {
            // tsup's declaration bundler still sets the removed baseUrl option internally.
            ignoreDeprecations: '6.0',
        },
    },
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
});
