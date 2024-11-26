
class GUIAnchor {
    /**
     * 
     * @param {BABYLON.Vector2} position
     * @param {*} bScene
     * @param {bool} interactive
     * @param {string } color1
     * @param {string } color2
     */
    constructor(position, bScene, interactive, color1, color2, size) {
        this._position = position || new BABYLON.Vector2(GUIAnchor.DefaultConfig.defaultPosition.x, GUIAnchor.DefaultConfig.defaultPosition.y);
        this._interactive = interactive == true;
        this._isActive = true;
        this._isPointerIn = false;
        this._size = size || '6px';
        

        this._scene = bScene || window.b;

        let gui = new BABYLON.GUI.Ellipse();
        gui.width = gui.height = this._size;
        gui.top = this._position.y;
        gui.left = this._position.x;
        this._scene.addControl(gui);
        this._gui = gui;

        if (this._interactive) {
            this._activeColor = color1 || GUIAnchor.DefaultConfig.defaultActiveColor;
            this._inactiveColor = color2 || GUIAnchor.DefaultConfig.defaultInactiveColor;

            this.free();
            this._gui.onPointerEnterObservable.add(this.inGui.bind(this));
            this._gui.onPointerOutObservable.add(this.outGui.bind(this));

        } else {
            this._normalColor = color1 || GUIAnchor.DefaultConfig.defaultNormalColor;
            gui.color = this._normalColor;
        }

    }

    free() {
        if (this._interactive && (!this._isPointerIn) && this._isActive) {
            this._gui.color = this._inactiveColor;
            this._gui.background = null;
            this._isActive = false;

            // this._gui.onPointerDownObservable.remove(this.dragStart);
            this._scene.scene.onPointerObservable.remove(this.dragStart);
            this.dragStart = null;

            this._scene.scene.onPointerObservable.remove(this.setFree);

            this.setActive = this._scene.scene.onPointerObservable.add(this.focus.bind(this), BABYLON.PointerEventTypes.POINTERDOWN);
        }
    }

    focus() {
        if (!this._isActive && this._isPointerIn) {
            this._gui.color = this._gui.background = this._activeColor;
            this._isActive = true;

            this._scene.scene.onPointerObservable.remove(this.setActive);
            this.setActive = null;

            this.setFree = this._scene.scene.onPointerObservable.add(this.free.bind(this), BABYLON.PointerEventTypes.POINTERDOWN);
            this.dragStart = this._scene.scene.onPointerObservable.add(this.start.bind(this), BABYLON.PointerEventTypes.POINTERDOWN);
            // this.dragStart = this._gui.onPointerDownObservable.add(this.start.bind(this));
        }
    }

    inGui () {
        this._isPointerIn = true;
        this._gui.background = this._gui.color;
        console.log('in');
    }

    outGui (e) {
        this._isPointerIn = false;
        if (!this._isActive) {
            this._gui.background = null;
        }
        console.log('out');
    }

    start(e) {
        if (!this._isActive) {
            return;
        } 

        if (!this._isPointerIn) {
            return;
        }
        // this.moveObserve = this._gui.onPointerMoveObservable.add(this.move.bind(this));
        this.moveObserve = this._scene.scene.onPointerObservable.add(this.move.bind(this), BABYLON.PointerEventTypes.POINTERMOVE);
        this.upObserve = this._scene.scene.onPointerObservable.add(this.end.bind(this), BABYLON.PointerEventTypes.POINTERUP);
        // this.upObserve = this._gui.onPointerUpObservable.add(this.end.bind(this));
        // this._lastPointer = {x: e.x, y: e.y};
        this._lastPointer = {x: e.event.clientX, y: e.event.clientY};

        // this._gui.onPointerDownObservable.remove(this.dragStart);
        this._scene.scene.onPointerObservable.remove(this.dragStart);
        // this.dragStart.dispose();
        this.dragStart = null;
        // console.log('start')
    }

    move(e) {
        if (!this._isActive) {
            return;
        }

        // let pointer = {x: e.x, y: e.y};
        let pointer = {x: e.event.clientX, y: e.event.clientY};

        this._position = new BABYLON.Vector2(this._position.x + pointer.x - this._lastPointer.x, this._position.y + pointer.y - this._lastPointer.y);

        this._gui.top = this._position.y;
        this._gui.left = this._position.x;
        this._lastPointer = pointer;
        // console.log('move', this._position.x, this._position.y);
    }

    end() {
        if (!this._isActive) {
            return;
        }
        // this._gui.onPointerUpObservable.remove(this.upObserve);
        // this._gui.onPointerMoveObservable.remove(this.moveObserve);
        this._scene.scene.onPointerObservable.remove(this.upObserve);
        this._scene.scene.onPointerObservable.remove(this.moveObserve);

        // this.moveObserve.dispose();
        // this.upObserve.dispose();
        // this._lastPointer.dispose();
        this.moveObserve = null;
        this.upObserve = null;
        this._lastPointer = null;

        // this.dragStart = this._gui.onPointerDownObservable.add(this.start.bind(this));
        this.dragStart = this._scene.scene.onPointerObservable.add(this.start.bind(this), BABYLON.PointerEventTypes.POINTERDOWN);
        // console.log('end');
    }

}

GUIAnchor.DefaultConfig = {
    defaultPosition : {x: 0, y: 0},
    defaultNormalColor : 'White',
    defaultActiveColor : 'Yellow',
    defaultInactiveColor: 'Grey'
};

GUIAnchor.state = {
    DRAG_START: 'start',
    DRAG_MOVE: 'move',
    DRAG_END: 'end'
};

module.exports = GUIAnchor;