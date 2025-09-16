import { readLines } from "./index";

test("readLines yields each line from ikita_ningyo_utf8.txt", () => {
  const expected = [
    'Original book: "Ogawa Mimei Complete Fairy Tales Vol. 6" Kodansha',
    "First edition published: April 10, 1977",
    'Parent book: "Mimei Fairy Tales Collection 4" Maruzen',
    "Published: July 1930",
    'First appearance: "Sunday Mainichi Vol. 7 No. 49"',
    "Published: October 28, 1928",
    '* In the original book, the title is "Living Doll".',
    "Input: Harukaze NPO",
    "Proofreading: Nanakusa",
    "Created: September 1, 2015",
    "Aozora Bunko file:",
    "This file was created by volunteers for Aozora Bunko (http://www.aozora.gr.jp/), an internet library.",
  ];
  const result = [];
  for (const line of readLines("./ch12/ex05/ikita_ningyo_utf8.txt")) {
    result.push(line);
  }
  expect(result).toEqual(expected);
});
