#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const thisFile = fileURLToPath(import.meta.url);
const packRoot = path.resolve(path.dirname(thisFile), '..');
const args = process.argv.slice(2);
const targetArg = args.find((a) => !a.startsWith('--')) || '.';
const targetRoot = path.resolve(process.cwd(), targetArg);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const dryRun = flags.has('--dry-run');
const force = flags.has('--force');
const full = flags.has('--full');
const sidecar = flags.has('--sidecar') || !full;
const noAdapters = flags.has('--no-adapters') || sidecar;
const noClientConfig = flags.has('--no-client-config') || sidecar;
const noSkills = flags.has('--no-skills');
const noHooks = flags.has('--no-hooks');
const noDocs = flags.has('--no-docs');
const allowDirty = flags.has('--allow-dirty');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
let phase = 'plan';
let actions = [];
let conflicts = [];
const reportHeader = [];

function usage() {
  console.log(`AI Project Control Plane installer\n\nUsage:\n  node bin/install-into-project.mjs <target> [options]\n\nSafe default:\n  Installs sidecar/audit mode only. It does not install or overwrite AGENTS.md, CLAUDE.md, .claude/, or .codex/.\n\nOptions:\n  --dry-run            Show intended changes only\n  --sidecar            Sidecar/audit install only (default)\n  --full               Install full adapters and client mirrors\n  --force              Allow overwriting conflicting files after backup\n  --allow-dirty        Allow full install in a dirty git tree\n  --no-adapters        Do not install AGENTS.md / CLAUDE.md\n  --no-client-config   Do not install .claude / .codex\n  --no-skills          Do not install skills/\n  --no-hooks           Do not install hooks/ examples\n  --no-docs            Do not install docs under docs/ai-control-plane\n`);
}
if (flags.has("--help") || flags.has("-h")) { usage(); process.exit(0); }

function run(cmd, cwd = targetRoot) {
  try { return execSync(cmd, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); }
  catch { return null; }
}
function rel(base, p) { return path.relative(base, p).replaceAll(path.sep, '/'); }
function exists(p) { return fs.existsSync(p); }
function listFiles(dir) {
  if (!exists(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out.sort();
}
function backupPath(dest) { return path.join(targetRoot, '.ai', 'tmp', 'install-backups', stamp, rel(targetRoot, dest)); }
function copyFileSafe(src, dest) {
  const targetRel = rel(targetRoot, dest);
  const content = fs.readFileSync(src);
  if (exists(dest)) {
    const same = fs.readFileSync(dest).equals(content);
    if (same) { actions.push(`unchanged ${targetRel}`); return; }
    if (!force) { conflicts.push(targetRel); return; }
    const b = backupPath(dest);
    actions.push(`backup ${targetRel} -> ${rel(targetRoot, b)}`);
    actions.push(`overwrite ${targetRel}`);
    if (phase === 'apply') {
      fs.mkdirSync(path.dirname(b), { recursive: true });
      fs.copyFileSync(dest, b);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
    return;
  }
  actions.push(`create ${targetRel}`);
  if (phase === 'apply') { fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.copyFileSync(src, dest); }
}
function copyTreeSafe(srcDir, dstDir, opts = {}) {
  if (!exists(srcDir)) return;
  for (const src of listFiles(srcDir)) {
    const sub = rel(srcDir, src);
    if (opts.exclude?.some((prefix) => sub === prefix || sub.startsWith(prefix + '/'))) continue;
    copyFileSafe(src, path.join(dstDir, sub));
  }
}
function installPlanOrApply() {
  copyTreeSafe(path.join(packRoot, '.ai'), path.join(targetRoot, '.ai'), { exclude: ['tmp'] });
  copyTreeSafe(path.join(packRoot, 'schemas'), path.join(targetRoot, 'schemas'));
  copyTreeSafe(path.join(packRoot, 'shared'), path.join(targetRoot, 'shared'));
  if (!noSkills) copyTreeSafe(path.join(packRoot, 'skills'), path.join(targetRoot, 'skills'));
  if (!noHooks) copyTreeSafe(path.join(packRoot, 'hooks'), path.join(targetRoot, 'hooks'));
  if (!noDocs) copyTreeSafe(path.join(packRoot, 'docs'), path.join(targetRoot, 'docs', 'ai-control-plane'));
  if (!noAdapters) for (const f of ['AGENTS.md', 'CLAUDE.md']) copyFileSafe(path.join(packRoot, f), path.join(targetRoot, f));
  if (!noClientConfig) { copyTreeSafe(path.join(packRoot, '.claude'), path.join(targetRoot, '.claude')); copyTreeSafe(path.join(packRoot, '.codex'), path.join(targetRoot, '.codex')); }
  if (phase === 'apply') { fs.mkdirSync(path.join(targetRoot, '.ai', 'reports'), { recursive: true }); fs.mkdirSync(path.join(targetRoot, '.ai', 'proposed-memory'), { recursive: true }); }
}
function buildReport(extra = []) {
  const lines = [...reportHeader];
  lines.push('## Actions', '');
  lines.push(...(actions.length ? actions.map((a) => `- ${a}`) : ['- none']));
  lines.push('', '## Conflicts', '');
  lines.push(...(conflicts.length ? [...new Set(conflicts)].map((c) => `- ${c}`) : ['- none']));
  lines.push('', '## Recommended next steps', '');
  if (full) lines.push('- Run `node .ai/sync/doctor.mjs`.', '- Run `node .ai/sync/validate.mjs --mode=full`.', '- Review all adapter/config changes before committing.');
  else lines.push('- Run `node .ai/sync/doctor.mjs`.', '- Run `node .ai/sync/scan-project.mjs --audit-only`.', '- Run `node .ai/sync/validate.mjs --mode=sidecar`.', '- Do not run full adapter sync until the bridge plan is reviewed.');
  if (extra.length) lines.push('', ...extra);
  return lines.join('\n') + '\n';
}
function writeReport(text) {
  console.log(text.trimEnd());
  if (phase === 'apply') {
    const reportPath = path.join(targetRoot, '.ai', 'reports', `install-report-${stamp}.md`);
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, text, 'utf8');
  }
}
function preflight() {
  if (!exists(targetRoot)) { console.error(`Target does not exist: ${targetRoot}`); process.exit(1); }
  const gitTop = run('git rev-parse --show-toplevel');
  const gitStatus = run('git status --porcelain');
  reportHeader.push('# AI Control Plane Install Report', '', `- timestamp: ${new Date().toISOString()}`, `- mode: ${full ? 'full' : 'sidecar'}`, `- dry_run: ${dryRun}`, `- force: ${force}`, `- target: ${targetRoot}`, `- git_repository: ${gitTop ? 'yes' : 'no'}`, `- git_status: ${gitStatus === '' ? 'clean' : gitStatus ? 'dirty' : 'unknown'}`, '');
  if (full && gitStatus && gitStatus !== '' && !allowDirty) {
    console.error('Refusing full install in a dirty git tree. Commit/stash first or pass --allow-dirty after review.');
    process.exit(2);
  }
}
preflight();
installPlanOrApply();
if (conflicts.length && !force) {
  writeReport(buildReport(['Installation stopped before applying changes because conflicts were found. No files were written by this run.']));
  console.error('\nInstallation stopped before applying changes because conflicts were found.');
  process.exit(3);
}
if (dryRun) {
  writeReport(buildReport(['Dry run only. No files were written.']));
  process.exit(0);
}
phase = 'apply';
actions = [];
conflicts = [];
installPlanOrApply();
writeReport(buildReport([`Install completed in ${full ? 'full' : 'sidecar'} mode.`]));
console.log(`\nInstall completed in ${full ? 'full' : 'sidecar'} mode.`);
process.exit(0);
