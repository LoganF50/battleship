import Gameboard from "./gameboard";

class Player {
    attacks: number[]

    constructor() {
        this.attacks = [];
    }

    attack(cell: number, opponentBoard: Gameboard) {
        opponentBoard.receiveAttack(cell);
        this.attacks.push(cell);
    }

    canMakeAttack(cell: number) {
        return !this.attacks.includes(cell);
    }

    randomAttack(opponentBoard: Gameboard) {
        let possibleMove: number = Math.floor(Math.random()*100);
        while(!this.canMakeAttack(possibleMove)) {
            possibleMove = Math.floor(Math.random()*100);
        }
        opponentBoard.receiveAttack(possibleMove);
        this.attacks.push(possibleMove);
    }
}

export default Player;