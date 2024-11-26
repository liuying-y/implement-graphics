import QuaternionUtils from './../utils/QuaternionUtils';

class CameraUniversal {
    constructor (bScene, mesh) {
        this.active = false;
        this.root = bScene;
        this.mesh = mesh;
        bScene.scene.onPointerObservable.add(this.toggle.bind(this), BABYLON.PointerEventTypes.POINTERDOWN | BABYLON.PointerEventTypes.POINTERUP);
    }

    toggle(data, state) {
        let bScene = this.root;
        if (state.mask === BABYLON.PointerEventTypes.POINTERDOWN && !this.active) {
            this.active = true;
            // this.moveObserve = bScene.scene.onPointerObservable.add(this.rotate.bind(this), BABYLON.PointerEventTypes.POINTERMOVE);
            this.interval = setInterval(()=> {
                this.rotate({x:this.root.scene.pointerX, y: this.root.scene.pointerY});
            }, 50);
            this.lastPosition = this.getScenePosition(state.lastReturnValue.event.x, state.lastReturnValue.event.y); 
            this.lastScenePosition = new BABYLON.Vector2(state.lastReturnValue.event.x, state.lastReturnValue.event.y);
        } else if (state.mask === BABYLON.PointerEventTypes.POINTERUP && this.active) {
            this.active = false;
            // bScene.scene.onPointerObservable.remove(this.moveObserve);
            clearInterval(this.interval);
        }
    }

    rotate(state) {
        let currentScenePosition  = new BABYLON.Vector2(state.x, state.y);
        let currentPosition = this.getScenePosition(state.x, state.y);
        let del = currentPosition.subtract(this.lastPosition);  
        let dir = this.root.camera.getForwardRay().direction;
        let axis = BABYLON.Vector3.Cross(del, dir).normalize();
        let th = currentScenePosition.subtract(this.lastScenePosition).length() / window.innerWidth * Math.PI;
        let sin = Math.sin(th / 2);
        let cos = Math.cos(th / 2);
        let qu = new BABYLON.Quaternion(axis.x * sin, axis.y * sin, axis.z * sin, cos);
        // let quater = QuaternionUtils.transVectorByQuaternion(this.mesh.rotation, qu);
        // this.mesh.rotation = quater;
        console.log(qu);
        
        this.mesh.rotationQuaternion = QuaternionUtils.transQuatByQuaternion(this.mesh.rotationQuaternion, qu);
        this.lastPosition = currentPosition;
        this.lastScenePosition = currentScenePosition;
    }

    getScenePosition(x, y) {
        let ray = this.root.scene.createPickingRay(x , y );
        return ray.origin.add(ray.direction.scale(this.root.camera.radius));
        // return ray.origin.add(ray.direction.scale(this.root.camera.radius)).normalize();
    }
 }
 export default CameraUniversal;