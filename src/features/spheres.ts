import {Ray, transform} from "./rays";
import {dot, point, sub} from "./tuples";
import {intersection, Intersection} from "./interesctions";
import {identity_matrix, inverse, Matrix} from "./matrices";


export interface Sphere {
    transform: Matrix;
}

export function sphere(): Sphere {
    return {
        'transform': identity_matrix(4)
    };
}

export function intersect(sphere_object: Sphere, ray_object: Ray): Intersection[] {
    const transformed_ray = transform(ray_object, inverse(sphere_object.transform));
    const sphere_to_ray = sub(transformed_ray.origin, point(0, 0, 0));

    const a = dot(transformed_ray.direction, transformed_ray.direction);
    const b = 2 * dot(transformed_ray.direction, sphere_to_ray);
    const c = dot(sphere_to_ray, sphere_to_ray) - 1;

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    }
    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    return [intersection(t1, sphere_object), intersection(t2, sphere_object)];
}

export function f() {

}
