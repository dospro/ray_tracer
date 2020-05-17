import {point, vector} from "./tuples";
import {inverse, matrix_mult_tuple} from "./matrices";
import {rotation_x, rotation_y, rotation_z, scaling, translation} from "./transformations";

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

    test('Rotating a point around the y axis', ()=> {
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

    test('Rotating a point around the z axis', ()=> {
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
