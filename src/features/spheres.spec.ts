import {CRay} from "./rays";
import {Tuple} from "./tuples";
import {Sphere} from "./spheres";
import {CMatrix} from "./matrices";
import {rotation_z, scaling, translation} from "./transformations";
import {Material} from "./materials";

test('A ray intersect a sphere at two points', () => {
    const r = new CRay(Tuple.make_point(0, 0, -5), Tuple.make_vector(0, 0, 1));
    const s = new Sphere();
    const xs = s.intersect(r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(4.0);
    expect(xs[1].t).toEqual(6.0);
});

test('A ray intersect a sphere at a tangent', () => {
    const r = new CRay(Tuple.make_point(0, 1, -5), Tuple.make_vector(0, 0, 1));
    const s = new Sphere();
    const xs = s.intersect(r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(5.0);
    expect(xs[1].t).toEqual(5.0)
});

test('A ray misses a sphere', () => {
    const r = new CRay(Tuple.make_point(0, 2, -5), Tuple.make_vector(0, 0, 1));
    const s = new Sphere();
    const xs = s.intersect(r);

    expect(xs.length).toEqual(0);
});

test('A ray originates inside a sphere', () => {
    const r = new CRay(Tuple.make_point(0, 0, 0), Tuple.make_vector(0, 0, 1));
    const s = new Sphere();
    const xs = s.intersect(r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(-1.0);
    expect(xs[1].t).toEqual(1.0);
});

test('A sphere is behind a ray', () => {
    const r = new CRay(Tuple.make_point(0, 0, 5), Tuple.make_vector(0, 0, 1));
    const s = new Sphere();
    const xs = s.intersect(r);

    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(-6.0);
    expect(xs[1].t).toEqual(-4.0);
});

test('Intersect sets the object on the intersection', () => {
    const r = new CRay(Tuple.make_point(0, 0, -5), Tuple.make_vector(0, 0, 1));
    const s = new Sphere();
    const xs = s.intersect(r);

    expect(xs.length).toEqual(2);
    expect(xs[0].object).toBe(s);
    expect(xs[1].object).toBe(s);
});


describe('Sphere transformations', () => {
    test('A spheres default transformation', () => {
        const s = new Sphere();
        expect(s.transform).toStrictEqual(CMatrix.make_identity(4));
    });

    test('Changing a spheres transformation', () => {
        const s = new Sphere();
        const t = translation(2, 3, 4);
        s.transform = t;
        expect(s.transform).toStrictEqual(t);
    });

    test('Intersecting a scaled sphere with a ray', () => {
        const r = new CRay(Tuple.make_point(0, 0, -5), Tuple.make_vector(0, 0, 1));
        const s = new Sphere();
        s.transform = scaling(2, 2, 2);
        const xs = s.intersect(r);
        expect(xs.length).toEqual(2);
        expect(xs[0].t).toEqual(3);
        expect(xs[1].t).toEqual(7);
    });

    test('Intersecting a translated sphere with a ray', () => {
        const r = new CRay(Tuple.make_point(0, 0, -5), Tuple.make_vector(0, 0, 1));
        const s = new Sphere();
        s.transform = translation(5, 0, 0);
        const xs = s.intersect(r);
        expect(xs.length).toEqual(0);
    });
});

describe('Sphere normals', () => {
    test('The normal on a sphere at a point on the x axis', () => {
        const s = new Sphere();
        const n = s.normal_at(Tuple.make_point(1, 0, 0));
        expect(n).toStrictEqual(Tuple.make_vector(1, 0, 0));
    });

    test('the normal on a sphere at a point on the y axis', () => {
        const s = new Sphere();
        const n = s.normal_at(Tuple.make_point(0, 1, 0));
        expect(n).toStrictEqual(Tuple.make_vector(0, 1, 0));
    });

    test('The normal on a sphere at a point on the z axis', () => {
        const s = new Sphere();
        const n = s.normal_at(Tuple.make_point(0, 0, 1));
        expect(n).toStrictEqual(Tuple.make_vector(0, 0, 1));
    });

    test('The normal on a sphere at a nonaxial point', () => {
        const s = new Sphere();
        const n = s.normal_at(Tuple.make_point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
        expect(n).toStrictEqual(Tuple.make_vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
    });

    test('The normal is a normalized vector', () => {
        const s = new Sphere();
        const n = s.normal_at(Tuple.make_point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
        expect(n).toStrictEqual(n.normalize());
    });

    test('Computing the normal on a translated sphere', () => {
        const s = new Sphere();
        s.transform = translation(0, 1, 0);
        const n = s.normal_at(Tuple.make_point(0, 1.70711, 0.70711));
        const result = Tuple.make_vector(0, 0.70711, 0.70711)
        expect(n.x).toBeCloseTo(result.x, 5);
        expect(n.y).toBeCloseTo(result.y, 5);
        expect(n.z).toBeCloseTo(result.z, 5);
        expect(n.w).toBeCloseTo(result.w, 5);

    });

    test('Computing the normal on a transformed sphere', () => {
        const s = new Sphere();
        s.transform = scaling(1, 0.5, 1).mult(rotation_z(Math.PI / 5));
        const n = s.normal_at(Tuple.make_point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2));
        const result = Tuple.make_vector(0, 0.97014, -0.24254);
        expect(n.x).toBeCloseTo(result.x, 5);
        expect(n.y).toBeCloseTo(result.y, 5);
        expect(n.z).toBeCloseTo(result.z, 5);
        expect(n.w).toBeCloseTo(result.w, 5);
    });
})

describe('Sphere materials', () => {
    test('A sphere has a default material', () => {
        const s = new Sphere();
        const m = s.material;
        expect(m).toStrictEqual(new Material());
    });

    test('A sphere may be assigned a material', () => {
        const s = new Sphere();
        const m = new Material();
        m.ambient = 1;
        s.material = m;
        expect(s.material).toBe(m);
    });
});
