import {CColor} from "./tuples";
import {Material} from "./materials";

describe('Test materials', () => {
    test('The default material', () => {
        const m = new Material();
        expect(m.color).toStrictEqual(new CColor(1, 1, 1));
        expect(m.ambient).toEqual(0.1);
        expect(m.diffuse).toEqual(0.9);
        expect(m.specular).toEqual(0.9);
        expect(m.shininess).toEqual(200.0);
    });
});
