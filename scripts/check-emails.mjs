// Fails the build if any company email address appears in plain form in dist/.
// Run after `pnpm build`:  pnpm check:emails
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = 'dist';
const BINARY = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.otf']);
const patterns = [
  /@eagleinnovia\.com/i,
  /eagleinnovia@gmail\.com/i,
  /%40eagleinnovia\.com/i, // URL-encoded
  /&#0*64;eagleinnovia/i, // HTML entity @
  /mailto:[^"'\s>]*@/i, // a mailto link with a real address
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let files = 0;
const hits = [];
try {
  for await (const file of walk(DIST)) {
    if (BINARY.has(extname(file).toLowerCase())) continue;
    files++;
    const text = await readFile(file, 'utf8');
    for (const re of patterns) {
      const m = text.match(re);
      if (m) hits.push(`${file}: found "${m[0]}"`);
    }
  }
} catch (e) {
  console.error(`check:emails — could not read ${DIST}/. Run "pnpm build" first.\n${e.message}`);
  process.exit(1);
}

if (hits.length) {
  console.error(`check:emails FAILED — plain email addresses found:\n  ${hits.join('\n  ')}`);
  process.exit(1);
}
console.log(`check:emails passed — ${files} files scanned, no plain email addresses found.`);
