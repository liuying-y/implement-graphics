import Main from './Main';
import * as THREE from '../../libs/threejs/three';
global.THREE = THREE;

class ThreeScene {
    constructor(canvas) {
        let _self = this;
        
        _self.renderingCanvas = canvas;

        let scene = new THREE.Scene();
        _self.scene = scene;

        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        _self.camera = camera;
        camera.lookAt(0, 0, 0);
        camera.position.set(0, 0, 100);

        var renderer = new THREE.WebGLRenderer({canvas: canvas});
        _self.renderer = renderer;


        _self.main = new Main(_self);
        this.render();
    }

    render () {
        this.update();
        this.beforRender();
        this.renderer.render(this.scene, this.camera);
        this.afterRender();
        requestAnimationFrame(this.render.bind(this));
    }

    beforRender () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

    }

    update () {}

    afterRender() {}
}
export default ThreeScene;