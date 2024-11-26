import BaseScene from '../frameworks/Base/base';

export class RGBCube extends BaseScene {
    constructor(canvas) {
        super(canvas);

        // this.availableTesting();

        this.drawPlane();

    }

    drawPlane() {

        let material = new BABYLON.ShaderMaterial('rgbcube', this.scene, '/assets/shader/rgbcube/rgbcube', {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'scaling']
        });
        
        let tri = new BABYLON.Mesh('cube', this.scene);
        let vertexData = new BABYLON.VertexData();

        let points = [];
        let indices = [];

        let number = 20;
        let scaler = 0.5;
        let scaler2 = 1.2;

        let ttps = [
            new BABYLON.Vector3(0, 0, 1.633),
            new BABYLON.Vector3(0, -1.1547, 0),
            new BABYLON.Vector3(1, 0.577, 0),
            new BABYLON.Vector3(-1, 0.577, 0),
        ];

        for (let i = 0; i < number; ++i) {
            let ib = i ;
            for (let j = 0; j < number; ++j) {
                let jb = (ib ) * number + j;
                for (let k = 0; k < number; ++k) {
                    let kb = ((jb ) * number + k) * 4;
                    for (let l = 0; l < ttps.length; ++l) {
                        points.push(i + ttps[l].x * scaler + this.getRand(scaler2));
                        points.push(j + ttps[l].y * scaler + this.getRand(scaler2));
                        points.push(k + ttps[l].z * scaler + this.getRand(scaler2));
                    }

                    indices.push(
                        kb, kb + 1, kb + 2, 
                        kb, kb + 2, kb + 3, 
                        kb, kb + 3, kb + 1, 
                        kb + 1, kb + 3, kb + 2);
                }
            }
        }

        // for (let i = 0; i < points.length / 3; ++i) {
        //     indices.push(i);
        // }

        vertexData.positions = points;
        vertexData.indices = indices;

        vertexData.applyToMesh(tri);

        tri.material = material;
        tri.position.set(number * -0.5, number * -0.5, number * -0.5);
        tri.scaling.set(number, number, number);

        material.setFloat('scaling', 1 / number);

        // let mesh = BABYLON.MeshBuilder.CreatePlane('plane', { size: 1 });
        // mesh.rotation.set(Math.PI / 2, 0, 0);
        // mesh.material = material;

    }

    getRand(scale) {
        return (Math.random() - 0.5) * scale;
    }
}
