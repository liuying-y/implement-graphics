import BaseScene from '../frameworks/Base/base';

export class FractalScene extends BaseScene {
    constructor(canvas) {
        super(canvas);

        // this.availableTesting();

        this.drawPlane();

    }

    drawPlane() {
        let mesh = BABYLON.MeshBuilder.CreatePlane('plane', {size: 50});
        mesh.rotation.set( Math.PI / 2, 0, 0);

        let material = new BABYLON.ShaderMaterial('fractal', this.scene, '/assets/shader/fractal/fractal', {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'iteration', 'cc', 'angle']
        })

        let number = 1000;
        let v2 = new BABYLON.Vector2(1, 0);
        this.angle = 0;


        material.setFloat('iteration', number);
        material.setVector2('cc', v2);
        
        mesh.material = material;

        this.material = material;


        this.scene.registerBeforeRender(this.setParam.bind(this));


    }

    setParam() {
        this.angle += 0.01;

        this.material.setVector2('cc', new BABYLON.Vector2(Math.cos(this.angle), Math.sin(this.angle)));

    }
}
