const stats = require("./stats.cjs");
const BitSet = require("./sets.cjs").BitSet;

const s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
// eslint-disable-next-line no-unused-vars
const average = stats.mean([...s]); // averagetは20。
