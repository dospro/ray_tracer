import {Ray, transform} from "./rays";
import {CTuple} from "./tuples";
import {intersection, Intersection} from "./interesctions";
import {CMatrix} from "./matrices";


export interface Sphere {
    transform: CMatrix;
}

export function sphere(): Sphere {
    return {
        'transform': CMatrix.make_identity(4)
    };
}

export function intersect(sphere_object: Sphere, ray_object: Ray): Intersection[] {
    const transformed_ray = transform(ray_object, sphere_object.transform.inverse());
    const sphere_to_ray = transformed_ray.origin.minus(CTuple.make_point(0, 0, 0));

    const a = transformed_ray.direction.dot(transformed_ray.direction);
    const b = 2 * transformed_ray.direction.dot(sphere_to_ray);
    const c = sphere_to_ray.dot(sphere_to_ray) - 1;

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    }
    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    return [intersection(t1, sphere_object), intersection(t2, sphere_object)];
}


export class CSphere {
    private _transform: CMatrix;

    constructor() {
        this._transform = CMatrix.make_identity(4);
    }

    get transform(): CMatrix {
        return this._transform;
    }

    set transform(value: CMatrix) {
        this._transform = value;
    }

    // public intersect(ray_object: Ray): Intersection[] {
    //     const transformed_ray = transform(ray_object, this.transform.inverse());
    //     const sphere_to_ray = transformed_ray.origin.minus(CTuple.make_point(0, 0, 0));
    //
    //     const a = transformed_ray.direction.dot(transformed_ray.direction);
    //     const b = 2 * transformed_ray.direction.dot(sphere_to_ray);
    //     const c = sphere_to_ray.dot(sphere_to_ray) - 1;
    //
    //     const discriminant = b * b - 4 * a * c;
    //     if (discriminant < 0) {
    //         return [];
    //     }
    //     const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    //     const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    //     return [intersection(t1, sphere_object), intersection(t2, sphere_object)];
    // }

    public normal_at(point: CTuple): CTuple {
        const object_point = this.transform.inverse().mult_tuple(point);
        const object_normal = object_point.minus(CTuple.make_point(0, 0, 0));
        const world_normal = this.transform.inverse().transpose().mult_tuple(object_normal);
        world_normal.w = 0.0;
        return world_normal.normalize();
    }
}
