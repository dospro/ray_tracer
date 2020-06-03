import {color, mult, normalize, point, sub, sum, Tuple, vector} from "./features/tuples";
import {rotation_z, translation} from "./features/transformations";
import {matrix_mult, matrix_mult_tuple} from "./features/matrices";
import {intersect, sphere} from "./features/spheres";
import {ray} from "./features/rays";
import {hit} from "./features/interesctions";


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

function projectileExample(canvasElement: any) {
    const context = canvasElement.getContext('2d');
    context.fillStyle = "green";

    let p: Projectile = {
        position: point(0, 1, 0),
        velocity: mult(normalize(vector(2.0, 3.0, 0)), 8),
    };

    let e: Environment = {
        gravity: vector(0, -0.1, 0),
        wind: vector(-0.01, 0, 0),
    };

    while (p.position.y > 0) {
        console.log(p.position.y);
        context.fillRect(Math.round(p.position.x), 600 - Math.round(p.position.y), 5, 5);
        p = tick(e, p);
    }
}

function clockExample(canvasElement: any) {
    const context = canvasElement.getContext('2d');
    const origin = point(0, 0, 0);
    context.fillStyle = "green";
    context.fillRect(Math.round(origin.x), Math.round(origin.y), 5, 5);
    context.fillStyle = "red";
    for (let i = 0; i < 12; i++) {
        const rot = rotation_z(i * 2 * Math.PI / 12);
        const pos = translation(400, 300, 0);
        const twelve = point(0, 1, 0);
        const move = translation(400 * 3 / 8, 400 * 3 / 8, 0);

        // First moves it to a distance from the origin, then rotates it to the hour and finally positions it to the
        // center of the canvas
        const finalPoint = matrix_mult_tuple(pos, matrix_mult_tuple(rot, matrix_mult_tuple(move, twelve)));
        console.log(`(${finalPoint.x}, ${finalPoint.y})`);
        context.fillRect(Math.round(finalPoint.x), Math.round(finalPoint.y), 10, 10);
    }
}

function circleExample(canvasElement: any) {
    const context = canvasElement.getContext('2d');
    const col = color(1, 0, 0);

    const shape = sphere();
    shape.transform = translation(0, 0, 0);

    const ray_origin = point(0, 0, -5);
    const wall_z = 10;
    const wall_size = 7.0;

    const pixel_size = wall_size / 800;
    const half = wall_size / 2;

    for (let y = 0; y < 800; y++) {
        const world_y = half - pixel_size * y;
        for (let x = 0; x < 800; x++) {
            const world_x = -half + pixel_size * x;
            const position = point(world_x, world_y, wall_z);
            const r = ray(ray_origin, normalize(sub(position, ray_origin)));
            const xs = intersect(shape, r);

            if (hit(xs)) {
                context.fillStyle = "red";
                context.fillRect(x, y, 1, 1);
            } else {
                context.fillStyle = "black";
                context.fillRect(x, y, 1, 1);
            }
        }
    }
}

function main(canvasElement: any) {
    //clockExample(canvasElement);
    circleExample(canvasElement);
}

declare global {
    interface Window {
        main: any;
    }
}

window.main = main;
