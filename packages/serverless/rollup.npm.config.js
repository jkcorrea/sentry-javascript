import { makeBaseNPMConfig, makeNPMConfigVariants } from '../../rollup/index.js';

export default makeNPMConfigVariants(
  makeBaseNPMConfig({
    entrypoints: ['src/index.ts', 'src/awslambda-auto.ts'],
    // packages with bundles have a different build directory structure
    hasBundles: true,
  }),
);
