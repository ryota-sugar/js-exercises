interface Student {
  name: string;
  class: string;
  math: number;
  chemistry: number;
  geography: number;
}

const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

const mathSort = (data: Student[]): Student[] => {
  const dataArray = [...data];
  dataArray.sort((a, b) => {
    if (a.math > b.math) {
      return -1;
    } else if (a.math < b.math) {
      return 1;
    } else {
      // 数学の点数が同じ場合、化学の点数で比較
      if (a.chemistry > b.chemistry) {
        return -1;
      } else if (a.chemistry < b.chemistry) {
        return 1;
      } else {
        // 化学の点数も同じ場合、地理の点数で比較
        if (a.geography > b.geography) {
          return -1;
        } else if (a.geography < b.geography) {
          return 1;
        } else {
          return 0; // 全ての科目が同じ場合 順序関係がない
        }
      }
    }
  });
  return dataArray;
};

console.log(mathSort(data));
