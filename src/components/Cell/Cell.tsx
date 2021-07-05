import React from "react";

import './Cell.css';

type CellProps = {
    isAlive: boolean,
    onClick: <Args extends Array<any>>(...args: Args) => void,
}

export const Cell = React.memo(({isAlive, onClick}: CellProps) => {
    return (
        <div className={`cell ${isAlive ? 'alive' : ''}`.trim()} onClick={onClick}/>
    )
}, (prev, next) => prev.isAlive === next.isAlive)
