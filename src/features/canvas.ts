import {color, Color} from "./tuples";


interface Canvas {
    width: number;
    height: number;
    data: Array<Array<Color>>;

}

export function canvas(width: number, height: number): Canvas {
    const data = Array(width);
    for (let i = 0; i < width; ++i) {
        data[i] = Array(height);
        const c = color(0, 0, 0);
        data[i].fill(c);
    }
    return {width, height, data};
}

export function write_pixel(c: Canvas, x: number, y: number, color: Color) {
    c.data[x][y] = color;
}

export function pixel_at(c: Canvas, x: number, y: number): Color {
    return c.data[x][y];
}

function clamp_color(pixel: number): number {
    const value = Math.round(255 * pixel);
    return Math.max(0, Math.min(value, 255));
}

export function canvas_to_ppm(c: Canvas): string {
    let result = `P3
${c.width} ${c.height}
255\n`;
    for (let y = 0; y < c.height; ++y) {
        let row = ``;
        for (let x = 0; x < c.width; ++x) {
            row += `${clamp_color(c.data[x][y].red)} `;
            row += `${clamp_color(c.data[x][y].green)} `;
            row += `${clamp_color(c.data[x][y].blue)} `;
        }
        result += `${row.trim()}\n`;
    }
    return result;
}
