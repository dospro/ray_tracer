import {canvas, canvas_to_ppm, pixel_at, write_pixel} from './canvas';
import {color} from "./tuples";

test('Creating a canvas', () => {
    const c = canvas(10, 20);
    const black = color(0, 0, 0);
    expect(c.width).toBe(10);
    expect(c.height).toBe(20);
    expect(c.data.length).toBe(10);
    for (const col of c.data) {
        expect(col.length).toBe(20);
        for (const cell of col) {
            expect(cell).toStrictEqual(black);
        }
    }
});

test('Writing pixels to a canvas', () => {
    const c = canvas(10, 20);
    const red = color(1, 0, 0);
    write_pixel(c, 2, 3, red);
    expect(pixel_at(c, 2, 3)).toStrictEqual(red);
});

test('Constructing the ppm header', () => {
    const c = canvas(5, 3);
    const ppm = canvas_to_ppm(c);

    const expected = `P3
5 3
255
`;
    expect(ppm.startsWith(expected)).toBe(true);
});
test('Reproduce string bug', () => {
    const a = `0
255
b\n`;
    const b = `0\n${255}\nb\n`;
    expect(a).toEqual(b);
});

test('Constructing the PPM pixel data', () => {
    const c = canvas(5, 3);
    const c1 = color(1.5, 0, 0);
    const c2 = color(0, 0.5, 0);
    const c3 = color(-0.5, 0, 1);
    write_pixel(c, 0, 0, c1);
    write_pixel(c, 2, 1, c2);
    write_pixel(c, 4, 2, c3);
    const ppm = canvas_to_ppm(c);
    const expected = `P3
5 3
255
255 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 128 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 255
`;
    for (let i = 0; i < ppm.length; ++i) {
        if (ppm.charAt(i) !== expected.charAt(i) || ppm.charCodeAt(i) !== expected.charCodeAt(i) || ppm.codePointAt(i) !== expected.codePointAt(i)) {
            console.log(i);
            console.log(`ppm charAt: ${ppm.charAt(i)} charCodeAt ${ppm.charCodeAt(i)}, codePointAt ${ppm.codePointAt(i)}`)
            console.log(`exp charAt: ${expected.charAt(i)} charCodeAt ${expected.charCodeAt(i)}, codePointAt ${expected.codePointAt(i)}`)
        }
    }
    expect(ppm).toEqual(expected);
});
