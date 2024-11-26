import BaseScene from './base';
import * as GUI from 'babylonjs-gui';
BABYLON.GUI = GUI;

class BabylonScene2D extends BaseScene {
    constructor(canvas) {
        super(canvas);
        this.guiCanvas = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('canvas', true, this.scene, );
    }

    addControl(element) {
        this.guiCanvas.addControl(element);
    }
}

export default BabylonScene2D;