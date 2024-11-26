import BaseScene from '../frameworks/Base/base';

export class FresnelScene extends BaseScene {
    constructor(canvas) {
        super(canvas);

        // this.availableTesting();

        this.drawPlane();

    }

    drawPlane() {
        let mesh = BABYLON.MeshBuilder.CreateIcoSphere('plane', {});
        mesh.scaling.set(34, 34, 34);
        // mesh.rotation.set( Math.PI / 2, 0, 0);

        let material = new BABYLON.ShaderMaterial('fresnel', this.scene, '/assets/shader/fresnel/fresnel', {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'eyeposition', "power", "bias", "fromValue", "toValue"] 
        })

        material.setFloat("power",0.5);
        // material.setFloat("bias", 0.5);
        // material.setFloat("fromValue", 0.2);


        mesh.material = material;

        this.material = material;



        this.scene.registerBeforeRender(this.setParam.bind(this));


    }

    setParam() {

        this.material.setVector3("eyeposition", this.scene.cameras[0].globalPosition);

    }
}
