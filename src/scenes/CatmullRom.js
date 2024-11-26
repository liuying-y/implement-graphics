import BaseScene from '../frameworks/Base/baseB2D';
import GUIAnchor from '../frameworks/Components/GUI.Anchor';
const T = 50;

export class CatmullRom extends BaseScene {
    constructor(canvas) {
        super(canvas);

        this.draw();
    }

    draw() {
        // let c = new GUIAnchor(new BABYLON.Vector2(0, 0), this, true);
        // this.circle = c;

        this.anchors = [
            new GUIAnchor(new BABYLON.Vector2(-129.35, -189.74), this, true, 'Red', 'White', '8px'),
            new GUIAnchor(new BABYLON.Vector2(-80.55, 126.09), this, true, 'Red', 'White', '8px'),
            new GUIAnchor(new BABYLON.Vector2(40.9, 132.445), this, true, 'Red', 'White', '8px'),
            new GUIAnchor(new BABYLON.Vector2(113.148, -177), this, true, 'Red', 'White', '8px')
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
            this.anchors[3]._position
        ];
        
        let p0 = anchors[1];
        let p01 = anchors[2].subtract(anchors[0]).scale(0.5);
        let p1 = anchors[2];
        let p11 = anchors[3].subtract(anchors[1]).scale(0.5);

        for (let i = -T; i <= 2 * T; ++i) {
            let t1 = i / T;
            let t2 = t1 * t1;
            let t3 = t2 * t1;

            let p = p0.scale(1 - 3 * t2 + 2 * t3).add(p1.scale(3 * t2 - 2 * t3)).add(p01.scale(t1 - 2 * t2 + t3)).add(p11.scale(t3 - t2));

            this.points.push(p);
            this.line.add({x: Math.round(p.x + window.innerWidth / 2) + 'px', y: Math.round(p.y + window.innerHeight / 2) + 'px'});
        }

        // this.line.add({x: '50%', y: '0px'}, {x: '100%', y: '100px'});
        
    }

}