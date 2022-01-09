export const createGrid = () => {
  const grid = [];

  for (let row = 0; row < 10; row++) {
    const currentRow = [];
    for (let col = 0; col < 10; col++) {
      const currentNode = createNode(row, col);
      currentRow.push(currentNode);
    }
    grid.push(currentRow);
  }
  return grid;
};

export const createNode = (row, col) => {
  return {
    col,
    row,
    isFilled: false,
    isHit: false,
    missed: false,
    isPlayersBoard: false,
    shipType: "",
    shipId: 0,
    direction: "",
  };
};
