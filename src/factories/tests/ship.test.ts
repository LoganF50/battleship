import Ship from "../ship";

describe('Ship', () => {
    let newShip: Ship;

    beforeEach(() => {
        newShip = new Ship('testShip', 3, true);
    })

    test('has correct id', () => {
        expect(newShip.id).toBe('testShip');
    })

    test('has correct length', () => {
        expect(newShip.length).toBe(3);
    })

    test('has correct verticality', () => {
        expect(newShip.isVertical).toBe(true);
    })

    test('takes a hit', () => {
        newShip.hit(0);
        expect(newShip.hits).toContain(0);
    })

    test('multiple hits to same spot result in single hit', () => {
        newShip.hit(0);
        newShip.hit(0);
        expect(newShip.hits.length).toBe(1);
    })

    test('sinks', () => {
        newShip.hit(0);
        newShip.hit(1);
        newShip.hit(2);
        expect(newShip.isSunk()).toBe(true);
    })
});