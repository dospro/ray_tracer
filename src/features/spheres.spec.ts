import {ray} from "./rays";
import {point, vector} from "./tuples";
import {intersect, sphere} from "./spheres";

test('A ray intersect a sphere at two points', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(4.0);
    expect(xs[1].t).toEqual(6.0);
});

test('A ray intersect a sphere at a tangent', () => {
    const r = ray(point(0, 1, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(5.0);
    expect(xs[1].t).toEqual(5.0)
});

test('A ray misses a sphere', () => {
    const r = ray(point(0, 2, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(0);
});

test('A ray originates inside a sphere', () => {
    const r = ray(point(0, 0, 0), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(-1.0);
    expect(xs[1].t).toEqual(1.0);
});

test('A sphere is behind a ray', () => {
    const r = ray(point(0, 0, 5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(-6.0);
    expect(xs[1].t).toEqual(-4.0);
});

test('Intersect sets the object on the intersection', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].object).toBe(s);
    expect(xs[1].object).toBe(s);
});

