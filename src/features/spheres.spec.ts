import {ray} from "./rays";
import {CTuple} from "./tuples";
import {intersect, sphere} from "./spheres";
import {CMatrix} from "./matrices";
import {scaling, translation} from "./transformations";

test('A ray intersect a sphere at two points', () => {
    const r = ray(CTuple.make_point(0, 0, -5), CTuple.make_vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(4.0);
    expect(xs[1].t).toEqual(6.0);
});

test('A ray intersect a sphere at a tangent', () => {
    const r = ray(CTuple.make_point(0, 1, -5), CTuple.make_vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(5.0);
    expect(xs[1].t).toEqual(5.0)
});

test('A ray misses a sphere', () => {
    const r = ray(CTuple.make_point(0, 2, -5), CTuple.make_vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(0);
});

test('A ray originates inside a sphere', () => {
    const r = ray(CTuple.make_point(0, 0, 0), CTuple.make_vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(-1.0);
    expect(xs[1].t).toEqual(1.0);
});

test('A sphere is behind a ray', () => {
    const r = ray(CTuple.make_point(0, 0, 5), CTuple.make_vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(-6.0);
    expect(xs[1].t).toEqual(-4.0);
});

test('Intersect sets the object on the intersection', () => {
    const r = ray(CTuple.make_point(0, 0, -5), CTuple.make_vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);

    expect(xs.length).toEqual(2);
    expect(xs[0].object).toBe(s);
    expect(xs[1].object).toBe(s);
});


describe('Sphere transformations', () => {
    test('A spheres default transformation', () => {
        const s = sphere();
        expect(s.transform).toStrictEqual(CMatrix.make_identity(4));
    });

    test('Changing a spheres transformation', () => {
        const s = sphere();
        const t = translation(2, 3, 4);
        s.transform = t;
        expect(s.transform).toStrictEqual(t);
    });

    test('Intersecting a scaled sphere with a ray', () => {
        const r = ray(CTuple.make_point(0, 0, -5), CTuple.make_vector(0, 0, 1));
        const s = sphere();
        s.transform = scaling(2, 2, 2);
        const xs = intersect(s, r);
        expect(xs.length).toEqual(2);
        expect(xs[0].t).toEqual(3);
        expect(xs[1].t).toEqual(7);
    });

    test('Intersecting a translated sphere with a ray', () => {
        const r = ray(CTuple.make_point(0, 0, -5), CTuple.make_vector(0, 0, 1));
        const s = sphere();
        s.transform = translation(5, 0, 0);
        const xs = intersect(s, r);
        expect(xs.length).toEqual(0);
    });
});
