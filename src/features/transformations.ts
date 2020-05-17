import {matrix, Matrix} from "./matrices";

export function translation(x: number, y: number, z: number): Matrix {
    return matrix(4,
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1,
    );
}

export function scaling(x: number, y: number, z: number): Matrix {
    return matrix(4,
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1);
}

export function rotation_x(radians: number): Matrix {
    return matrix(4,
        1, 0, 0, 0,
        0, Math.cos(radians), -Math.sin(radians), 0,
        0, Math.sin(radians), Math.cos(radians), 0,
        0, 0, 0, 1);
}

export function rotation_y(radians: number): Matrix {
    return matrix(4,
        Math.cos(radians), 0, Math.sin(radians), 0,
        0, 1, 0, 0,
        -Math.sin(radians), 0, Math.cos(radians), 0,
        0, 0, 0, 1);
}

export function rotation_z(radians: number): Matrix {
    return matrix(4,
        Math.cos(radians), -Math.sin(radians), 0, 0,
        Math.sin(radians), Math.cos(radians), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1);
}
