import fs from "fs";

const getNodeVersion = (fileName: string): string => {
  const content = fs.readFileSync(fileName, "utf8");
  const json = JSON.parse(content);
  return json.engines.node.replace(/[^0-9.]/g, "");
};

const nodeVersion = getNodeVersion("package.json");
fs.writeFileSync(".nvmrc", nodeVersion);
