import {color, mult, normalize, point, sum, Tuple, vector} from "./features/tuples";


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

function main(canvasElement: any) {

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
declare global {
    interface Window { main: any; }
}

window.main = main;
