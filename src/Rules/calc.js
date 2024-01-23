const calc = (letter, number) => {
  const horizon = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const index = horizon.indexOf(letter);
  const newLetter = horizon[index + number];
  return newLetter;
};

const roundColor = (round) => {
  let color = "white";
  if (round % 2 === 0 || round === 0) {
    color = "white";
  } else {
    color = "black";
  }
  return color;
};

export { calc, roundColor };
