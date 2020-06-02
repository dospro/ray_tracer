import {ray} from "./rays";
import {point, vector} from "./tuples";
import {intersects, sphere} from "./spheres";

test('A ray intersects a sphere at two points', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersects(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0]).toEqual(4.0);
    expect(xs[1]).toEqual(6.0);
});

test('A ray intersects a sphere at a tangent', () => {
    const r = ray(point(0, 1, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersects(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0]).toEqual(5.0);
    expect(xs[1]).toEqual(5.0)
});

test('A ray misses a sphere', () => {
    const r = ray(point(0, 2, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersects(s, r);

    expect(xs.length).toEqual(0);
});

test('A ray originates inside a sphere', () => {
    const r = ray(point(0, 0, 0), vector(0, 0, 1));
    const s = sphere();
    const xs = intersects(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0]).toEqual(-1.0);
    expect(xs[1]).toEqual(1.0);
});

test('A sphere is behind a ray', () => {
    const r = ray(point(0, 0, 5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersects(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0]).toEqual(-6.0);
    expect(xs[1]).toEqual(-4.0);
});

