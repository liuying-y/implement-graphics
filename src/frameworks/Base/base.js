import Main from './Main';
import BABYLON from 'babylonjs';
global.BABYLON = BABYLON;
class BabylonScene {
    constructor(canvas) {
        let _self = this;
        global.main = _self;

        _self.renderingCanvas = canvas;
        _self.engine = new BABYLON.Engine(canvas, true);

        let scene = new BABYLON.Scene(_self.engine);
        _self.scene = scene;
        _self.scene.clearColor = BABYLON.Color3.Black();
        // let scene = this.scene;

        let actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager = actionManager;
        actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnEveryFrameTrigger, this.beforeRender.bind(this)));

        _self.camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 5, new BABYLON.Vector3(0, 0, 0), _self.scene);
        _self.camera.attachControl(canvas, true);
        _self.camera.radius = 150;
        _self.camera.lowerRadiusLimit =3;
        _self.camera.alpha = 0.36;
        _self.camera.beta = 1.305;


        let light1 = new BABYLON.HemisphericLight('lightup', BABYLON.Vector3.Up(), scene)
        light1.intensity = 1;
        light1.specular.set(0, 0, 0);
        let light2 = new BABYLON.HemisphericLight('lightdown', new BABYLON.Vector3(0, -1, 0), scene)
        light2.intensity = 0.5;
        light2.specular.set(0, 0, 0);

        // let pointLight = new BABYLON.PointLight('point', new BABYLON.Vector3(0, 0, 0), scene);
        // pointLight.intensity = 1.5;
        // pointLight.specular.set(0, 0, 0);

        this.main = new Main(_self);

        window.addEventListener('resize', _self.resize.bind(_self));
        _self.beforeRenderList = [];

        

        _self.engine.runRenderLoop(_self.render.bind(_self));

    }

    resize() {
        this.engine.resize();
    }

    render() {
        let _self = this;
        _self.engine.beginFrame();

        _self.main.update();
        _self.update();
        // _self.camera.computeWorldMatrix();
        _self.beforeRender();
        _self.camera.update();
        _self.scene.render();
        _self.engine.endFrame();
    }

    beforeRender(e) {
        let _self = this;
        if (_self.beforeRenderList.length) {
            for (let i = 0; i < _self.beforeRenderList.length; ++i) {
                if (typeof _self.beforeRenderList[i] == 'function') {
                    _self.beforeRenderList[i]();
                } else {
                    console.log(`${_self.beforeRenderList[i].toString()} is not a funciton.`);
                }
            }
        }
    }
    
    update() {}

    addBeforeRender(fun) {
        if ( typeof fun == 'function' ) {
            this.beforeRenderList.push(fun);
        } else {
            console.log(`${fun} is not a function!`);
        }
    }

    availableTesting() {

        let poses = [
            BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(50, 0, 0),
            new BABYLON.Vector3(0, 50, 0)
        ];

        for (let i = 0; i < poses.length;++i) {
            let mesh = BABYLON.MeshBuilder.CreateSphere('testing', {}, this.scene);
            mesh.material = new BABYLON.StandardMaterial('tesing', this.scene);
            mesh.scaling.set(10, 10, 10);
            mesh.position = poses[i];
        }
        

    }

    // 开启物理引擎
    enablePhysicsEngine(gravity, pEngine) {
        this.scene.enablePhysics(gravity || new BABYLON.Vector3(0, -9.8, 0), pEngine || new BABYLON.OimoJSPlugin());
    }

    // 导入资源
    importAsync() {
        BABYLON.SceneLoader.AppendAsync(...arguments);
    }

    // 导入资源
    importSync() {
        BABYLON.SceneLoader.Append(...arguments);
    }

    //
    getMesh(name) {
        return this.scene.getMeshByName(name);
    }

    // 设置光强
    setLight(number) {
        this.scene.getLightByName('lightup').intensity = number;
        this.scene.getLightByName('lightdown').intensity = number * 0.5;
    }


}
export default BabylonScene;
