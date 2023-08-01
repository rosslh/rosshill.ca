import fs from "node:fs";

const getNodeVersion = (fileName: string): string => {
  const content = fs.readFileSync(fileName, "utf8");
  const json = JSON.parse(content);
  return json.engines.node.replaceAll(/[^\d.]/g, "");
};

const nodeVersion = getNodeVersion("package.json");
fs.writeFileSync(".nvmrc", nodeVersion);
