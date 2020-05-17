import {tuple, Tuple} from "./tuples";

export interface Matrix {
    dim: number;
    data: Array<number>
}

export function matrix(dim: number, ...values: number[]): Matrix {
    return {
        dim,
        data: values
    }
}

export function matrix_value(m: Matrix, y: number, x: number): number {
    return m.data[y * m.dim + x];
}

function compare_arrays<T>(a1: Array<T>, a2: Array<T>): boolean {
    if (!a1 || !a2) {
        return false;
    }
    if (a1.length !== a2.length) {
        return false;
    }

    for (let i = 0; i < a1.length; ++i) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}

export function matrix_equals(m1: Matrix, m2: Matrix): boolean {
    return compare_arrays(m1.data, m2.data);
}

export function matrix_mult(m1: Matrix, m2: Matrix): Matrix {
    let result: Array<number> = [];
    for (let row = 0; row < m1.dim; ++row) {
        for (let col = 0; col < m1.dim; ++col) {
            let value = 0;
            for (let cell = 0; cell < m1.dim; ++cell) {
                value += m1.data[row * m1.dim + cell] * m2.data[cell * m2.dim + col];
            }
            result.push(value);
        }
    }
    return matrix(m1.dim, ...result);
}

export function matrix_mult_tuple(m: Matrix, t: Tuple): Tuple {
    let result: Array<number> = [];
    for (let row = 0; row < m.dim; ++row) {
        let value = 0;
        value = m.data[row * m.dim] * t.x +
            m.data[row * m.dim + 1] * t.y +
            m.data[row * m.dim + 2] * t.z +
            m.data[row * m.dim + 3] * t.w;
        result.push(value);
    }
    return tuple(result[0], result[1], result[2], result[3]);
}

export function identity_matrix(dim: number) {
    let data: Array<number> = [];

    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            if (i === j) {
                data.push(1);
            } else {
                data.push(0);
            }
        }
    }
    return matrix(dim, ...data);
}

export function transpose(m: Matrix): Matrix {
    let data: Array<number> = [];
    for (let i = 0; i < m.dim; i++) {
        for (let j = 0; j < m.dim; j++) {
            data.push(matrix_value(m, j, i));
        }
    }
    return matrix(m.dim, ...data);
}

export function determinant(m: Matrix): number {
    if (m.dim === 2) {
        return m.data[0] * m.data[3] - m.data[1] * m.data[2];
    }

    let det = 0;
    for (let i = 0; i < m.dim; i++) {
        det += matrix_value(m, 0, i) * cofactor(m, 0, i);
    }
    return det;
}

export function submatrix(m: Matrix, row: number, col: number): Matrix {
    let data: Array<number> = [];

    for (let i = 0; i < m.dim; i++) {
        if (i === row) {
            continue;
        }
        for (let j = 0; j < m.dim; j++) {
            if (j === col) {
                continue;
            }
            data.push(m.data[i * m.dim + j]);
        }
    }
    return matrix(m.dim - 1, ...data);
}

export function minor(m: Matrix, row: number, col: number): number {
    return determinant(submatrix(m, row, col));
}

export function cofactor(m: Matrix, row: number, col: number) {
    if ((row + col) % 2 === 0) {
        return minor(m, row, col);
    }
    return -minor(m, row, col);
}

export function inverse(m: Matrix): Matrix {
    const det = determinant(m);
    if (det === 0) {
        throw 'Error';
    }

    let inv: Array<number> = [];

    for (let i = 0; i < m.dim; i++) {
        for (let j = 0; j < m.dim; j++) {
            const c = cofactor(m, j, i);
            inv.push(c / det);
        }
    }
    return matrix(m.dim, ...inv);
}
