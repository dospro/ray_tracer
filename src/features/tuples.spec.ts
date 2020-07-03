import {
    Tuple,
    CColor,
} from './tuples';

describe('Test tuples', () => {
    test('A tuple with w=1.0 is a point', () => {
        const result = new Tuple(4.3, -4.2, 3.1, 1.0);
        expect(result.x).toBe(4.3);
        expect(result.y).toBe(-4.2);
        expect(result.z).toBe(3.1);
        expect(result.w).toBe(1.0);

        expect(result.isPoint()).toBe(true);
        expect(result.isVector()).toBe(false);
    });

    test('A tuple with w=0 is a vector', () => {
        const result = new Tuple(4.3, -4.2, 3.1, 0.0);
        expect(result.x).toBe(4.3);
        expect(result.y).toBe(-4.2);
        expect(result.z).toBe(3.1);
        expect(result.w).toBe(0.0);

        expect(result.isPoint()).toBe(false);
        expect(result.isVector()).toBe(true);
    });

    test('point creates tuples with w=1', () => {
        const p = Tuple.make_point(4, -4, 3);
        expect(p).toStrictEqual(new Tuple(4, -4, 3, 1));
    });

    test('vector creates tuples with w=0', () => {
        const v = Tuple.make_vector(4, -4, 3);
        expect(v).toStrictEqual(new Tuple(4, -4, 3, 0));
    });


    test('Adding two tuples', () => {
        const a1 = new Tuple(3, -2, 5, 1);
        const a2 = new Tuple(-2, 3, 1, 0);
        expect(a1.plus(a2)).toStrictEqual(new Tuple(1, 1, 6, 1));
    });

    test('Substracting two points', () => {
        const p1 = Tuple.make_point(3, 2, 1);
        const p2 = Tuple.make_point(5, 6, 7);
        expect(p1.minus(p2)).toStrictEqual(Tuple.make_vector(-2, -4, -6));
    });


    test('Substracting two vectors', () => {
        const v1 = Tuple.make_vector(3, 2, 1);
        const v2 = Tuple.make_vector(5, 6, 7);
        expect(v1.minus(v2)).toStrictEqual(Tuple.make_vector(-2, -4, -6));
    });

    test('Negating a tuple', () => {
        const a = new Tuple(1, -2, 3, -4);
        expect(a.neg()).toStrictEqual(new Tuple(-1, 2, -3, 4));
    });

    test('Multiplying a tuple by a scalar', () => {
        const a = new Tuple(1, -2, 3, -4);
        expect(a.mult(3.5)).toStrictEqual(new Tuple(3.5, -7, 10.5, -14));
    });

    test('Multiplying a tuple by a fraction', () => {
        const a = new Tuple(1, -2, 3, -4);
        expect(a.mult(0.5)).toStrictEqual(new Tuple(0.5, -1, 1.5, -2));
    });

    test('Dividing a tuple by a scalar', () => {
        const a = new Tuple(1, -2, 3, -4);
        expect(a.div(2)).toStrictEqual(new Tuple(0.5, -1, 1.5, -2));
    });

    test('Computing magnitude of vector(1, 0, 0)', () => {
        const v = Tuple.make_vector(1, 0, 0);
        expect(v.magnitude()).toBe(1);
    });

    test('Computing magnitude of vector(0, 1, 0)', () => {
        const v = Tuple.make_vector(0, 1, 0);
        expect(v.magnitude()).toBe(1);
    });

    test('Computing magnitude of vector(0, 0, 1)', () => {
        const v = Tuple.make_vector(0, 0, 1);
        expect(v.magnitude()).toBe(1);
    });

    test('Computing magnitude of vector(1, 2, 3)', () => {
        const v = Tuple.make_vector(1, 2, 3);
        expect(v.magnitude()).toBe(Math.sqrt(14));
    });

    test('Computing magnitude of vector(-1, -2, -3)', () => {
        const v = Tuple.make_vector(-1, -2, -3);
        expect(v.magnitude()).toBe(Math.sqrt(14));
    });

    test('Normalizing vector(4, 0, 0) gives (1,0,0)', () => {
        const v = Tuple.make_vector(4, 0, 0);
        expect(v.normalize()).toStrictEqual(Tuple.make_vector(1, 0, 0));
    });

    test('Normalizing vector(1,2,3)', () => {
        const v = Tuple.make_vector(1, 2, 3);
        const result = v.normalize();
        const expected = Tuple.make_vector(0.26726, 0.53452, 0.80178);
        expect(result.x).toBeCloseTo(expected.x, 5);
        expect(result.y).toBeCloseTo(expected.y, 5);
        expect(result.z).toBeCloseTo(expected.z, 5);
        expect(result.w).toBeCloseTo(expected.w, 5);
    });

    test('The magnitude of a normalized vector', () => {
        const v = Tuple.make_vector(1, 2, 3);
        const n = v.normalize();
        expect(n.magnitude()).toBe(1);
    });

    test('The dot product of two tuples', () => {
        const a = Tuple.make_vector(1, 2, 3);
        const b = Tuple.make_vector(2, 3, 4);
        expect(a.dot(b)).toBe(20);
    });

    test('The cross product of two vectors', () => {
        const a = Tuple.make_vector(1, 2, 3);
        const b = Tuple.make_vector(2, 3, 4);
        expect(a.cross(b)).toStrictEqual(Tuple.make_vector(-1, 2, -1));
        expect(b.cross(a)).toStrictEqual(Tuple.make_vector(1, -2, 1));
    });
});

describe('Test reflections', () => {
    test('Reflecting a vector approaching at 45 degree', () => {
        const v = Tuple.make_vector(1, -1, 0);
        const n = Tuple.make_vector(0, 1, 0);
        const r = v.reflect(n);
        expect(r).toStrictEqual(Tuple.make_vector(1, 1, 0));
    });

    test('Reflecting a vector off a slanted surface', () => {
        const v = Tuple.make_vector(0, -1, 0);
        const n = Tuple.make_vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
        const r = v.reflect(n);
        const expected = Tuple.make_vector(1, 0, 0);
        expect(r.x).toBeCloseTo(expected.x, 5);
        expect(r.y).toBeCloseTo(expected.y, 5);
        expect(r.z).toBeCloseTo(expected.z, 5);
        expect(r.w).toBeCloseTo(expected.w, 5);
    });
});

describe('Test colors', () => {
    test('Colors are (red, green, blue) tuples', () => {
        const c = new CColor(-0.5, 0.4, 1.7);
        expect(c.red).toBe(-0.5);
        expect(c.green).toBe(0.4);
        expect(c.blue).toBe(1.7);
    });

    test('Adding colors', () => {
        const c1 = new CColor(0.9, 0.6, 0.75);
        const c2 = new CColor(0.7, 0.1, 0.25);
        expect(c1.plus(c2)).toStrictEqual(new CColor(1.6, 0.7, 1.0));
    });

    test('Substracting colors', () => {
        const c1 = new CColor(0.9, 0.6, 0.75);
        const c2 = new CColor(0.7, 0.1, 0.25);
        const result = c1.minus(c2);
        const expected = new CColor(0.2, 0.5, 0.5);
        expect(result.red).toBeCloseTo(expected.red, 5);
        expect(result.green).toBeCloseTo(expected.green, 5);
        expect(result.blue).toBeCloseTo(expected.blue, 5);
    });

    test('Multiplying a color by a scalar', () => {
        const c = new CColor(0.2, 0.3, 0.4);
        expect(c.mult(2)).toStrictEqual(new CColor(0.4, 0.6, 0.8));
    });

    test('Multiplying colors', () => {
        const c1 = new CColor(1, 0.2, 0.4);
        const c2 = new CColor(0.9, 1, 0.1);
        const result = c1.hadamard_product(c2);
        const expected = new CColor(0.9, 0.2, 0.04);
        expect(result.red).toBeCloseTo(expected.red, 5);
        expect(result.green).toBeCloseTo(expected.green, 5);
        expect(result.blue).toBeCloseTo(expected.blue, 5);
    });
});
