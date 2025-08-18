export const getDaysInMonth = (year: number, month: number): number => {
  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 and 12");
  }
  // (year, month, 0)とすることで、指定した月の前月の最終日を取得(指定する月のインデックスは0から始まる)
  const date = new Date(year, month, 0);
  // 指定した最終日の日部分がその月の日数になる
  return date.getDate();
};

type DateString = `${number}-${number}-${number}`;
export const getDaysWithoutSuturdayAndSunday = (
  start: DateString,
  end: DateString
): number => {
  // 日付のフォーマットがYYYY-MM-DD形式であることを確認
  const regex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  if (!regex.test(start) || !regex.test(end)) {
    throw new Error("Invalid date format");
  }
  let count = 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  while (startDate <= endDate) {
    const day = startDate.getDay();
    // 土曜日(6)と日曜日(0)を除外
    if (day !== 0 && day !== 6) {
      count++;
    }
    // 日付を1日進める
    startDate.setDate(startDate.getDate() + 1);
  }
  return count;
};

export const dayOfWeek = (date: DateString, locale: string): string => {
  // 日付のフォーマットがYYYY-MM-DD形式であることを確認
  const regex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  if (!regex.test(date)) {
    throw new Error("Invalid date format");
  }
  const dateObj = new Date(date);
  // toLocaleDateStringを使用して曜日を取得
  // weekdayオプションを指定して、ロケールに合わせた曜日の名前を取得
  return dateObj.toLocaleDateString(locale, { weekday: "long" });
};

export const getFirstDayOfLastMonth = (): Date => {
  // 現在の日付を取得
  const date = new Date();
  // 日付を今月の0日目に設定することで、先月の最終日を取得
  date.setDate(0);

  // 日付を1日に設定して、先月の1日を取得
  date.setDate(1);
  // 時間を0時0分0秒に設定
  date.setHours(0, 0, 0, 0);

  return date;
};
