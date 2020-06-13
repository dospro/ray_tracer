export class CTuple {
    private components: number[];

    constructor(x: number, y: number, z: number, w: number) {
        this.components = [x, y, z, w];
    }

    static from_array(components: number[]): CTuple {
        if (components.length != 4) {
            throw "Only supports 4 components";
        }
        return new CTuple(
            components[0],
            components[1],
            components[2],
            components[3],
        )
    }

    static from_i(t: Tuple): CTuple {
        return new CTuple(t.x, t.y, t.z, t.w);
    }

    to_i(): Tuple {
        return tuple(this.x, this.y, this.z, this.w);
    }

    static make_point(x: number, y: number, z: number) {
        return new CTuple(x, y, z, 1.0);
    }

    static make_vector(x: number, y: number, z: number) {
        return new CTuple(x, y, z, 0.0);
    }

    get x(): number {
        return this.components[0];
    }

    set x(value: number) {
        this.components[0] = value;
    }

    get y(): number {
        return this.components[1];
    }

    set y(value: number) {
        this.components[1] = value;
    }

    get z(): number {
        return this.components[2];
    }

    set z(value: number) {
        this.components[2] = value;
    }

    get w(): number {
        return this.components[3];
    }

    set w(value: number) {
        this.components[3] = value;
    }

    isPoint(): boolean {
        return this.components[3] == 1.0;
    }

    isVector(): boolean {
        return this.components[3] == 0.0;
    }

    public plus(CTuple_operand: CTuple): CTuple {
        return CTuple.from_array(this.components.map(
            (component, idx) => (
                component + CTuple_operand.components[idx]
            )
        ));
    }

    public minus(CTuple_operand: CTuple): CTuple {
        return CTuple.from_array(this.components.map(
            (component, idx) => (
                component - CTuple_operand.components[idx]
            )
        ));
    }

    public neg(): CTuple {
        return CTuple.from_array(this.components.map((c) => -c));
    }

    public mult(scalar: number): CTuple {
        return CTuple.from_array(this.components.map((c) => c * scalar));
    }

    public div(scalar: number): CTuple {
        return CTuple.from_array(this.components.map((c) => c / scalar));
    }

    public magnitude(): number {
        return Math.sqrt(this.components.reduce((acc, n) => acc + n * n, 0));
    }

    public normalize(): CTuple {
        const m = this.magnitude();
        return CTuple.from_array(this.components.map((c) => c / m));
    }

    public dot(other: CTuple): number {
        return this.components.reduce((acc, c, idx) => acc + c * other.components[idx], 0);
    }

    public cross(other: CTuple): CTuple {
        const x = this.y * other.z - this.z * other.y;
        const y = this.z * other.x - this.x * other.z;
        const z = this.x * other.y - this.y * other.x;
        return new CTuple(x, y, z, 0.0);
    }
}

export interface Tuple {
    x: number;
    y: number;
    z: number;
    w: number;
}

export interface Color {
    red: number;
    green: number;
    blue: number;
}

export function tuple(x: number, y: number, z: number, w: number) {
    return {x, y, z, w};
}

export function isPoint(tuple: Tuple) {
    const c = new CTuple(tuple.x, tuple.y, tuple.z, tuple.w);
    return c.isPoint();
}

export function isVector(tuple: Tuple) {
    const c = new CTuple(tuple.x, tuple.y, tuple.z, tuple.w);
    return c.isVector();
}

export function point(x: number, y: number, z: number) {
    return {x, y, z, w: 1.0};
}

export function vector(x: number, y: number, z: number) {
    return {x, y, z, w: 0.0};
}

export function sum(...tuples: Tuple[]): Tuple {
    return tuples
        .reduce((acc: CTuple, n) => acc.plus(CTuple.from_i(n)), new CTuple(0, 0, 0, 0))
        .to_i();
}

export function sub(a: Tuple, b: Tuple): Tuple {
    return CTuple.from_i(a).minus(CTuple.from_i(b)).to_i();
}

export function neg(a: Tuple): Tuple {
    const c = new CTuple(a.x, a.y, a.z, a.w).neg();
    return tuple(c.x, c.y, c.z, c.w);
}

export function mult(a: Tuple, scalar: number): Tuple {
    return tuple(scalar * a.x, scalar * a.y, scalar * a.z, scalar * a.w);
}

export function div(a: Tuple, scalar: number): Tuple {
    return tuple(a.x / scalar, a.y / scalar, a.z / scalar, a.w / scalar);
}

export function magnitude(v: Tuple): number {
    const c = new CTuple(v.x, v.y, v.z, v.w);
    return c.magnitude();
}

export function normalize(v: Tuple): Tuple {
    const c = CTuple.from_i(v).normalize();
    return c.to_i();
}

export function dot(a: Tuple, b: Tuple): number {
    return CTuple.from_i(a).dot(CTuple.from_i(b));
}

export function cross(a: Tuple, b: Tuple): Tuple {
    return CTuple.from_i(a).cross(CTuple.from_i(b)).to_i();
}

export function color(red: number, green: number, blue: number): Color {
    return {red, green, blue};
}

export function sum_color(c1: Color, c2: Color): Color {
    return color(c1.red + c2.red, c1.green + c2.green, c1.blue + c2.blue);
}

export function sub_color(c1: Color, c2: Color): Color {
    return color(c1.red - c2.red, c1.green - c2.green, c1.blue - c2.blue);
}

export function mult_color(c: Color, scalar: number): Color {
    return color(c.red * scalar, c.green * scalar, c.blue * scalar);
}

export function hadamard_product(c1: Color, c2: Color): Color {
    return color(c1.red * c2.red, c1.green * c2.green, c1.blue * c2.blue);
}
