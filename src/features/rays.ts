import {mult, sum, Tuple} from "./tuples";
import {Matrix, matrix_mult_tuple} from "./matrices";

export interface Ray {
    origin: Tuple,
    direction: Tuple,
}

export function ray(origin: Tuple, direction: Tuple): Ray {
    return {origin, direction};
}

export function position(r: Ray, t: number): Tuple {
    return sum(r.origin, mult(r.direction, t));
}

export function transform(r: Ray, m: Matrix): Ray {
    return {
        origin: matrix_mult_tuple(m, r.origin),
        direction: matrix_mult_tuple(m, r.direction)
    };
}
