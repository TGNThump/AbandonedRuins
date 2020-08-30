#!/usr/bin/env node

const packageJson = require("../package.json");
const { writeFile, copyFile, mkdir,rmdir } = require("fs");
const { spawn } = require("child_process");
const { ncp } = require('ncp');
const { promisify }  = require('util');
const zip = require('bestzip');

let path = `dist/${packageJson.name}_${packageJson.version}`;

(async () => {

  await promisify(rmdir)(path, {recursive: true});
  await promisify(mkdir)(path, {recursive: true});

  await Promise.all([
    new Promise((resolve, reject) => {
      spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', ['tstl', '-p', 'tsconfig.json', '--outDir', path], {stdio: "inherit"}).on('close', code => {
        if (code !== 0) reject(code);
        else resolve();
      });
    }),
    promisify(writeFile)(path + '/info.json', JSON.stringify({
      name: packageJson.name,
      version: packageJson.version,
      title: packageJson.config.title,
      author: packageJson.author,
      contact: packageJson.bugs,
      description: packageJson.description,
      factorio_version: packageJson.config.factorio_version,
    })),
    promisify(ncp)('public', path),
    promisify(copyFile)('README.md', path + '/README.md'),
    promisify(copyFile)('LICENSE.md', path + '/LICENSE.md')
  ]);

  await zip({source: `${packageJson.name}_${packageJson.version}`, destination: `${packageJson.name}_${packageJson.version}.zip`, cwd: 'dist'})

  process.stdout.write(`dist/${packageJson.name}_${packageJson.version}.zip`);
})();