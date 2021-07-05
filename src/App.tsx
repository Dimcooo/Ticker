import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Cell from "./components/Cell";
import {generateAliveKey, generateNeighbours, generateRandomCoordinates, isAliveOnNextTick} from "./utils/cell.utils";

type ColumnType = string[]

type TableType = ColumnType[]

const GRID_SIZE = 50;

const generateEmptyTable = (): TableType => {
    const generateRows = (amount: number): ColumnType => {
        let items: ColumnType = []

        for (let i = 0; i < amount; i++) {
            items.push('')
        }

        return items
    }

    const table: TableType = []

    for (let i = 0; i < GRID_SIZE; i++) {
        table.push(generateRows(GRID_SIZE))
    }

    return table;
}

const table: TableType = generateEmptyTable()

function App() {
    const [aliveCells, setAliveCells] = useState<string[]>(generateRandomCoordinates(GRID_SIZE))

    const isCellAlive = useCallback(
        (columnIndex: number, rowIndex: number): boolean => aliveCells?.includes(generateAliveKey(columnIndex, rowIndex)) || false,
        [aliveCells]);

    const onCellClick = useCallback((columnIndex: number, rowIndex: number) => {
        const itemAsKey: string = generateAliveKey(columnIndex, rowIndex);
        const applyingFunction = isCellAlive(columnIndex, rowIndex)
            ? (array: string[]) => array.filter((cell => cell !== itemAsKey))
            : (array: string[]): string[] => array.concat(itemAsKey)
        setAliveCells(prev => applyingFunction(prev))
    }, [isCellAlive])

    const onTick = useCallback(() => {
        const nextTickAliveItems: string[] = [];

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let column = 0; column < GRID_SIZE; column++) {
                const neighboursCoordinates: string[] = generateNeighbours(column, row, GRID_SIZE)
                const aliveNeighbours: number = neighboursCoordinates.filter(neighbour => aliveCells.includes(neighbour)).length
                if (isAliveOnNextTick(aliveNeighbours, isCellAlive(column, row))) {
                    nextTickAliveItems.push(generateAliveKey(column, row))
                }
            }
        }

        setAliveCells(nextTickAliveItems)
    }, [aliveCells, isCellAlive])

    const onRandomGeneration = () => {
        setAliveCells(generateRandomCoordinates(GRID_SIZE))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            onTick();
        }, 1000);
        return () => clearInterval(interval);
    }, [onTick])

    return (
        <div className="app">
            <button onClick={onRandomGeneration}>Generate randomly</button>
            <div className="table-wrapper">
                {table.map((column, columnIndex) => (
                    <div key={columnIndex} className="rows-wrapper">
                        {column.map((cell, rowIndex) => (
                            <Cell
                                key={rowIndex}
                                isAlive={isCellAlive(columnIndex, rowIndex)}
                                onClick={() => onCellClick(columnIndex, rowIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
