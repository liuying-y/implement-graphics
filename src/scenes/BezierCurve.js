import BaseScene from '../frameworks/Base/baseB2D';
import GUIAnchor from '../frameworks/Components/GUI.Anchor';
const T = 50;

export class BezierCurve extends BaseScene {
    constructor(canvas) {
        super(canvas);

        this.draw();
    }

    draw() {
        // let c = new GUIAnchor(new BABYLON.Vector2(0, 0), this, true);
        // this.circle = c;

        this.anchors = [
            new GUIAnchor(new BABYLON.Vector2(-150, -50), this, true, 'Purple', 'Yellow', '8px'),
            new GUIAnchor(new BABYLON.Vector2(50, 120), this, true, 'Red', 'White', '8px'),
            new GUIAnchor(new BABYLON.Vector2(-30, 30), this, true,'Purple', 'Yellow', '8px')
        ];

        this.points = [];

        this.line = new BABYLON.GUI.MultiLine();
        this.line.lineWidth = 2;

        this.addControl(this.line);
    }

    update() {
        this.line.reset();

        this.points = [];
        let anchors = [
            this.anchors[0]._position,
            this.anchors[1]._position,
            this.anchors[2]._position,
        ];
        let d1 = anchors[1].subtract(anchors[0]).scale(1 / T);
        let d2 = anchors[2].subtract(anchors[1]).scale(1 / T);
        for (let i = 0; i <= T; ++i) {
            let p1 = anchors[0].add(d1.scale(i));
            let p2 = anchors[1].add(d2.scale(i));

            let p = p1.add(p2.subtract(p1).scale(i / T));

            this.points.push(p);
            this.line.add({x: Math.floor(p.x + window.innerWidth / 2) + 'px', y: Math.floor(p.y + window.innerHeight / 2) + 'px'});
        }

        // this.line.add({x: '50%', y: '0px'}, {x: '100%', y: '100px'});
        
    }

}