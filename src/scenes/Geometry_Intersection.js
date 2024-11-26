import BaseScene from '../frameworks/Base/baseB2D';
import Math2D from '../frameworks/utils/Math2D';

export class Geometry_Intersection extends BaseScene {
    constructor(canvas) {
        super(canvas);

        // this.availableTesting();
        this.draw();


    }

    draw() {

        let circleConfig_Base = {
            x: -300,
            y: 0,
            radius: 300
        };
        this.circle1 = circleConfig_Base;

        let circleConfig_Rand= {
            x: 300,
            y: 0,
            radius: 100
        };
        this.circle2 = circleConfig_Rand;

        this.smalls = [{
            x: circleConfig_Base.x,
            y: circleConfig_Base.y
        }, {
            x: circleConfig_Base.x,
            y: circleConfig_Base.y
        }];


        let baseCircle = new BABYLON.GUI.Ellipse();
        baseCircle.width = baseCircle.height = circleConfig_Base.radius * 2 + 'px';
        baseCircle.color = 'White';
        baseCircle.left = circleConfig_Base.x;
        baseCircle.top = circleConfig_Base.y;
        this.addControl(baseCircle);

        this.baseCircle = baseCircle;

        let randCircle = new BABYLON.GUI.Ellipse();
        this.randCircle = randCircle;
        this.randCircle.color = 'Yellow';
        this.addControl(randCircle);

        this.intersection = [];

        for (let i = 0; i < 2; ++i) {
            let point = new BABYLON.GUI.Ellipse();
            point.width = point.height = '6px';
            point.color = 'Red';
            point.background = 'Red';
            this.intersection[i] = point;
            this.addControl(point);
        }
        this.scene.onPointerObservable.add(this.beginCheck.bind(this), BABYLON.PointerEventTypes.POINTERDOWN);
        
    }

    update() {
        // this.check();
        // console.log(this.circle2.x, this.circle2.y);
        this.randCircle.width = this.randCircle.height = (this.circle2.radius * 2) + 'px';
        this.randCircle.left = this.circle2.x;
        this.randCircle.top = this.circle2.y;

        for(let i = 0; i < 2; ++i) {
            this.intersection[i].left = this.smalls[i].x;
            this.intersection[i].top = this.smalls[i].y;
        }
        
    }
    
    beginCheck(e) {
        this.checkOb = this.scene.onPointerObservable.add(this.check.bind(this), BABYLON.PointerEventTypes.POINTERMOVE);
        this.echeckOb = this.scene.onPointerObservable.add(this.endCheck.bind(this), BABYLON.PointerEventTypes.POINTERUP);
        this.randCircle.color = 'Red';
        this.check(e);

    }

    check(e) {
        if (! e) {
            return;
        }
        // console.log(e.event.clientX, e.event.clientY);

        let pointerX = e.event.clientX - window.innerWidth / 2;
        let pointerY = e.event.clientY - window.innerHeight / 2;

        this.circle2.x = pointerX;
        this.circle2.y = pointerY;

        let x1 = this.circle1.x;
        let y1 = this.circle1.y;
        let r1 = this.circle1.radius;

        let x2 = this.circle2.x;
        let y2 = this.circle2.y;
        let r2 = this.circle2.radius;

        let d2 = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
        let d = Math.sqrt(d2);

        if (d < r1 + r2 && d > r1 - r2 && d > r2 - r1) {

            let th = Math.acos(-(r2 * r2 - r1 * r1 - d2) / 2 / r1 / d);
            console.log(th);

            let th0 = Math2D.Circle_GetAngle(x2 - x1, y2 - y1);

            this.smalls[0] = Math2D.Circle_GetPosition(th0 + th, r1, x1, y1);
            this.smalls[1] = Math2D.Circle_GetPosition(th0 - th, r1, x1, y1);
            // this.smalls[0] = Math2D.Circle_GetPosition(th0, r1, x1, y1);
            // this.smalls[1] = Math2D.Circle_GetPosition(th0, r1, x1, y1);
            this.randCircle.color = 'Green';
        } else {

            this.smalls[0] = {x: x1, y : y1};
            this.smalls[1] = {x: x1, y : y1};
            this.randCircle.color = 'Red';
            
        }



    }

    endCheck(e) {
        this.scene.onPointerObservable.remove(this.checkOb);
        this.scene.onPointerObservable.remove(this.echeckOb);
        this.checkOb = null;
        this.echeckOb = null;
        this.randCircle.color = 'Yellow';
    }

}
