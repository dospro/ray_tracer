import {CColor, Tuple} from "./tuples";
import {Light} from "./lights";

describe('Test lights', () => {
    test('A point light has a position and intensity', () => {

        const intensity = new CColor(1, 1, 1);
        const position = Tuple.make_point(0, 0, 0);

        const light = new Light(position, intensity);
        expect(light.position).toStrictEqual(position);
        expect(light.intensity).toStrictEqual(intensity);
    });
});
