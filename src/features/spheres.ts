import {Ray} from "./rays";
import {dot, point, sub} from "./tuples";

export function sphere() {
    return 0;
}

export function intersects(sphere_object: number, ray_object: Ray) {
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
    return [t1, t2];
}
