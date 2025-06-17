interface Student {
  name: string;
  class: string;
  math: number;
  chemistry: number;
  geography: number;
}

const data: Student[] = [
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

const sumMath = (data: Student[]) => {
  return data.reduce((sum, student) => sum + student.math, 0);
};

const averageClassAChemistry = (data: Student[]) => {
  const classAStudents = data.filter((student) => student.class === "A");
  const totalChemistry = classAStudents.reduce(
    (sum, student) => sum + student.chemistry,
    0
  );
  return totalChemistry / classAStudents.length;
};

const averageClassC3Subjects = (data: Student[]) => {
  const classCStudents = data.filter((student) => student.class === "C");
  const totalMath = classCStudents.reduce(
    (sum, student) => sum + student.math,
    0
  );
  const totalChemistry = classCStudents.reduce(
    (sum, student) => sum + student.chemistry,
    0
  );
  const totalGeography = classCStudents.reduce(
    (sum, student) => sum + student.geography,
    0
  );

  const total3Subjects = totalMath + totalChemistry + totalGeography;
  return total3Subjects / classCStudents.length;
};

const highestPointsName = (data: Student[]): string[] => {
  let currentHighestPoint = 0;
  let highestScorers: string[] = [];
  data.forEach((student) => {
    const totalPoints = student.math + student.chemistry + student.geography;
    if (totalPoints > currentHighestPoint) {
      currentHighestPoint = totalPoints;
      highestScorers = [student.name];
    } else if (totalPoints === currentHighestPoint) {
      highestScorers.push(student.name);
    }
  });
  return highestScorers;
};

const stdOfWholeGeography = (data: Student[]): number => {
  //偏差の二乗の平均の平方根を求める
  //平均
  const geographyMean =
    data.reduce((sum, student) => sum + student.geography, 0) / data.length;
  //偏差の二乗の平均を求める
  const variance =
    data.reduce(
      (sum, student) => sum + Math.pow(student.geography - geographyMean, 2),
      0
    ) / data.length;
  return Math.sqrt(variance);
};

console.log("mathの全員の合計点:", sumMath(data));
console.log("クラスAのchemistryの平均点:", averageClassAChemistry(data));
console.log("3科目合計点のクラスC内での平均点:", averageClassC3Subjects(data));
console.log("3科目合計点が最も高い人のname:", highestPointsName(data));
console.log("全体のgeographyの標準偏差:", stdOfWholeGeography(data));

// 出力
// mathの全員の合計点: 530
// クラスAのchemistryの平均点: 45
// 3科目合計点のクラスC内での平均点: 176.66666666666666
// 3科目合計点が最も高い人のname: [ 'Frank' ]
// 全体のgeographyの標準偏差: 22.3330569358242
