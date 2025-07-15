export const withResource = (resource, fn) => {
  // finallyを使って、リソースを確実に解放する
  try {
    return fn(resource);
  } finally {
    resource.close();
  }
};
