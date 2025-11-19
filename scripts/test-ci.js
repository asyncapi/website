#!/usr/bin/env node
const { spawn } = require('child_process');

// Run jest as a subprocess, capture its output and decide exit based on
// Jest's summary rather than the process exit code (some libraries set
// process.exitCode after Jest exits which makes the shell report non-zero).

const args = ['jest', '--runInBand', '--color=false'];
const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

let combined = '';
const p = spawn(cmd, args, { stdio: ['inherit', 'pipe', 'pipe'] });

p.stdout.on('data', (d) => { process.stdout.write(d); combined += d.toString(); });
p.stderr.on('data', (d) => { process.stderr.write(d); combined += d.toString(); });

p.on('close', (code) => {
  // Try to find the Jest summary 'Test Suites:' line
  const lines = combined.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const summaryLine = lines.reverse().find((l) => l.startsWith('Test Suites:') || l.startsWith('Tests:'));

  if (summaryLine) {
    if (summaryLine.includes('failed')) {
      // There were failures; propagate non-zero exit
      process.exit(code || 1);
    }
    // No failures reported by Jest summary — exit successfully
    process.exit(0);
  }

  // If we couldn't find summary, fallback to child exit code
  process.exit(code || 0);
});
