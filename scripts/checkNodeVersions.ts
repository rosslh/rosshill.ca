import fs from "node:fs";

const getNodeVersion = (fileName: string): string => {
  const content = fs.readFileSync(fileName, "utf8");
  const json = JSON.parse(content);
  return json.engines.node.replace(/[^\d.]/g, "");
};

const nodeVersion = getNodeVersion("package.json");

const nvmrcVersion = fs.existsSync(".nvmrc")
  ? fs.readFileSync(".nvmrc", "utf8").trim()
  : null;

if (nvmrcVersion !== nodeVersion) {
  throw new Error(
    `.nvmrc version (${nvmrcVersion}) does not match package.json version (${nodeVersion})`,
  );
}
