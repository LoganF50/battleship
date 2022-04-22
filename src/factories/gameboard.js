import Ship from './ship';

const Gameboard = () => {
    let board = []; //10x10 cells {ship: ship id or false, shotAt: T/F}
    let ships = [];
    
    const areAllShipsSunk = () => {
        return ships.every(ship => ship.isSunk());
    };

    const canPlaceShip = (ship, startAt) => {
        if(ship.isVertical) {
            for(let i = 0; i < ship.length; i++) {
                let currentCell = startAt + i * 10;
                //check if extends off board (past bottom row)
                if(currentCell > 99) {
                    return false;
                }
                //check if ship already exists
                if(board[currentCell].ship) {
                    return false;
                }
            }
        } else {
            for(let i = 0; i < ship.length; i++) {
                let currentCell = startAt + i;
                //check if extends off board (ship wraps around to leftmost cell)
                if(currentCell > startAt && currentCell % 10 === 0) {
                    return false;
                }
                //check if ship already exists
                if(board[currentCell].ship) {
                    return false;
                }
            }
        }
        return true;
    };

    const createBlankBoard = () => {
        //100 for 10x10 board
        for(let i = 0; i < 100; i++) {
            board.push({ship: false, shotAt: false});
        }
    };

    const placeShip = (ship, startAt) => {
        let incrementBy = ship.isVertical ? 10 : 1;
        for(let i = 0; i < ship.length; i++) {
            let currentCell = startAt + i * incrementBy;
            board[currentCell].ship = ship.id;
        }
        ships.push(ship);
    };

    const receiveAttack = (cellIndex) => {
        const attackedCell = board[cellIndex];
        attackedCell.shotAt = true;
        if(attackedCell.ship) {
            const attackedShip = ships.find(ship => ship.id === attackedCell.ship);
            attackedShip.hit(cellIndex);
        }
    };

    return {areAllShipsSunk, board, canPlaceShip, createBlankBoard, placeShip, receiveAttack, ships}
};

export default Gameboard;