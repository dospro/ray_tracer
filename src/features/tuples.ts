export interface Tuple {
    x: number;
    y: number;
    z: number;
    w: number;
}

export interface Color {
    red: number;
    green: number;
    blue: number;
}

export function tuple(x: number, y: number, z: number, w: number) {
    return {x, y, z, w};
}

export function isPoint(tuple: Tuple) {
    return tuple.w === 1.0;
}

export function isVector(tuple: Tuple) {
    return tuple.w === 0.0;
}

export function point(x: number, y: number, z: number) {
    return {x, y, z, w: 1.0};
}

export function vector(x: number, y: number, z: number) {
    return {x, y, z, w: 0.0};
}

export function sum(...tuples: Tuple[]): Tuple {
    return tuples.reduce((total, n) => (
        tuple(total.x + n.x, total.y + n.y, total.z + n.z, total.w + n.w))
    );
}

export function sub(a: Tuple, b: Tuple): Tuple {
    return tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

export function neg(a: Tuple): Tuple {
    return tuple(-a.x, -a.y, -a.z, -a.w);
}

export function mult(a: Tuple, scalar: number): Tuple {
    return tuple(scalar * a.x, scalar * a.y, scalar * a.z, scalar * a.w);
}

export function div(a: Tuple, scalar: number): Tuple {
    return tuple(a.x / scalar, a.y / scalar, a.z / scalar, a.w / scalar);
}

export function magnitude(v: Tuple): number {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z + v.w * v.w);
}

export function normalize(v: Tuple): Tuple {
    const m = magnitude(v);
    return tuple(v.x / m, v.y / m, v.z / m, v.w / m);
}

export function dot(a: Tuple, b: Tuple): number {
    return a.x * b.x +
        a.y * b.y +
        a.z * b.z +
        a.w * b.w;
}

export function cross(a: Tuple, b: Tuple): Tuple {
    const x = a.y * b.z - a.z * b.y;
    const y = a.z * b.x - a.x * b.z;
    const z = a.x * b.y - a.y * b.x;
    return vector(x, y, z);
}

export function color(red: number, green: number, blue: number): Color {
    return {red, green, blue};
}

export function sum_color(c1: Color, c2: Color): Color {
    return color(c1.red + c2.red, c1.green + c2.green, c1.blue + c2.blue);
}

export function sub_color(c1: Color, c2: Color): Color {
    return color(c1.red - c2.red, c1.green - c2.green, c1.blue - c2.blue);
}

export function mult_color(c: Color, scalar: number): Color {
    return color(c.red * scalar, c.green * scalar, c.blue * scalar);
}

export function hadamard_product(c1: Color, c2: Color): Color {
    return color(c1.red * c2.red, c1.green * c2.green, c1.blue * c2.blue);
}
