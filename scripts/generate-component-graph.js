const fs = require('fs');
const path = require('path');

function walkDir(dir, ext, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, ext, files);
    else if (ext.includes(path.extname(e.name))) files.push(full);
  }
  return files;
}

function normalizeName(filePath, baseDir) {
  const rel = path.relative(baseDir, filePath).replace(/\\/g, '/');
  return rel.replace(/\.(tsx|ts|jsx|js)$/, '');
}

function parseImports(fileContent) {
  const imports = [];
  const importRe = /import\s+(?:[^'"']+from\s+)?['"]([^'"]+)['"]/g;
  let m;
  while ((m = importRe.exec(fileContent))) {
    imports.push(m[1]);
  }
  return imports;
}

function buildGraph(baseDir) {
  const files = walkDir(baseDir, ['.tsx', '.ts', '.jsx', '.js']);
  const nodes = new Set();
  const edges = [];

  const appFiles = files.filter(f => f.includes('/app/'));

  for (const f of appFiles) {
    const content = fs.readFileSync(f, 'utf8');
    const srcName = normalizeName(f, baseDir);
    nodes.add(srcName);
    const imports = parseImports(content);
    for (const imp of imports) {
      // only consider relative imports inside app/
      if (imp.startsWith('.') || imp.startsWith('/')) {
        const resolved = path.resolve(path.dirname(f), imp);
        // try with extensions
        const candidates = [resolved + '.tsx', resolved + '.ts', resolved + '.jsx', resolved + '.js', resolved, path.join(resolved, 'index.tsx'), path.join(resolved, 'index.ts')];
        const target = candidates.find(c => fs.existsSync(c));
        if (target && target.includes(path.join('app', path.sep))) {
          const tgtName = normalizeName(target, baseDir);
          nodes.add(tgtName);
          edges.push([srcName, tgtName]);
        }
      } else {
        // non-relative import - ignore external libs
      }
    }
  }

  return { nodes: Array.from(nodes), edges };
}

function toMermaid(graph) {
  let md = 'graph TD\n';
  for (const n of graph.nodes) {
    const id = n.replace(/[^a-zA-Z0-9_]/g, '_');
    md += `  ${id}["${n}"]\n`;
  }
  for (const [a,b] of graph.edges) {
    const idA = a.replace(/[^a-zA-Z0-9_]/g, '_');
    const idB = b.replace(/[^a-zA-Z0-9_]/g, '_');
    md += `  ${idA} --> ${idB}\n`;
  }
  return md;
}

function main() {
  const base = process.cwd();
  const appDir = path.join(base, 'app');
  if (!fs.existsSync(appDir)) {
    console.error('No app/ directory found');
    process.exit(1);
  }
  const graph = buildGraph(base);
  const mermaid = toMermaid(graph);
  const outDir = path.join(base, 'artifacts');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const outFile = path.join(outDir, 'component-graph.mmd');
  fs.writeFileSync(outFile, mermaid, 'utf8');
  console.log('Wrote', outFile);
}

main();
