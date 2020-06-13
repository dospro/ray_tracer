import {CTuple} from "./tuples";

export class CMatrix {

    constructor(
        private readonly dim: number,
        private data: number[]
    ) {
    }

    static from_i(i: Matrix): CMatrix {
        return new CMatrix(i.dim, i.data);
    }

    static make_identity(dim: number): CMatrix {
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
        return new CMatrix(dim, data);
    }

    public to_i(): Matrix {
        return {
            dim: this.dim,
            data: this.data
        }
    }

    public get_value(x: number, y: number): number {
        return this.data[y * this.dim + x];
    }

    public equals(m: CMatrix): boolean {
        if (!this.data || !m.data) {
            return false;
        }
        if (this.data.length !== m.data.length) {
            return false;
        }

        for (let i = 0; i < this.data.length; ++i) {
            if (this.data[i] !== m.data[i]) {
                return false;
            }
        }
        return true;
    }

    public mult(m: CMatrix): CMatrix {
        let result: Array<number> = [];
        for (let row = 0; row < this.dim; ++row) {
            for (let col = 0; col < this.dim; ++col) {
                let value = 0;
                for (let cell = 0; cell < this.dim; ++cell) {
                    value += this.data[row * this.dim + cell] * m.data[cell * m.dim + col];
                }
                result.push(value);
            }
        }
        return new CMatrix(this.dim, result);
    }

    public mult_tuple(t: CTuple): CTuple {
        let result: Array<number> = [];
        for (let row = 0; row < this.dim; ++row) {
            let value = 0;
            value = this.data[row * this.dim] * t.x +
                this.data[row * this.dim + 1] * t.y +
                this.data[row * this.dim + 2] * t.z +
                this.data[row * this.dim + 3] * t.w;
            result.push(value);
        }
        return CTuple.from_array(result);
    }

    public transpose(): CMatrix {
        let data: Array<number> = [];
        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++) {
                data.push(this.get_value(i, j));
            }
        }
        return new CMatrix(this.dim, data);
    }

    public determinant(): number {
        if (this.dim === 2) {
            return this.data[0] * this.data[3] - this.data[1] * this.data[2];
        }

        let det = 0;
        for (let i = 0; i < this.dim; i++) {
            det += this.get_value(i, 0) * this.cofactor(0, i);
        }
        return det;
    }

    public submatrix(row: number, col: number): CMatrix {
        let data: Array<number> = [];

        for (let i = 0; i < this.dim; i++) {
            if (i === row) {
                continue;
            }
            for (let j = 0; j < this.dim; j++) {
                if (j === col) {
                    continue;
                }
                data.push(this.get_value(j, i));
            }
        }
        return new CMatrix(this.dim - 1, data);
    }

    public minor(row: number, col: number): number {
        return this
            .submatrix(row, col)
            .determinant();
    }

    public cofactor(row: number, col: number): number {
        if ((row + col) % 2 === 0) {
            return this.minor(row, col);
        }
        return -this.minor(row, col);
    }

    public inverse(): CMatrix {
        const det = this.determinant();
        if (det === 0) {
            throw 'Error';
        }

        let inv: Array<number> = [];

        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++) {
                const c = this.cofactor(j, i);
                inv.push(c / det);
            }
        }
        return new CMatrix(this.dim, inv);
    }
}

export interface Matrix {
    dim: number;
    data: Array<number>
}

export function matrix(dim: number, ...values: number[]): Matrix {
    return new CMatrix(dim, values).to_i();
}

export function matrix_value(m: Matrix, y: number, x: number): number {
    return CMatrix.from_i(m).get_value(x, y);
}

export function matrix_equals(m1: Matrix, m2: Matrix): boolean {
    return CMatrix.from_i(m1).equals(CMatrix.from_i(m2));
}

export function matrix_mult(m1: Matrix, m2: Matrix): Matrix {
    return CMatrix
        .from_i(m1)
        .mult(CMatrix.from_i(m2))
        .to_i();
}

export function matrix_mult_tuple(m: Matrix, t: CTuple): CTuple {
    return CMatrix
        .from_i(m)
        .mult_tuple(t);
}

export function identity_matrix(dim: number) {
    return CMatrix.make_identity(dim).to_i();
}

export function transpose(m: Matrix): Matrix {
    return CMatrix
        .from_i(m)
        .transpose()
        .to_i();
}

export function determinant(m: Matrix): number {
    return CMatrix.from_i(m).determinant();
}

export function submatrix(m: Matrix, row: number, col: number): Matrix {
    return CMatrix.from_i(m).submatrix(row, col).to_i();
}

export function minor(m: Matrix, row: number, col: number): number {
    return CMatrix.from_i(m).minor(row, col);
}

export function cofactor(m: Matrix, row: number, col: number) {
    return CMatrix.from_i(m).cofactor(row, col);
}

export function inverse(m: Matrix): Matrix {
    return CMatrix.from_i(m).inverse().to_i();
}
