import {CColor, Tuple} from "./tuples";

export class Light {
    private _position: Tuple;
    private _intensity: CColor;

    constructor(position: Tuple, intensity: CColor) {
        this._position = position;
        this._intensity = intensity;
    }

    get position(): Tuple {
        return this._position;
    }

    get intensity(): CColor {
        return this._intensity;
    }
}
