import Gameboard from "../gameboard";
import Ship from "../ship";

describe('Gameboard', () => {
    let newBoard;
    let ship1 = Ship('carrier', 5, true);
    let ship2 = Ship('battleship', 4, false);

    beforeEach(() => {
        newBoard = Gameboard();
        newBoard.createBlankBoard();
    })

    //createBlankBoard
    test('cells start with correct values', () => {
        let cellCount = 0;
        let cellShipCount = 0;
        let cellShotAtCount = 0;
        let board = newBoard.board;

        for(let i = 0; i < board.length; i++) {
            cellCount++;
            if(board[i].ship) {
                cellShipCount++;
            }
            if(board[i].shotAt) {
                cellShotAtCount++;
            }
        }

        expect(cellCount).toBe(100);
        expect(cellShipCount).toBe(0);
        expect(cellShotAtCount).toBe(0);
    })

    //canPlaceShip
    test('ship can be placed', () => {
        const placeShipIndex = 0;
        expect(newBoard.canPlaceShip(ship1, placeShipIndex)).toBe(true);
    })

    test('horizontal ship wont place off cells', () => {
        const placeShipIndex = 78;
        expect(newBoard.canPlaceShip(ship2, placeShipIndex)).toBe(false);
    })

    test('vertical ship wont place off cells', () => {
        const placeShipIndex = 80;
        expect(newBoard.canPlaceShip(ship1, placeShipIndex)).toBe(false);
    })

    test('ship wont place over other ship', () => {
        let board = newBoard.board;
        const placeShipIndex = 0;
        board[0].ship = 'battleship';
        board[1].ship = 'battleship';
        board[2].ship = 'battleship';
        board[3].ship = 'battleship';
        expect(newBoard.canPlaceShip(ship1, placeShipIndex)).toBe(false);
    })

    //placeShip
    test('vertical ship is correctly placed', () => {
        newBoard.placeShip(ship1, 0);
        const board = newBoard.board;
        let shipPlacedCorrectly = true;
        for(let i = 0; i < ship1.length; i++) {
            if(board[i*10].ship != 'carrier') {
                shipPlacedCorrectly = false;
            }
        }
        expect(shipPlacedCorrectly).toBe(true);
    })

    test('horizontal ship is correctly placed', () => {
        newBoard.placeShip(ship2, 0);
        const board = newBoard.board;
        let shipPlacedCorrectly = true;
        for(let i = 0; i < ship2.length; i++) {
            if(board[i].ship != 'battleship') {
                shipPlacedCorrectly = false;
            }
        }
        expect(shipPlacedCorrectly).toBe(true);
    })

    //receiveAttack
    test('hit is placed on board and ship', () => {
        const placeShipIndex = 0;
        const attackIndex = 10;
        newBoard.placeShip(ship1, placeShipIndex);
        newBoard.receiveAttack(attackIndex);
        expect(newBoard.board[attackIndex].shotAt).toBe(true);
        expect(ship1.hits.length).toBe(1);
    })

    test('miss is placed on board', () => {
        const attackIndex = 10;
        newBoard.receiveAttack(attackIndex);
        expect(newBoard.board[attackIndex].shotAt).toBe(true);
    })

    //areAllShipsSunk
    test('ships are still alive', () => {
        const placeShipIndex = 0;
        newBoard.placeShip(ship1, placeShipIndex);
        newBoard.receiveAttack(0);
        newBoard.receiveAttack(10);
        expect(newBoard.areAllShipsSunk()).toBe(false);
    })

    test('ships are sunk', () => {
        const placeShipIndex = 0;
        newBoard.placeShip(ship1, placeShipIndex);
        newBoard.receiveAttack(0);
        newBoard.receiveAttack(10);
        newBoard.receiveAttack(20);
        newBoard.receiveAttack(30);
        newBoard.receiveAttack(40);
        expect(newBoard.areAllShipsSunk()).toBe(true);
    })
});