export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickRandom(items) {
  return items[randomInt(0, items.length - 1)];
}

export function pickRandomEmptyCell(columns, rows, occupiedCells) {
  const occupiedKeys = new Set(
    occupiedCells.map((cell) => `${cell.x}:${cell.y}`),
  );
  const emptyCells = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      if (!occupiedKeys.has(`${x}:${y}`)) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length === 0) {
    return null;
  }

  return pickRandom(emptyCells);
}
