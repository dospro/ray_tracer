import {CColor} from "./tuples";

export class Material {
    public color: CColor;
    public ambient: number;
    public diffuse: number;
    public specular: number;
    public shininess: number;

    constructor() {
        this.color = new CColor(1, 1, 1);
        this.ambient = 0.1;
        this.diffuse = 0.9;
        this.specular = 0.9;
        this.shininess = 200.0;
    }


}
