import {Tuple} from "./tuples";
import {CRay} from "./rays";
import {scaling, translation} from "./transformations";

describe('Creating rays', () => {
    test('Creating and querying a ray', () => {
        const origin = Tuple.make_point(1, 2, 3);
        const direction = Tuple.make_vector(4, 5, 6);
        const r = new CRay(origin, direction);
        expect(r.origin).toStrictEqual(origin);
        expect(r.direction).toStrictEqual(direction);
    });

    test('Computing a point from a distance', () => {
        const r = new CRay(Tuple.make_point(2, 3, 4), Tuple.make_vector(1, 0, 0));
        expect(r.position(0)).toStrictEqual(Tuple.make_point(2, 3, 4));
        expect(r.position(1)).toStrictEqual(Tuple.make_point(3, 3, 4));
        expect(r.position(-1)).toStrictEqual(Tuple.make_point(1, 3, 4));
        expect(r.position(2.5)).toStrictEqual(Tuple.make_point(4.5, 3, 4));
    });
});

describe('Transforming rays', () => {
    test('Translating a ray', () => {
        const r = new CRay(Tuple.make_point(1, 2, 3), Tuple.make_vector(0, 1, 0));
        const m = translation(3, 4, 5);
        const r2 = r.transform(m);
        expect(r2.origin).toStrictEqual(Tuple.make_point(4, 6, 8));
        expect(r2.direction).toStrictEqual(Tuple.make_vector(0, 1, 0));
    });

    test('scaling a ray', () => {
        const r = new CRay(Tuple.make_point(1, 2, 3), Tuple.make_vector(0, 1, 0));
        const m = scaling(2, 3, 4);
        const r2 = r.transform(m);
        expect(r2.origin).toStrictEqual(Tuple.make_point(2, 6, 12));
        expect(r2.direction).toStrictEqual(Tuple.make_vector(0, 3, 0));
    });
});
