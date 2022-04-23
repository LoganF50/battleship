class Ship {
    id: string;
    isVertical: boolean;
    hits: number[];
    length: number;

    constructor(id: string, length: number, isVertical: boolean) {
        this.id = id;
        this.isVertical = isVertical;
        this.hits = [];
        this.length = length;
    }

    hit(cell: number) {
        if(!this.hits.includes(cell)) {
            this.hits.push(cell);
        }
    }

    isSunk() {
        return this.hits.length === this.length;
    }
}

export default Ship;