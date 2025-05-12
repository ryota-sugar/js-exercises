const target_array = ["r", "i", "c", "o", "h"];

delete target_array[3];

console.log(target_array); // => [ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log(target_array.length); // => 5
