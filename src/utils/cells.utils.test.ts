import {generateNeighbours, generateRandomCoordinates, isAliveOnNextTick} from "./cell.utils";

describe('utils tests', () => {
    describe('generateNeighbours', () => {
        it('0 0 item neighbours', () => {
            const LIMIT = 10;
            const X = 0, Y = 0;
            expect(generateNeighbours(X, Y, LIMIT)).toContain("1-0")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("0-1")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("1-1")
            expect(generateNeighbours(X, Y, LIMIT)).toHaveLength(3)
        })

        it ('Edge item neighbours', () => {
            const LIMIT = 10;
            const X = 9, Y = 9;
            expect(generateNeighbours(X, Y, LIMIT)).toContain("8-9")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("9-8")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("8-8")
            expect(generateNeighbours(X, Y, LIMIT)).toHaveLength(3)
        })

        it('middle item neighbours', () => {
            const LIMIT = 10;
            const X = 5, Y = 5;
            expect(generateNeighbours(X, Y, LIMIT)).toContain("4-4")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("4-5")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("4-6")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("5-4")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("5-6")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("6-4")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("6-5")
            expect(generateNeighbours(X, Y, LIMIT)).toContain("6-6")
            expect(generateNeighbours(X, Y, LIMIT)).toHaveLength(8)
        })
    })

    describe('generateRandomCoordinates', () => {
        it('all items are unique', () => {
            const coordinates = generateRandomCoordinates(10);
            expect(coordinates.filter(item => !coordinates.includes(item))).toEqual([])
        })
    })

    describe('isAliveOnNextTick', () => {
        it('Any live cell with fewer than two live neighbours dies (underpopulation)', () => {
            expect(isAliveOnNextTick(1, true)).toBeFalsy()
        })
        it('Any live cell with two or three live neighbours lives on to the next generation', () => {
            expect(isAliveOnNextTick(2, true)).toBeTruthy()
            expect(isAliveOnNextTick(3, true)).toBeTruthy()
        })
        it('Any live cell with more than three live neighbours dies (overcrowding)', () => {
            expect(isAliveOnNextTick(4, true)).toBeFalsy()
        })
        it('Any live cell with more than three live neighbours dies (overcrowding)', () => {
            expect(isAliveOnNextTick(3, false)).toBeTruthy()
        })
    })
})
