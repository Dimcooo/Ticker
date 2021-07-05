export const generateAliveKey = (x: number, y: number) => `${x}-${y}`

export function generateNeighbours(cellX: number, cellY: number, limit: number): string[] {
    const result: string[] = [];

    const yBiggerThanZero = cellY > 0
    const xBiggerThanZero = cellX > 0
    const xLessThanLimit = cellX < limit - 1
    const yLessThanLimit = cellY < limit - 1

    if (yBiggerThanZero) {
        result.push(generateAliveKey(cellX, cellY - 1));
    }

    if (xBiggerThanZero) {
        result.push(generateAliveKey(cellX - 1, cellY));
    }

    if (xLessThanLimit) {
        result.push(generateAliveKey(cellX + 1, cellY));
    }

    if (yLessThanLimit) {
        result.push(generateAliveKey(cellX, cellY + 1));
    }

    if (xLessThanLimit && yLessThanLimit) {
        result.push(generateAliveKey(cellX + 1, cellY + 1));
    }

    if (xBiggerThanZero && yBiggerThanZero) {
        result.push(generateAliveKey(cellX - 1, cellY - 1));
    }

    if (xBiggerThanZero && yLessThanLimit) {
        result.push(generateAliveKey(cellX - 1, cellY + 1));
    }

    if (xLessThanLimit && yBiggerThanZero) {
        result.push(generateAliveKey(cellX + 1, cellY - 1));
    }

    return result
}

export function isAliveOnNextTick(aliveNeighbours: number, isCellAlive: boolean): boolean {

    // Any live cell with fewer than two live neighbours dies (underpopulation)
    if (isCellAlive && aliveNeighbours < 2) {
        return false
    }

    // Any live cell with two or three live neighbours lives on to the next generation
    if (isCellAlive && (aliveNeighbours === 2 || aliveNeighbours === 3)) {
        return true;
    }

    // Any live cell with more than three live neighbours dies (overcrowding)
    if (isCellAlive && aliveNeighbours > 3) {
        return false
    }

    // Any dead cell with exactly three live neighbours becomes a live cell (reproduction).
    return !isCellAlive && aliveNeighbours === 3;
}

export function generateRandomCoordinates (gridSize: number): string[] {
    const randomAliveCells: string[] = []
    let randomX: number
    let randomY: number
    let randomAliveKey: string

    const randomNumberOfCells = gridSize * gridSize / 2;

    for (let i = 0; i < randomNumberOfCells; i++) {
        /**
         * This masterpiece generates random coordinates until it is unique.
         * */
        do {
            randomX = Math.floor(Math.random() * gridSize)
            randomY = Math.floor(Math.random() * gridSize)

            randomAliveKey = generateAliveKey(randomX, randomY);
        }
        while (randomAliveCells.includes(randomAliveKey))

        randomAliveCells.push(randomAliveKey)
    }

    return randomAliveCells;
}
