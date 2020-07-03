export class Tuple {
    private components: number[];

    constructor(x: number, y: number, z: number, w: number) {
        this.components = [x, y, z, w];
    }

    static from_array(components: number[]): Tuple {
        if (components.length != 4) {
            throw "Only supports 4 components";
        }
        return new Tuple(
            components[0],
            components[1],
            components[2],
            components[3],
        )
    }

    static make_point(x: number, y: number, z: number) {
        return new Tuple(x, y, z, 1.0);
    }

    static make_vector(x: number, y: number, z: number) {
        return new Tuple(x, y, z, 0.0);
    }

    static origin(): Tuple {
        return Tuple.make_point(0, 0, 0);
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

    public plus(CTuple_operand: Tuple): Tuple {
        return Tuple.from_array(this.components.map(
            (component, idx) => (
                component + CTuple_operand.components[idx]
            )
        ));
    }

    public minus(CTuple_operand: Tuple): Tuple {
        return Tuple.from_array(this.components.map(
            (component, idx) => (
                component - CTuple_operand.components[idx]
            )
        ));
    }

    public neg(): Tuple {
        return Tuple.from_array(this.components.map((c) => -c));
    }

    public mult(scalar: number): Tuple {
        return Tuple.from_array(this.components.map((c) => c * scalar));
    }

    public div(scalar: number): Tuple {
        return Tuple.from_array(this.components.map((c) => c / scalar));
    }

    public magnitude(): number {
        return Math.sqrt(this.components.reduce((acc, n) => acc + n * n, 0));
    }

    public normalize(): Tuple {
        const m = this.magnitude();
        return Tuple.from_array(this.components.map((c) => c / m));
    }

    public dot(other: Tuple): number {
        return this.components.reduce((acc, c, idx) => acc + c * other.components[idx], 0);
    }

    public cross(other: Tuple): Tuple {
        const x = this.y * other.z - this.z * other.y;
        const y = this.z * other.x - this.x * other.z;
        const z = this.x * other.y - this.y * other.x;
        return new Tuple(x, y, z, 0.0);
    }

    public reflect(n: Tuple): Tuple {
        return this.minus(n.mult(2 * this.dot(n)));
    }
}

export class CColor {
    private components: number[];

    constructor(red: number, green: number, blue: number) {
        this.components = [red, green, blue];
    }

    static from_array(comp: number[]): CColor {
        return new CColor(comp[0], comp[1], comp[2]);
    }

    get red(): number {
        return this.components[0];
    }

    get green(): number {
        return this.components[1];
    }

    get blue(): number {
        return this.components[2];
    }

    public plus(c: CColor): CColor {
        return CColor.from_array(this.components.map((n, idx) => n + c.components[idx]));
    }

    public minus(c: CColor): CColor {
        return CColor.from_array(this.components.map((n, idx) => n - c.components[idx]));
    }

    public mult(value: number): CColor {
        return CColor.from_array(this.components.map((n) => n * value));
    }

    public hadamard_product(c: CColor): CColor {
        return CColor.from_array(this.components.map((n, idx) => n * c.components[idx]));
    }
}
