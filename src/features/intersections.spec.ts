import {CSphere} from "./spheres";
import {hit, intersection, intersections} from "./interesctions";

describe('Intersections', () => {
    test('An interesction encapsulates t and object', () => {
        const s = new CSphere();
        const i = intersection(3.5, s);

        expect(i.t).toEqual(3.5);
        expect(i.object).toBe(s);
    });

    test('Aggregating intersections', () => {
        const s = new CSphere();
        const i1 = intersection(1, s);
        const i2 = intersection(2, s);
        const xs = intersections(i1, i2);

        expect(xs.length).toEqual(2);
        expect(xs[0].t).toEqual(1);
        expect(xs[1].t).toEqual(2);
    });
});

describe('Hits', () => {
    test('The hit, when all intersections have positive t', () => {
        const s = new CSphere();
        const i1 = intersection(1, s);
        const i2 = intersection(2, s);
        const xs = intersections(i2, i1);

        const i = hit(xs);
        expect(i).toBe(i1);
    });

    test('The hit, when some intersections have negative t', () => {
        const s = new CSphere();
        const i1 = intersection(-1, s);
        const i2 = intersection(1, s);
        const xs = intersections(i2, i1);

        const i = hit(xs);
        expect(i).toBe(i2);
    });

    test('The hit, when all intersections have negative t', () => {
        const s = new CSphere();
        const i1 = intersection(-2, s);
        const i2 = intersection(-1, s);
        const xs = intersections(i2, i1);

        const i = hit(xs);
        expect(i).toBeUndefined();
    });

    test('The hit is always the lowest nonegative interesction', () => {
        const s= new CSphere();
        const i1 = intersection(5, s);
        const i2 = intersection(7, s);
        const i3 = intersection(-3, s);
        const i4 = intersection(2, s);
        const xs = intersections(i1, i2, i3, i4);

        const i = hit(xs);
        expect(i).toBe(i4);
    });
});
