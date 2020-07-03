import {CRay} from "./rays";
import {Tuple} from "./tuples";
import {intersection, Intersection} from "./interesctions";
import {CMatrix} from "./matrices";
import {Material} from "./materials";

export class Sphere {
    public material: Material;
    private _transform: CMatrix;

    constructor() {
        this._transform = CMatrix.make_identity(4);
        this.material = new Material();
    }

    get transform(): CMatrix {
        return this._transform;
    }

    set transform(value: CMatrix) {
        this._transform = value;
    }

    public intersect(ray_object: CRay): Intersection[] {
        const transformed_ray = ray_object.transform(this.transform.inverse());
        const sphere_to_ray = transformed_ray.origin.minus(Tuple.make_point(0, 0, 0));

        const a = transformed_ray.direction.dot(transformed_ray.direction);
        const b = 2 * transformed_ray.direction.dot(sphere_to_ray);
        const c = sphere_to_ray.dot(sphere_to_ray) - 1;

        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return [];
        }
        const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
        return [intersection(t1, this), intersection(t2, this)];
    }

    public normal_at(point: Tuple): Tuple {
        const object_point = this.transform.inverse().mult_tuple(point);
        const object_normal = object_point.minus(Tuple.make_point(0, 0, 0));
        const world_normal = this.transform.inverse().transpose().mult_tuple(object_normal);
        world_normal.w = 0.0;
        return world_normal.normalize();
    }
}
