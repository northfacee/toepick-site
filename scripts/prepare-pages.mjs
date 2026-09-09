import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
// Keep this reading-only site usable without JavaScript or a server runtime.
const prefix = '/toepick-site';
const source = path.resolve('dist/client');
const target = path.resolve('docs');
await mkdir(target, { recursive: true });
for (const [input, output] of [['index.html', 'index.html'], ['privacy.html', 'privacy/index.html'], ['404.html', '404.html']]) {
  let html = await readFile(path.join(source, input), 'utf8');
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<link\b[^>]*rel="(?:modulepreload|preload)"[^>]*>/gi, '');
  const styles = [...html.matchAll(/<link\b[^>]*href="([^"?]+\.css)"[^>]*>/g)].map(match => match[1]);
  if (styles.length === 0) throw new Error(`Missing stylesheet: ${input}`);
  for (const style of styles) {
    const relative = style.replace(/^\//, '');
    await mkdir(path.dirname(path.join(target, relative)), { recursive: true });
    await copyFile(path.join(source, relative), path.join(target, relative));
  }
  html = html.replace(/\b(href|src)="\/(?!\/)([^"<>]*)"/g, (_, attribute, value) => {
    const relative = value === 'privacy' ? 'privacy/' : value;
    return `${attribute}="${prefix}/${relative}"`;
  });
  await mkdir(path.dirname(path.join(target, output)), { recursive: true });
  await writeFile(path.join(target, output), html);
}
await copyFile('public/favicon.svg', path.join(target, 'favicon.svg'));
await writeFile(path.join(target, '.nojekyll'), '');
const privacy = await readFile(path.join(target, 'privacy/index.html'), 'utf8');
for (const text of ['개인정보처리방침', 'northface', 'jkgjms2@gmail.com', 'Gemini', 'GitHub Pages', '자동 삭제']) {
  if (!privacy.includes(text)) throw new Error(`Missing privacy content: ${text}`);
}
for (const file of ['index.html', 'privacy/index.html']) {
  const html = await readFile(path.join(target, file), 'utf8');
  if (html.includes('<script')) throw new Error('Unexpected script');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) {
    if (!match[1].startsWith(`${prefix}/`)) throw new Error(`Invalid Pages path: ${match[1]}`);
    const filePath = match[1].slice(prefix.length + 1).split('#')[0];
    await readFile(path.join(target, filePath.endsWith('/') || !filePath ? filePath + 'index.html' : filePath));
  }
}
console.log('GitHub Pages HTML, privacy content, styles and local links validated.');
