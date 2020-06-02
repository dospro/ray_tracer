import {mult, sum, Tuple} from "./tuples";

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
