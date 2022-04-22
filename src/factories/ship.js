const Ship = (id, length, isVertical) => {
    //variables
    let hits = [];

    //functions
    const hit = (cell) => {
        if(!hits.includes(cell)) {
            hits.push(cell);
        }
    };
    const isSunk = () => {
        return hits.length === length;
    }

    return {hit,
            hits,
            id,
            isSunk,
            isVertical,
            length
            };
};

export default Ship;