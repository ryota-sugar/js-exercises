export const tryParseJson = (jsonString) => {
  try {
    return { success: true, data: JSON.parse(jsonString) };
  } catch (e) {
    return { success: false, error: e };
  }
};
