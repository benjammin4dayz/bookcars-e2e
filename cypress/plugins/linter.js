// https://github.com/benjammin4dayz/cypress-e2e-template/blob/73e5feffbefe04d500a0dc8e9658b8a041534fa4/cypress/plugins/linter.js

import { execSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// when using the interactive cypress window, the following config key must be set:
// experimentalInteractiveRunEvents: true,
//
// if falsy, the events that trigger this plugin will only run in headless mode
//

export default function (
  on,
  config,
  { pauseOnError = true, pauseDuration = 5000 } = {}
) {
  let initialHash, isStartup, isBusy;

  const calculateHash = ({ ignore = ['node_modules'] } = {}) => {
    const hash = crypto.createHash('sha256');

    const walkSync = (dir, filelist = []) => {
      const files = fs.readdirSync(dir, {
        encoding: 'utf8',
        withFileTypes: true,
      });

      files.forEach(file => {
        if (ignore.includes(file.name)) return;

        if (file.isDirectory()) {
          filelist = walkSync(path.join(dir, file.name), filelist);
        } else {
          filelist.push(path.join(dir, file.name));
        }
      });

      return filelist;
    };

    const files = walkSync(config.fileServerFolder);

    for (const file of files) {
      hash.update(fs.readFileSync(file, 'utf8'));
    }

    return hash.digest('hex');
  };

  const lint = async () => {
    if (isBusy) return;

    // these values are set when cypress first loads the plugin
    if (!initialHash) {
      initialHash = calculateHash();
      isStartup = true;
    }

    const currentHash = calculateHash();

    if (initialHash !== currentHash || isStartup) {
      isBusy = true;

      await new Promise(resolve => {
        let clean = false;

        try {
          execSync('npm run lint', { stdio: 'inherit' });
          clean = true;
        } catch {
          // ignore
        }

        if (pauseOnError && !clean) {
          setTimeout(resolve, pauseDuration);
        } else if (clean) {
          console.log('✓ No errors found. Happy testing!');
          resolve();
        } else {
          resolve();
        }
      });

      isStartup = false;
      initialHash = currentHash;

      // leave some grace time to prevent duplicate plugin runs
      setTimeout(() => {
        isBusy = false;
      }, Math.random() * 750 + 250);
    }
  };

  on('before:run', lint);
  on('before:spec', lint);
}
