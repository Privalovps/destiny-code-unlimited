#!/bin/sh
set -eu

project=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
stage=$(mktemp -d "${TMPDIR:-/tmp}/destiny-unlimited-lock.XXXXXX")
trap 'rm -rf "$stage"' EXIT

cp "$project/package.json" "$project/package-lock.json" "$stage/"
if [ -f "$project/.npmrc" ]; then
  cp "$project/.npmrc" "$stage/"
fi
cd "$stage"

export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=384}"
export npm_config_cache="$stage/npm-cache"
# Keep the existing resolutions and fetch the missing package from its registry tarball.
# The scoped metadata endpoint returned an unusable response during the previous repair.
sharp_variant='@img/sharp-linuxmusl-arm64'
sharp_version=$(node -p 'require("./package-lock.json").packages["node_modules/sharp"].optionalDependencies["@img/sharp-linuxmusl-arm64"]')
tarball="https://registry.npmjs.org/$sharp_variant/-/sharp-linuxmusl-arm64-$sharp_version.tgz"
npm cache add "$tarball"
npm install --package-lock-only --save-optional --include=optional "$sharp_variant@$tarball"
cp "$project/package.json" "$stage/package.json"
npm install --package-lock-only --include=optional

node --input-type=module <<'NODE'
import { readFileSync } from 'node:fs';
const { packages } = JSON.parse(readFileSync('package-lock.json', 'utf8'));
if (packages[''].optionalDependencies?.['@img/sharp-linuxmusl-arm64']) {
  throw new Error('The Sharp variant must remain a transitive dependency');
}
for (const parent of ['next', 'sharp']) {
  const dependencies = packages[`node_modules/${parent}`]?.optionalDependencies;
  if (!dependencies || Object.keys(dependencies).length === 0) {
    throw new Error(`Missing optional dependency declarations for ${parent}`);
  }
  for (const [name, version] of Object.entries(dependencies)) {
    const entry = packages[`node_modules/${parent}/node_modules/${name}`] ??
      packages[`node_modules/${name}`];
    if (!entry?.version || !entry.resolved || !entry.integrity ||
        (name !== 'sharp' && entry.version !== version)) {
      throw new Error(`Missing or incomplete lock entry for ${name}@${version}`);
    }
  }
}
NODE

npm ci --include=optional --fetch-retries=0
node -e 'require("sharp"); require("next/package.json")'
cp "$stage/package-lock.json" "$project/package-lock.json"
