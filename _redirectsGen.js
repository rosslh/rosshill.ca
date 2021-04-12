import file from "./src/lib/data.json";
import fs from 'fs';

const output = [];

const getRedirect = (url) => {
  return `[[redirects]]\nfrom = "/redirect/${encodeURIComponent(url)}"\nto = "${url}"\nstatus = 301\nforce = true`;
};

file.data.forEach(entry => {
  if (entry.website) {
    output.push(getRedirect(entry.website));
  }
  if (entry.github) {
    output.push(getRedirect(entry.github));
  }
});

const otherUrls = ["https://github.com/rosslh", "https://www.linkedin.com/in/rosslh"];

otherUrls.forEach(url => {
  output.push(getRedirect(url));
});

fs.writeFile('netlify.toml', output.join("\n\n"), function (err) {
  if (err) throw err;
  console.log('Saved!');
}); 