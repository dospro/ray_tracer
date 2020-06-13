import * as fs from 'fs';

import {CColor, CTuple} from "./features/tuples";
import {canvas, canvas_to_ppm, write_pixel} from "./features/canvas";
import {intersect, sphere} from "./features/spheres";
import {translation} from "./features/transformations";
import {ray} from "./features/rays";
import {hit} from "./features/interesctions";

interface Projectile {
    position: CTuple;
    velocity: CTuple;
}

interface Environment {
    gravity: CTuple;
    wind: CTuple;
}

function tick(env: Environment, proj: Projectile): Projectile {
    return {
        position: proj.position.plus(proj.velocity),
        velocity: proj.velocity.plus(env.gravity).plus(env.wind),
    };
}

function projectileExample() {
    let p: Projectile = {
        position: CTuple.make_point(0, 1, 0),
        velocity: CTuple.make_vector(1, 1.8, 0).normalize().mult(11.25),
    };

    let e: Environment = {
        gravity: CTuple.make_vector(0, -0.1, 0),
        wind: CTuple.make_vector(-0.01, 0, 0),
    };

    let c = canvas(900, 550);

    while (p.position.y > 0) {
        write_pixel(c, Math.round(p.position.x), Math.round(p.position.y), new CColor(1, 0, 0));
        p = tick(e, p);
    }

    const text = canvas_to_ppm(c);
    fs.writeFile('image.ppm', text, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Done');
    });
}

function circleExample() {
    let c = canvas(800, 800);
    const col = new CColor(1, 0, 0);

    const shape = sphere();
    shape.transform = translation(0, 0, 0);

    const ray_origin = CTuple.make_point(0, 0, -5);
    const wall_z = 10;
    const wall_size = 7.0;

    const pixel_size = wall_size / 800;
    const half = wall_size / 2;

    for (let y = 0; y < 800; y++) {
        const world_y = half - pixel_size * y;
        for (let x = 0; x < 800; x++) {
            const world_x = -half + pixel_size * x;
            const position = CTuple.make_point(world_x, world_y, wall_z);
            const r = ray(ray_origin, position.minus(ray_origin).normalize());
            const xs = intersect(shape, r);

            if (hit(xs)) {
                write_pixel(c, x, y, col);
            }
        }
    }

    const text = canvas_to_ppm(c);
    fs.writeFile('circleExample.ppm', text, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Done');
    });
}

function main() {
    circleExample();
}

main();
