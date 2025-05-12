const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const has31Days1 = (month) => {
  if (months.includes(month)) {
    if (month === "Jan") {
      return true;
    } else if (month === "Mar") {
      return true;
    } else if (month === "May") {
      return true;
    } else if (month === "Jul") {
      return true;
    } else if (month === "Aug") {
      return true;
    } else if (month === "Oct") {
      return true;
    } else if (month === "Dec") {
      return true;
    } else {
      return false;
    }
  } else {
    throw new Error("Invalid month");
  }
};

export const has31Days2 = (month) => {
  if (months.includes(month)) {
    switch (month) {
      case "Jan":
      case "Mar":
      case "May":
      case "Jul":
      case "Aug":
      case "Oct":
      case "Dec":
        return true;
      default:
        return false;
    }
  } else {
    throw new Error("Invalid month");
  }
};
