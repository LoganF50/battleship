import Gameboard from "../gameboard";
import Player from "../player";

describe('Player', () => {
    let opponentBoard: Gameboard;
    let player: Player;
    beforeEach(() => {
        opponentBoard = new Gameboard();
        player = new Player(); 
    })

    //attack
    test('attacks opponent', () => {
        const cell = 0;
        player.attack(cell, opponentBoard);
        expect(opponentBoard.board[cell].shotAt).toBe(true);
        expect(player.attacks).toContain(cell);
    })

    //canMakeAttack
    test('can make attack', () => {
        const cell = 0;
        expect(player.canMakeAttack(cell)).toBe(true);
    })

    test('can\'t attack same cell multiple times', () => {
        const cell = 0;
        player.attacks.push(cell)
        expect(player.canMakeAttack(cell)).toBe(false);
    })

    //randomAttack
    test('can make random attack', () => {
        player.randomAttack(opponentBoard);
        expect(player.attacks.length).toBe(1);
        expect(player.attacks[0]).toBeGreaterThanOrEqual(0);
        expect(player.attacks[0]).toBeLessThanOrEqual(99);
    })
});