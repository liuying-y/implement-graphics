import BaseScene from '../frameworks/Base/base';

export class TriangleScene extends BaseScene {
    constructor(canvas) {
        super(canvas);

        // this.availableTesting();

        this.drawPlane();

    }

    drawPlane() {
        let mesh = BABYLON.MeshBuilder.CreatePlane('plane', {size: 50});
        mesh.rotation.set( Math.PI / 2, 0, 0);

        let material = new BABYLON.ShaderMaterial('triangle', this.scene, '/assets/shader/triangle/triangle', {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'points', 'pointsNumber']
        })

        let points = [
            0.1, 0.1,
            0.5, 0.1,
            0.1, 0.5
        ];

        for(let i = 0; i < points.length; ++i) {
            material.setFloats('points', points);
        }

        material.setInt('pointsNumber', points.length / 2);
        
        mesh.material = material;


    }
}
