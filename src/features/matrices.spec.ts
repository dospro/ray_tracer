import {
    CMatrix,
    cofactor,
    determinant,
    identity_matrix,
    inverse,
    matrix,
    matrix_equals,
    matrix_mult,
    matrix_value, minor, submatrix,
    transpose
} from "./matrices";
import {Tuple} from "./tuples";

test('Constructing and inspecting a 4x4 matrix', () => {
    const m = matrix(4,
        1, 2, 3, 4,
        5.5, 6.5, 7.5, 8.5,
        0, 10, 11, 12,
        13.5, 14.5, 15.5, 16.5
    );
    expect(matrix_value(m, 0, 0)).toBe(1);
    expect(matrix_value(m, 0, 3)).toBe(4);
    expect(matrix_value(m, 1, 0)).toBe(5.5);
    expect(matrix_value(m, 1, 2)).toBe(7.5);
    expect(matrix_value(m, 2, 2)).toBe(11);
    expect(matrix_value(m, 3, 0)).toBe(13.5);
    expect(matrix_value(m, 3, 2)).toBe(15.5);
});

test('A 2x2 matrix ought to be representable', () => {
    const m = matrix(2, -3, 5, 1, -2);
    expect(matrix_value(m, 0, 0)).toBe(-3)
    expect(matrix_value(m, 0, 1)).toBe(5)
    expect(matrix_value(m, 1, 0)).toBe(1)
    expect(matrix_value(m, 1, 1)).toBe(-2)
});

test('A 3x3 matrix ought to be representable', () => {
    const m = matrix(3,
        -3, 5, 0,
        1, -2, -7,
        0, 1, 1
    );
    expect(matrix_value(m, 0, 0)).toBe(-3);
    expect(matrix_value(m, 1, 1)).toBe(-2);
    expect(matrix_value(m, 2, 2)).toBe(1);

});

test('Matrix equality with identical matrices', () => {
    const m1 = matrix(4,
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    );

    const m2 = matrix(4,
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    );

    expect(matrix_equals(m1, m2)).toBeTruthy();
});


test('Matrix equality with different matrices', () => {
    const m1 = matrix(4,
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    );

    const m2 = matrix(4,
        2, 3, 4, 5,
        6, 7, 8, 9,
        8, 7, 6, 5,
        4, 3, 2, 1
    );

    expect(matrix_equals(m1, m2)).toBeFalsy();
});

test('Multiplying two matrices', () => {
    const m1 = matrix(4,
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    );

    const m2 = matrix(4,
        -2, 1, 2, 3,
        3, 2, 1, -1,
        4, 3, 6, 5,
        1, 2, 7, 8
    );

    const expected = matrix(4,
        20, 22, 50, 48,
        44, 54, 114, 108,
        40, 58, 110, 102,
        16, 26, 46, 42
    );
    expect(matrix_mult(m1, m2)).toStrictEqual(expected);
});

test('A matrix multiplied by a tuple', () => {
    const m = new CMatrix(4, [
            1, 2, 3, 4,
            2, 4, 4, 2,
            8, 6, 4, 1,
            0, 0, 0, 1
        ]
    );
    const t = new Tuple(1, 2, 3, 1);
    const expected = new Tuple(18, 24, 33, 1);
    expect(m.mult_tuple(t)).toStrictEqual(expected);
});

test('Multyplying a matrix by the identity matrix', () => {
    const m = matrix(4,
        0, 1, 2, 4,
        1, 2, 4, 8,
        2, 4, 8, 16,
        4, 8, 16, 32
    );
    expect(matrix_mult(m, identity_matrix(4))).toStrictEqual(m);
});

test('Multiplying the identity matrix by a tuple', () => {
    const t = new Tuple(1, 2, 3, 4);
    expect(CMatrix.make_identity(4).mult_tuple(t)).toStrictEqual(t);
});

test('Transposing a matrix', () => {
    const m = matrix(4,
        0, 9, 3, 0,
        9, 8, 0, 8,
        1, 8, 5, 3,
        0, 0, 5, 8
    );
    const expected = matrix(4,
        0, 9, 1, 0,
        9, 8, 8, 0,
        3, 0, 5, 5,
        0, 8, 3, 8
    );
    expect(transpose(m)).toStrictEqual(expected);
});

test('Transposing the identity matrix', () => {
    const i = identity_matrix(4);
    expect(transpose(i)).toStrictEqual(i);
});

test('Calculating the determinant of a 2x2 matrix', () => {
    const m = matrix(2, 1, 5, -3, 2);
    expect(determinant(m)).toBe(17);
});

test('A submatrix of 3x3 matrix is a 2x2 matrix', () => {
    const m = matrix(3,
        1, 5, 0,
        -3, 2, 7,
        0, 6, -3
    );
    const expected = matrix(2, -3, 2, 0, 6);
    expect(submatrix(m, 0, 2)).toStrictEqual(expected);
});

test('A submatrix of a 4x4 matrix is a 3x3 matrix', () => {
    const m = matrix(4,
        -6, 1, 1, 6,
        -8, 5, 8, 6,
        -1, 0, 8, 2,
        -7, 1, -1, 1
    );
    const expected = matrix(3,
        -6, 1, 6,
        -8, 8, 6,
        -7, -1, 1
    );
    expect(submatrix(m, 2, 1)).toStrictEqual(expected);
});

test('Calculating a minor of a 3x3 matrix', () => {
    const m = matrix(3,
        3, 5, 0,
        2, -1, -7,
        6, -1, 5
    );
    const b = submatrix(m, 1, 0);
    expect(determinant(b)).toBe(25);
    expect(minor(m, 1, 0)).toBe(25);
});

test('Calculating a cofactor of a 3x3 matrix', () => {
    const m = matrix(3,
        3, 5, 0,
        2, -1, -7,
        6, -1, 5
    );
    expect(minor(m, 0, 0)).toBe(-12);
    expect(cofactor(m, 0, 0)).toBe(-12);
    expect(minor(m, 1, 0)).toBe(25);
    expect(cofactor(m, 1, 0)).toBe(-25);
});

test('Calculating the determinant of a 3x3 matrix', () => {
    const m = matrix(3,
        1, 2, 6,
        -5, 8, -4,
        2, 6, 4
    );
    expect(cofactor(m, 0, 0)).toBe(56);
    expect(cofactor(m, 0, 1)).toBe(12);
    expect(cofactor(m, 0, 2)).toBe(-46);
    expect(determinant(m)).toBe(-196);
});

test('Calculating the determinant of a 4x4 matrix', () => {
    const m = matrix(4,
        -2, -8, 3, 5,
        -3, 1, 7, 3,
        1, 2, -9, 6,
        -6, 7, 7, -9
    );
    expect(cofactor(m, 0, 0)).toBe(690);
    expect(cofactor(m, 0, 1)).toBe(447);
    expect(cofactor(m, 0, 2)).toBe(210);
    expect(cofactor(m, 0, 3)).toBe(51);
    expect(determinant(m)).toBe(-4071);
});


test('Calculating the inverse of a matrix', () => {
    const m = matrix(4,
        -5, 2, 6, -8,
        1, -5, 1, 8,
        7, 7, -6, -7,
        1, -3, 7, 4
    );
    const expected = matrix(4,
        0.21805, 0.45113, 0.24060, -0.04511,
        -0.80827, -1.45677, -0.44361, 0.52068,
        -0.07895, -0.22368, -0.05263, 0.19737,
        -0.52256, -0.81391, -0.30075, 0.30639
    );

    const result = inverse(m);

    expect(determinant(m)).toBe(532);
    expect(cofactor(m, 2, 3)).toBe(-160);
    expect(matrix_value(result, 3, 2)).toBeCloseTo(-160 / 532, 5);
    expect(cofactor(m, 3, 2)).toBe(105);
    expect(matrix_value(result, 2, 3)).toBeCloseTo(105 / 532, 5);

    for (let i = 0; i < m.dim * m.dim; i++) {
        expect(result.data[i]).toBeCloseTo(expected.data[i]);
    }
});

test('Calculating the inverse of another matrix', () => {
    const m = matrix(4,
        8, -5, 9, 2,
        7, 5, 6, 1,
        -6, 0, 9, 6,
        -3, 0, -9, -4
    );
    const expected = matrix(4,
        -0.15385, -0.15385, -0.28205, -0.53846,
        -0.07692, 0.12308, 0.02564, 0.03077,
        0.35897, 0.35897, 0.43590, 0.92308,
        -0.69231, -0.69231, -0.76923, -1.92308
    );

    const result = inverse(m);

    for (let i = 0; i < 16; i++) {
        expect(result.data[i]).toBeCloseTo(expected.data[i]);
    }
});

test('Multiplying a product by its inverse', () => {
    const a = matrix(4,
        3, -9, 7, 3,
        3, -8, 2, -9,
        -4, 4, 4, 1,
        -6, 5, -1, 1
    );

    const b = matrix(4,
        8, 2, 2, 2,
        3, -1, 7, 0,
        7, 0, 5, 4,
        6, -2, 0, 5
    );

    const c = matrix_mult(a, b);
    const result = matrix_mult(c, inverse(b));
    for (let i = 0; i < 16; i++) {
        expect(result.data[i]).toBeCloseTo(a.data[i], 5);
    }
});
