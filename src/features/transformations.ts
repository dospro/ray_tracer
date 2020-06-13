import {CMatrix} from "./matrices";

export function translation(x: number, y: number, z: number): CMatrix {
    return new CMatrix(4,
        [1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1]
    );
}

export function scaling(x: number, y: number, z: number): CMatrix {
    return new CMatrix(4,
        [x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1]);
}

export function rotation_x(radians: number): CMatrix {
    return new CMatrix(4,
        [1, 0, 0, 0,
            0, Math.cos(radians), -Math.sin(radians), 0,
            0, Math.sin(radians), Math.cos(radians), 0,
            0, 0, 0, 1]);
}

export function rotation_y(radians: number): CMatrix {
    return new CMatrix(4,
        [Math.cos(radians), 0, Math.sin(radians), 0,
            0, 1, 0, 0,
            -Math.sin(radians), 0, Math.cos(radians), 0,
            0, 0, 0, 1]);
}

export function rotation_z(radians: number): CMatrix {
    return new CMatrix(4,
        [Math.cos(radians), -Math.sin(radians), 0, 0,
            Math.sin(radians), Math.cos(radians), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1]);
}

export function shearing(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): CMatrix {
    return new CMatrix(4,
        [1, xy, xz, 0,
            yx, 1, yz, 0,
            zx, zy, 1, 0,
            0, 0, 0, 1]
    );
}
