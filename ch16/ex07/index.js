import fs from "fs/promises";

export const checkEntry = async (path) => {
  const stats = await fs.stat(path);

  if (stats.isFile()) {
    return "file";
  }
  if (stats.isDirectory()) {
    return "directory";
  }
  return "other";
};
