export interface Intersection {
    t: number;
    object: any;
}

export function intersection(value: number, obj: any): Intersection {
    return {
        t: value,
        object: obj
    };
}

export function intersections(...inter: Intersection[]): Intersection[] {
    return inter;
}


export function hit(inter: Intersection[]): Intersection | undefined {
    return inter
        .filter((entry: Intersection) => entry.t >= 0)
        .sort((a, b) => a.t - b.t)
        .shift();
}
