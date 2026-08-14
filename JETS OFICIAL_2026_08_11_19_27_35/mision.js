function mision_general() {
  if (nivel == 1) {
    return floor(random(4,21));
  }
  if (nivel == 2) {
    return floor(random(-6, 14));
  }
  else if (nivel == 3) {
    let randomPair;
    do {
      randomPair = floor(random(2, 23));
    } while (randomPair % 2 !== 0);
    return randomPair;
  }
}