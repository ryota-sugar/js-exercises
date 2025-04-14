import { Point } from "./index.js";
describe("Point", () => {
    test("should create a point with given coordinates", () => {
        const point = new Point(1, 2);
        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });

    test("should add two points correctly", () => {
        const point1 = new Point(1, 2);
        const point2 = new Point(3, 4);
        const result = point1.add(point2);
        expect(result.x).toBe(4);
        expect(result.y).toBe(6);
    });
});