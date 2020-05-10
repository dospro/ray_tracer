import {
    tuple,
    isPoint,
    isVector,
    point,
    vector,
    sum,
    sub,
    neg,
    mult,
    div,
    magnitude,
    normalize,
    dot,
    cross,
    color,
    sum_color,
    sub_color,
    mult_color,
    hadamard_product
} from './tuples';


test('A tuple with w=1.0 is a point', () => {
    const result = tuple(4.3, -4.2, 3.1, 1.0);
    expect(result.x).toBe(4.3);
    expect(result.y).toBe(-4.2);
    expect(result.z).toBe(3.1);
    expect(result.w).toBe(1.0);

    expect(isPoint(result)).toBe(true);
    expect(isVector(result)).toBe(false);
});

test('A tuple with w=0 is a vector', () => {
    const result = tuple(4.3, -4.2, 3.1, 0.0);
    expect(result.x).toBe(4.3);
    expect(result.y).toBe(-4.2);
    expect(result.z).toBe(3.1);
    expect(result.w).toBe(0.0);

    expect(isPoint(result)).toBe(false);
    expect(isVector(result)).toBe(true);
});

test('point creates tuples with w=1', () => {
    const p = point(4, -4, 3);
    expect(p).toStrictEqual(tuple(4, -4, 3, 1));
});

test('vector creates tuples with w=0', () => {
    const v = vector(4, -4, 3);
    expect(v).toStrictEqual(tuple(4, -4, 3, 0));
});


test('Adding two tuples', () => {
    const a1 = tuple(3, -2, 5, 1);
    const a2 = tuple(-2, 3, 1, 0);
    expect(sum(a1, a2)).toStrictEqual(tuple(1, 1, 6, 1));
});

test('Substracting two points', () => {
    const p1 = point(3, 2, 1);
    const p2 = point(5, 6, 7);
    expect(sub(p1, p2)).toStrictEqual(vector(-2, -4, -6));
});


test('Substracting two vectors', () => {
    const v1 = vector(3, 2, 1);
    const v2 = vector(5, 6, 7);
    expect(sub(v1, v2)).toStrictEqual(vector(-2, -4, -6));
});

test('Negating a tuple', () => {
    const a = tuple(1, -2, 3, -4);
    expect(neg(a)).toStrictEqual(tuple(-1, 2, -3, 4));
});

test('Multiplying a tuple by a scalar', () => {
    const a = tuple(1, -2, 3, -4);
    expect(mult(a, 3.5)).toStrictEqual(tuple(3.5, -7, 10.5, -14));
});

test('Multiplying a tuple by a fraction', () => {
    const a = tuple(1, -2, 3, -4);
    expect(mult(a, 0.5)).toStrictEqual(tuple(0.5, -1, 1.5, -2));
});

test('Dividing a tuple by a scalar', () => {
    const a = tuple(1, -2, 3, -4);
    expect(div(a, 2)).toStrictEqual(tuple(0.5, -1, 1.5, -2));
});

test('Computing magnitude of vector(1, 0, 0)', () => {
    const v = vector(1, 0, 0);
    expect(magnitude(v)).toBe(1);
});

test('Computing magnitude of vector(0, 1, 0)', () => {
    const v = vector(0, 1, 0);
    expect(magnitude(v)).toBe(1);
});

test('Computing magnitude of vector(0, 0, 1)', () => {
    const v = vector(0, 0, 1);
    expect(magnitude(v)).toBe(1);
});

test('Computing magnitude of vector(1, 2, 3)', () => {
    const v = vector(1, 2, 3);
    expect(magnitude(v)).toBe(Math.sqrt(14));
});

test('Computing magnitude of vector(-1, -2, -3)', () => {
    const v = vector(-1, -2, -3);
    expect(magnitude(v)).toBe(Math.sqrt(14));
});

test('Normalizing vector(4, 0, 0) gives (1,0,0)', () => {
    const v = vector(4, 0, 0);
    expect(normalize(v)).toStrictEqual(vector(1, 0, 0));
});

test('Normalizing vector(1,2,3)', () => {
    const v = vector(1, 2, 3);
    const result = normalize(v);
    const expected = vector(0.26726, 0.53452, 0.80178);
    expect(result.x).toBeCloseTo(expected.x, 5);
    expect(result.y).toBeCloseTo(expected.y, 5);
    expect(result.z).toBeCloseTo(expected.z, 5);
    expect(result.w).toBeCloseTo(expected.w, 5);
});

test('The magnitude of a normalized vector', () => {
    const v = vector(1, 2, 3);
    const n = normalize(v);
    expect(magnitude(n)).toBe(1);
});

test('The dot product of two tuples', () => {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);
    expect(dot(a, b)).toBe(20);
});

test('The cross product of two vectors', () => {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);
    expect(cross(a, b)).toStrictEqual(vector(-1, 2, -1));
    expect(cross(b, a)).toStrictEqual(vector(1, -2, 1));
});

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
