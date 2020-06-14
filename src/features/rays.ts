import {CTuple} from "./tuples";
import {CMatrix} from "./matrices";

export class CRay {
    private _origin: CTuple;
    private _direction: CTuple;

    constructor(origin: CTuple, direction: CTuple) {
        this._origin = origin;
        this._direction = direction;
    }

    get origin(): CTuple {
        return this._origin;
    }

    get direction(): CTuple {
        return this._direction;
    }

    public position(t: number): CTuple {
        return this._origin.plus(this._direction.mult(t));
    }

    public transform(m: CMatrix): CRay {
        return new CRay(m.mult_tuple(this._origin), m.mult_tuple(this._direction));
    }
}
