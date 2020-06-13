import {
    CTuple,
    color,
    sum_color,
    sub_color,
    mult_color,
    hadamard_product
} from './tuples';

describe('Test tuples', () => {
    test('A tuple with w=1.0 is a point', () => {
        const result = new CTuple(4.3, -4.2, 3.1, 1.0);
        expect(result.x).toBe(4.3);
        expect(result.y).toBe(-4.2);
        expect(result.z).toBe(3.1);
        expect(result.w).toBe(1.0);

        expect(result.isPoint()).toBe(true);
        expect(result.isVector()).toBe(false);
    });

    test('A tuple with w=0 is a vector', () => {
        const result = new CTuple(4.3, -4.2, 3.1, 0.0);
        expect(result.x).toBe(4.3);
        expect(result.y).toBe(-4.2);
        expect(result.z).toBe(3.1);
        expect(result.w).toBe(0.0);

        expect(result.isPoint()).toBe(false);
        expect(result.isVector()).toBe(true);
    });

    test('point creates tuples with w=1', () => {
        const p = CTuple.make_point(4, -4, 3);
        expect(p).toStrictEqual(new CTuple(4, -4, 3, 1));
    });

    test('vector creates tuples with w=0', () => {
        const v = CTuple.make_vector(4, -4, 3);
        expect(v).toStrictEqual(new CTuple(4, -4, 3, 0));
    });


    test('Adding two tuples', () => {
        const a1 = new CTuple(3, -2, 5, 1);
        const a2 = new CTuple(-2, 3, 1, 0);
        expect(a1.plus(a2)).toStrictEqual(new CTuple(1, 1, 6, 1));
    });

    test('Substracting two points', () => {
        const p1 = CTuple.make_point(3, 2, 1);
        const p2 = CTuple.make_point(5, 6, 7);
        expect(p1.minus(p2)).toStrictEqual(CTuple.make_vector(-2, -4, -6));
    });


    test('Substracting two vectors', () => {
        const v1 = CTuple.make_vector(3, 2, 1);
        const v2 = CTuple.make_vector(5, 6, 7);
        expect(v1.minus(v2)).toStrictEqual(CTuple.make_vector(-2, -4, -6));
    });

    test('Negating a tuple', () => {
        const a = new CTuple(1, -2, 3, -4);
        expect(a.neg()).toStrictEqual(new CTuple(-1, 2, -3, 4));
    });

    test('Multiplying a tuple by a scalar', () => {
        const a = new CTuple(1, -2, 3, -4);
        expect(a.mult(3.5)).toStrictEqual(new CTuple(3.5, -7, 10.5, -14));
    });

    test('Multiplying a tuple by a fraction', () => {
        const a = new CTuple(1, -2, 3, -4);
        expect(a.mult(0.5)).toStrictEqual(new CTuple(0.5, -1, 1.5, -2));
    });

    test('Dividing a tuple by a scalar', () => {
        const a = new CTuple(1, -2, 3, -4);
        expect(a.div(2)).toStrictEqual(new CTuple(0.5, -1, 1.5, -2));
    });

    test('Computing magnitude of vector(1, 0, 0)', () => {
        const v = CTuple.make_vector(1, 0, 0);
        expect(v.magnitude()).toBe(1);
    });

    test('Computing magnitude of vector(0, 1, 0)', () => {
        const v = CTuple.make_vector(0, 1, 0);
        expect(v.magnitude()).toBe(1);
    });

    test('Computing magnitude of vector(0, 0, 1)', () => {
        const v = CTuple.make_vector(0, 0, 1);
        expect(v.magnitude()).toBe(1);
    });

    test('Computing magnitude of vector(1, 2, 3)', () => {
        const v = CTuple.make_vector(1, 2, 3);
        expect(v.magnitude()).toBe(Math.sqrt(14));
    });

    test('Computing magnitude of vector(-1, -2, -3)', () => {
        const v = CTuple.make_vector(-1, -2, -3);
        expect(v.magnitude()).toBe(Math.sqrt(14));
    });

    test('Normalizing vector(4, 0, 0) gives (1,0,0)', () => {
        const v = CTuple.make_vector(4, 0, 0);
        expect(v.normalize()).toStrictEqual(CTuple.make_vector(1, 0, 0));
    });

    test('Normalizing vector(1,2,3)', () => {
        const v = CTuple.make_vector(1, 2, 3);
        const result = v.normalize();
        const expected = CTuple.make_vector(0.26726, 0.53452, 0.80178);
        expect(result.x).toBeCloseTo(expected.x, 5);
        expect(result.y).toBeCloseTo(expected.y, 5);
        expect(result.z).toBeCloseTo(expected.z, 5);
        expect(result.w).toBeCloseTo(expected.w, 5);
    });

    test('The magnitude of a normalized vector', () => {
        const v = CTuple.make_vector(1, 2, 3);
        const n = v.normalize();
        expect(n.magnitude()).toBe(1);
    });

    test('The dot product of two tuples', () => {
        const a = CTuple.make_vector(1, 2, 3);
        const b = CTuple.make_vector(2, 3, 4);
        expect(a.dot(b)).toBe(20);
    });

    test('The cross product of two vectors', () => {
        const a = CTuple.make_vector(1, 2, 3);
        const b = CTuple.make_vector(2, 3, 4);
        expect(a.cross(b)).toStrictEqual(CTuple.make_vector(-1, 2, -1));
        expect(b.cross(a)).toStrictEqual(CTuple.make_vector(1, -2, 1));
    });
});

describe('Test colors', () => {
    test('Colors are (red, green, blue) tuples', () => {
        const c = color(-0.5, 0.4, 1.7);
        expect(c.red).toBe(-0.5);
        expect(c.green).toBe(0.4);
        expect(c.blue).toBe(1.7);
    });

    test('Adding colors', () => {
        const c1 = color(0.9, 0.6, 0.75);
        const c2 = color(0.7, 0.1, 0.25);
        expect(sum_color(c1, c2)).toStrictEqual(color(1.6, 0.7, 1.0));
    });

    test('Substracting colors', () => {
        const c1 = color(0.9, 0.6, 0.75);
        const c2 = color(0.7, 0.1, 0.25);
        const result = sub_color(c1, c2);
        const expected = color(0.2, 0.5, 0.5);
        expect(result.red).toBeCloseTo(expected.red, 5);
        expect(result.green).toBeCloseTo(expected.green, 5);
        expect(result.blue).toBeCloseTo(expected.blue, 5);
    });

    test('Multiplying a color by a scalar', () => {
        const c = color(0.2, 0.3, 0.4);
        expect(mult_color(c, 2)).toStrictEqual(color(0.4, 0.6, 0.8));
    });

    test('Multiplying colors', () => {
        const c1 = color(1, 0.2, 0.4);
        const c2 = color(0.9, 1, 0.1);
        const result = hadamard_product(c1, c2);
        const expected = color(0.9, 0.2, 0.04);
        expect(result.red).toBeCloseTo(expected.red, 5);
        expect(result.green).toBeCloseTo(expected.green, 5);
        expect(result.blue).toBeCloseTo(expected.blue, 5);
    });
});
