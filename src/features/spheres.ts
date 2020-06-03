import {Ray} from "./rays";
import {dot, point, sub} from "./tuples";
import {intersection, Intersection} from "./interesctions";

export function sphere() {
    return 0;
}

export function intersect(sphere_object: number, ray_object: Ray): Intersection[] {
    const sphere_to_ray = sub(ray_object.origin, point(0, 0, 0));

    const a = dot(ray_object.direction, ray_object.direction);
    const b = 2 * dot(ray_object.direction, sphere_to_ray);
    const c = dot(sphere_to_ray, sphere_to_ray) - 1;

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    }
    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    return [intersection(t1, sphere_object), intersection(t2, sphere_object)];
}
