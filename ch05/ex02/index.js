export const changeEscapeSequence1 = (str) => {
  let result = "";
  for (const char of str) {
    if (char === "\0") {
      result += "\\0";
    } else if (char === "\b") {
      result += "\\b";
    } else if (char === "\t") {
      result += "\\t";
    } else if (char === "\n") {
      result += "\\n";
    } else if (char === "\v") {
      result += "\\v";
    } else if (char === "\f") {
      result += "\\f";
    } else if (char === "\r") {
      result += "\\r";
    } else if (char === '"') {
      result += '\\"';
    } else if (char === `'`) {
      result += `\\'`;
    } else if (char === "\\") {
      result += "\\\\";
    } else {
      result += char;
    }
  }
  return result;
};

export const changeEscapeSequence2 = (str) => {
  let result = "";
  for (const char of str) {
    switch (char) {
      case "\0":
        result += "\\0";
        break;
      case "\b":
        result += "\\b";
        break;
      case "\t":
        result += "\\t";
        break;
      case "\n":
        result += "\\n";
        break;
      case "\v":
        result += "\\v";
        break;
      case "\f":
        result += "\\f";
        break;
      case "\r":
        result += "\\r";
        break;
      case `"`:
        result += '\\"';
        break;
      case `'`:
        result += `\\'`;
        break;
      case "\\":
        result += "\\\\";
        break;
      default:
        result += char;
        break;
    }
  }
  return result;
};
