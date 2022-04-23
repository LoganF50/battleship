import Ship from "./ship";

class Gameboard {
    board: {ship: string | false, shotAt: boolean}[]
    ships: Ship[]

    constructor() {
        this.board = new Array(100).fill({ship: false, shotAt: false}); //10x10 board
        this.ships = [];
    }

    areAllShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    canPlaceShip(ship: Ship, startAt: number) {
        let currentCell: number;
        let incrementBy: number;
        if(ship.isVertical) {
            incrementBy = 10;
            for(let i = 0; i < ship.length; i++) {
                currentCell = startAt + i * incrementBy;
                //check if extends off bottom board or ship already exists
                if(currentCell > 99 || this.board[currentCell].ship) {
                    return false;
                }
            }
        } else {
            incrementBy = 1;
            for(let i = 0; i < ship.length; i++) {
                currentCell = startAt + i * incrementBy;
                //check if wraps around to leftmost cell or ship already exists
                if((currentCell > startAt && currentCell % 10 === 0) || this.board[currentCell].ship) {
                    return false;
                }
            }
        }
        return true;
    }

    placeShip(ship: Ship, startAt: number) {
        let incrementBy: number = ship.isVertical ? 10 : 1;
        let currentCell: number;
        for(let i = 0; i < ship.length; i++) {
            currentCell = startAt + i * incrementBy;
            this.board[currentCell].ship = ship.id;
        }
        this.ships.push(ship);
    }

    receiveAttack(cell: number) {
        const attackedCell = this.board[cell];
        attackedCell.shotAt = true;
        if(attackedCell.ship) {
            const attackedShip = this.ships.find(ship => ship.id === attackedCell.ship);
            attackedShip.hit(cell);
        }
    }
}

export default Gameboard;