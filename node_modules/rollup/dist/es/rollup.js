/*
  @license
	Rollup.js v4.26.0
	Wed, 13 Nov 2024 06:44:29 GMT - commit ae1d14b7855ff6568a6697d37271a5eb4d8e2d3e

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
import 'tty';
