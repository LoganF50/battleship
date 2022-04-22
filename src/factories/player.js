const Player = () => {
    let attacks = [];

    const attack = (cellIndex, board) => {

    };

    const canMakeAttack = (cellIndex) => {
        return !attacks.includes(cellIndex);
    };

    return {attack, attacks, canMakeAttack};
};

export default Player;