import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import json from '@rollup/plugin-json'
import { RollupOptions } from 'rollup'
import copy from 'rollup-plugin-copy'
import esbuild from 'rollup-plugin-esbuild'
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'

const config: RollupOptions = {
  input: 'src/mod.ts',
  plugins: [
    preserveShebangs(),
    eslint(),
    commonjs(),
    json(),
    esbuild({
      minify: true
    }),
    copy({
      targets: [
        {
          src: 'src/templates/*',
          dest: 'dist/templates/'
        }
      ]
    }),
    getBabelOutputPlugin({
      presets: ['@babel/preset-env']
    })
  ],
  output: [
    {
      file: 'bin/bundler.js',
      format: 'cjs',
      compact: true,
      banner: '#!/usr/bin/env node'
    }
  ],
  external: [
    'fs',
    'util',
    'regenerator-runtime/runtime',
    'path',
    'archiver',
    'chalk',
    'readline',
    'arg'
  ]
}

export default config
