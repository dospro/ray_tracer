import {Tuple} from "./tuples";
import {CMatrix} from "./matrices";

export class CRay {
    private _origin: Tuple;
    private _direction: Tuple;

    constructor(origin: Tuple, direction: Tuple) {
        this._origin = origin;
        this._direction = direction;
    }

    get origin(): Tuple {
        return this._origin;
    }

    get direction(): Tuple {
        return this._direction;
    }

    public position(t: number): Tuple {
        return this._origin.plus(this._direction.mult(t));
    }

    public transform(m: CMatrix): CRay {
        return new CRay(m.mult_tuple(this._origin), m.mult_tuple(this._direction));
    }
}
