import {CTuple} from "./tuples";
import {CMatrix} from "./matrices";

export interface Ray {
    origin: CTuple,
    direction: CTuple,
}

export function ray(origin: CTuple, direction: CTuple): Ray {
    return {origin, direction};
}

export function position(r: Ray, t: number): CTuple {
    return r.origin.plus(r.direction.mult(t));
}

export function transform(r: Ray, m: CMatrix): Ray {
    return {
        origin: m.mult_tuple(r.origin),
        direction: m.mult_tuple(r.direction)
    };
}
