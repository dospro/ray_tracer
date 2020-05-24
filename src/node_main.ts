import * as fs from 'fs';

import {color, mult, normalize, point, sum, Tuple, vector} from "./features/tuples";
import {canvas, canvas_to_ppm, write_pixel} from "./features/canvas";

interface Projectile {
    position: Tuple;
    velocity: Tuple;
}

interface Environment {
    gravity: Tuple;
    wind: Tuple;
}

function tick(env: Environment, proj: Projectile): Projectile {
    return {
        position: sum(proj.position, proj.velocity),
        velocity: sum(proj.velocity, env.gravity, env.wind)
    };
}

function main() {
    let p: Projectile = {
        position: point(0, 1, 0),
        velocity: mult(normalize(vector(1, 1.8, 0)), 11.25),
    };

    let e: Environment = {
        gravity: vector(0, -0.1, 0),
        wind: vector(-0.01, 0, 0),
    };

    let c = canvas(900, 550);

    while (p.position.y > 0) {
        write_pixel(c, Math.round(p.position.x), Math.round(p.position.y), color(1, 0, 0));
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

main();
