const calc = (letter, number) => {
  const horizon = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const index = horizon.indexOf(letter);
  let newLetter = horizon[index + number];

  if (newLetter === undefined) {
    newLetter = "";
    return newLetter;
  } else {
    return newLetter;
  }
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
