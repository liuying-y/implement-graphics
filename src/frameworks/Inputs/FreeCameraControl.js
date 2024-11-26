/**
 * Class FreeCameraControl
*/

/**
 * 前进: ( space ) ( mouse ) 
 * 后退: ( shift + space ) ( shift + mouse ) 
 * 平移: ( ctrl + keys )
 * 旋转: ( keys)
 * 
 * keys: 
 *      up down right left
 *      
*/

import InputMapping from '../Config/InputMaping.json';

export default class FreeCameraControl {
    constructor(config) {
        // super(config.camera);
        this.camera = config.camera;
        this.canvas = config.canvas;
        this.bScene = config.bScene;

        this.keyState = {
            space: 0,
            shift: 0,
            ctrl: 0,
            alt: 0,
            mouse: 0,
            up: 0,
            down: 0,
            right: 0,
            left: 0
        };

        this.activeState = {
            ward: 0, // 1 前进 -1 后退 0 原地
            vertical: 0, // 1 up, -1 
            horizontal: 0, // 1 right
            mode: 0 // 0 旋转 1 平移 
        };

        this.precision_base = {
            translate: 0.02,
            rotate: 0.01
        };

        this.precision = {
            translate: 1,
            rotate: 1
        };

        this.canvas.addEventListener('pointerdown', this.keyDown.bind(this), false);
        this.canvas.addEventListener('keydown', this.keyDown.bind(this), false);

        this.canvas.addEventListener('pointerup', this.keyUp.bind(this), false);
        this.canvas.addEventListener('keyup', this.keyUp.bind(this), false);

        this.bScene.addBeforeRender(this.update.bind(this));
    }

    getClassName() {
        return 'FreeCameraControl';
    }

    getSimpleName() {
        return 'CameraControl';
    }

    update() {
        // 前进后退
        let direction = this.camera.getForwardRay().direction;
        let transscale = this.precision_base.translate * this.precision.translate;
        let rotatescale = this.precision_base.rotate * this.precision.rotate;
        
        let deltatrans = BABYLON.Vector3.Zero();
        if (this.activeState.ward != 0) {
            // let ward = direction;
            // let cc = ward.scale(this.precision_base.translate).scale(this.precision.translate).scale(this.activeState.ward);
            // this.camera.position.addInPlace(ward.scale(this.activeState.ward * transscale));
            deltatrans.addInPlace(direction.scale(this.activeState.ward));
        }
        let up = this.camera.upVector.clone();
        let right = BABYLON.Vector3.Cross(direction, up).scale(-1);

        // 平移旋转
        if (this.activeState.horizontal || this.activeState.vertical) {
            if (this.activeState.mode) {
                // console.log('move');
                // 平移
                
                // let delta = up.scale(this.activeState.vertical).add(right.scale(this.activeState.horizontal)).normalize().scale(transscale);
                // this.camera.position.addInPlace(delta);
                deltatrans.addInPlace(up.scale(this.activeState.vertical).add(right.scale(this.activeState.horizontal)));
            } else { 
                // let axis = up.scale(this.activeState.vertical).add(right.scale(this.activeState.horizontal));
                // let matrix = this.camera.getViewMatrix();
                // BABYLON.Matrix.RotationAxisToRef( axis,  rotatescale, matrix);
                this.camera.rotation.x -= this.activeState.vertical * rotatescale;
                this.camera.rotation.y += this.activeState.horizontal * rotatescale;
                
                this.camera.rotation.x = this.camera.rotation.x % (Math.PI * 2);
                this.camera.rotation.y = this.camera.rotation.y % (Math.PI * 2);
            }
        }


        this.camera.position.addInPlace(deltatrans.normalize().scale(transscale));
    }

    keyDown(e) {
        this.updateInput(e);
    }

    keyUp(e) {
        this.updateInput(e);
    }

    updateInput(e) {
        // console.log(e);
        let type = e.type;
        let action = 0;
        if (/up/.test(type)) {
            action = 0;
        } else if (/down/.test(type)) {
            action = 1;
        }
        let key = 'idle';
        // 输入类型
        if (/pointer/.test(type)) {
            if (/mouse/.test(e.pointerType)) {
                // console.log('mouse');
                key = 'mouse';
            } else {
                console.log('开发者工具，需要键鼠支持！');
            }
        } else if (/key/.test(type)) {
            if (InputMapping[e.code]) {
                key = InputMapping[e.code];
            }
        }

        this.keyState[key] = action;
        // console.log(key, action, e);

        this.updateActiveState();
    }

     updateActiveState() {

        // 向前或向后
        if (this.keyState.mouse || this.keyState.space) {
            if (this.keyState.shift) {
                this.activeState.ward = -1;
            } else {
                this.activeState.ward = 1;
            }
        } else {
            this.activeState.ward = 0;
        }

        // 平移或旋转
        this.activeState.mode = this.keyState.alt;
        // console.log(this.activeState.mode);

        // 方向
        this.activeState.vertical = this.keyState.up - this.keyState.down;
        this.activeState.horizontal = this.keyState.right - this.keyState.left;
    }

}

FreeCameraControl.states = {
    TRANS_L: 'trans_left',
    TRANS_R: 'trans_right',
    TRANS_U: 'trans_up',
    TRANS_D: 'trans_down',
    TRANS_F: 'trans_forward',
    TRANS_B: 'trans_backward',
    ROTAT_L: 'rotat_left',
    ROTAT_R: 'rotat_right',
    ROTAT_U: 'rotat_up',
    ROTAT_D: 'rotat_down'
};