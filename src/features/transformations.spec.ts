import {point, vector} from "./tuples";
import {identity_matrix, inverse, matrix_mult, matrix_mult_tuple} from "./matrices";
import {rotation_x, rotation_y, rotation_z, scaling, translation, shearing} from "./transformations";

describe('Translation matrices', () => {
    test('Multiplying by a translation matrix', () => {
        const transform = translation(5, -3, 2);
        const p = point(-3, 4, 5);

        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(2, 1, 7));
    });

    test('Multiplying by the inverse of a translation matrix', () => {
        const transform = translation(5, -3, 2);
        const inv = inverse(transform)
        const p = point(-3, 4, 5);

        expect(matrix_mult_tuple(inv, p)).toStrictEqual(point(-8, 7, 3));
    });

    test('Translation does not affect vectors', () => {
        const transform = translation(5, -3, 2);
        const v = vector(-3, 4, 5);

        expect(matrix_mult_tuple(transform, v)).toStrictEqual(v);
    });
});

describe('Scaling matrices', () => {
    test('A scaling matrix applied to a point', () => {
        const transform = scaling(2, 3, 4);
        const p = point(-4, 6, 8);

        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(-8, 18, 32));
    });

    test('A scaling matrix applied to a vector', () => {
        const transform = scaling(2, 3, 4);
        const v = vector(-4, 6, 8);

        expect(matrix_mult_tuple(transform, v)).toStrictEqual(vector(-8, 18, 32));
    });

    test('Multiplying by the inverse of a scaling matrix', () => {
        const transform = scaling(2, 3, 4);
        const inv = inverse(transform);
        const v = vector(-4, 6, 8);

        expect(matrix_mult_tuple(inv, v)).toStrictEqual(vector(-2, 2, 2));
    });

    test('Reflection is scaling by a negative value', () => {
        const transform = scaling(-1, 1, 1);
        const p = point(2, 3, 4);

        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(-2, 3, 4));
    });
});

describe('Rotation matrices', () => {
    test('Rotating a point around the x axis', () => {
        const p = point(0, 1, 0);
        const half_quarter = rotation_x(Math.PI / 4);
        const full_quarter = rotation_x(Math.PI / 2);

        const half_quarter_expected = point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
        const full_quarter_expected = point(0, 0, 1);

        const half_quarter_result = matrix_mult_tuple(half_quarter, p);
        const full_quarter_result = matrix_mult_tuple(full_quarter, p);

        expect(half_quarter_result.x).toBeCloseTo(half_quarter_expected.x, 5);
        expect(half_quarter_result.y).toBeCloseTo(half_quarter_expected.y, 5);
        expect(half_quarter_result.z).toBeCloseTo(half_quarter_expected.z, 5);
        expect(half_quarter_result.w).toBeCloseTo(half_quarter_expected.w, 5);

        expect(full_quarter_result.x).toBeCloseTo(full_quarter_expected.x, 5);
        expect(full_quarter_result.y).toBeCloseTo(full_quarter_expected.y, 5);
        expect(full_quarter_result.z).toBeCloseTo(full_quarter_expected.z, 5);
        expect(full_quarter_result.w).toBeCloseTo(full_quarter_expected.w, 5);
    });

    test('The inverse of an x-rotation in the opposite direction', () => {
        const p = point(0, 1, 0);
        const half_quarter = rotation_x(Math.PI / 4);
        const inv = inverse(half_quarter);

        const expected = point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
        const result = matrix_mult_tuple(inv, p);

        expect(result.x).toBeCloseTo(expected.x, 5);
        expect(result.y).toBeCloseTo(expected.y, 5);
        expect(result.z).toBeCloseTo(expected.z, 5);
        expect(result.w).toBeCloseTo(expected.w, 5);

    });

    test('Rotating a point around the y axis', () => {
        const p = point(0, 0, 1);
        const half_quarter = rotation_y(Math.PI / 4);
        const full_quarter = rotation_y(Math.PI / 2);

        const half_quarter_expected = point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
        const full_quarter_expected = point(1, 0, 0);

        const half_quarter_result = matrix_mult_tuple(half_quarter, p);
        const full_quarter_result = matrix_mult_tuple(full_quarter, p);

        expect(half_quarter_result.x).toBeCloseTo(half_quarter_expected.x, 5);
        expect(half_quarter_result.y).toBeCloseTo(half_quarter_expected.y, 5);
        expect(half_quarter_result.z).toBeCloseTo(half_quarter_expected.z, 5);
        expect(half_quarter_result.w).toBeCloseTo(half_quarter_expected.w, 5);

        expect(full_quarter_result.x).toBeCloseTo(full_quarter_expected.x, 5);
        expect(full_quarter_result.y).toBeCloseTo(full_quarter_expected.y, 5);
        expect(full_quarter_result.z).toBeCloseTo(full_quarter_expected.z, 5);
        expect(full_quarter_result.w).toBeCloseTo(full_quarter_expected.w, 5);
    });

    test('Rotating a point around the z axis', () => {
        const p = point(0, 1, 0);
        const half_quarter = rotation_z(Math.PI / 4);
        const full_quarter = rotation_z(Math.PI / 2);

        const half_quarter_expected = point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
        const full_quarter_expected = point(-1, 0, 0);

        const half_quarter_result = matrix_mult_tuple(half_quarter, p);
        const full_quarter_result = matrix_mult_tuple(full_quarter, p);

        expect(half_quarter_result.x).toBeCloseTo(half_quarter_expected.x, 5);
        expect(half_quarter_result.y).toBeCloseTo(half_quarter_expected.y, 5);
        expect(half_quarter_result.z).toBeCloseTo(half_quarter_expected.z, 5);
        expect(half_quarter_result.w).toBeCloseTo(half_quarter_expected.w, 5);

        expect(full_quarter_result.x).toBeCloseTo(full_quarter_expected.x, 5);
        expect(full_quarter_result.y).toBeCloseTo(full_quarter_expected.y, 5);
        expect(full_quarter_result.z).toBeCloseTo(full_quarter_expected.z, 5);
        expect(full_quarter_result.w).toBeCloseTo(full_quarter_expected.w, 5);
    });
});

describe('Shearing matrices', () => {
    test('A shearing transformation moves x in proportion to y', () => {
        const transform = shearing(1, 0, 0, 0, 0, 0);
        const p = point(2, 3, 4);
        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(5, 3, 4));
    });

    test('A shearing transformation moves x in proportion to z', () => {
        const transform = shearing(0, 1, 0, 0, 0, 0);
        const p = point(2, 3, 4);
        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(6, 3, 4));
    });

    test('A shearing transformation moves y in proportion to x', () => {
        const transform = shearing(0, 0, 1, 0, 0, 0);
        const p = point(2, 3, 4);
        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(2, 5, 4));
    });

    test('A shearing transformation moves y in proportion to z', () => {
        const transform = shearing(0, 0, 0, 1, 0, 0);
        const p = point(2, 3, 4);
        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(2, 7, 4));
    });

    test('A shearing transformation moves z in proportion to x', () => {
        const transform = shearing(0, 0, 0, 0, 1, 0);
        const p = point(2, 3, 4);
        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(2, 3, 6));
    });

    test('A shearing transformation moves z in proportion to y', () => {
        const transform = shearing(0, 0, 0, 0, 0, 1);
        const p = point(2, 3, 4);
        expect(matrix_mult_tuple(transform, p)).toStrictEqual(point(2, 3, 7));
    });
});

describe('Chaining matrices', () => {
    test('Individual transformations are applied in sequence', () => {
        const p = point(1, 0, 1);
        const A = rotation_x(Math.PI / 2);
        const B = scaling(5, 5, 5);
        const C = translation(10, 5, 7);

        const p2 = matrix_mult_tuple(A, p);
        expect(p2.x).toBeCloseTo(1, 5);
        expect(p2.y).toBeCloseTo(-1, 5);
        expect(p2.z).toBeCloseTo(0, 5);

        const p3 = matrix_mult_tuple(B, p2);
        expect(p3.x).toBeCloseTo(5, 5);
        expect(p3.y).toBeCloseTo(-5, 5);
        expect(p3.z).toBeCloseTo(0, 5);

        const p4 = matrix_mult_tuple(C, p3);
        expect(p4.x).toBeCloseTo(15, 5);
        expect(p4.y).toBeCloseTo(0, 5);
        expect(p4.z).toBeCloseTo(7, 5);
    });

    test('Chained transformations must be applied in reverse order', () => {
        const p = point(1, 0, 1);
        const A = rotation_x(Math.PI / 2);
        const B = scaling(5, 5, 5);
        const C = translation(10, 5, 7);

        const T = matrix_mult(C, matrix_mult(B, A));
        const result = matrix_mult_tuple(T, p);
        expect(result.x).toBeCloseTo(15, 5);
        expect(result.y).toBeCloseTo(0, 5);
        expect(result.z).toBeCloseTo(7, 5);
    });

    // xtest('Matrix Fluent API', () => {
    //     const p = point(1, 0, 1);
    //     const transform = identity_matrix(4)
    //         .rotate_x(Math.PI / 2)
    //         .scale(5, 5, 5)
    //         .translate(10, 5, 7);
    //
    //     const result = matrix_mult_tuple(transform, p);
    //     expect(result.x).toBeCloseTo(15, 5);
    //     expect(result.y).toBeCloseTo(0, 5);
    //     expect(result.z).toBeCloseTo(7, 5);
    // });

});
