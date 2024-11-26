
export default class CatmullRom {
    static CreateCamullRom(points, times, isRing) {
        let result = [];
        let start = isRing ? 0 : 1;
        let end = isRing ? points.length - 1 : points.length - 3;
        let para = [[], [], []];
        let ll = points.length;

        for (let i = start; i <= end; ++i) {
            let p0 = points[i];
            let p01 = points[(i + 1) % ll].subtract(points[(i - 1 + ll) % ll]).scale(0.5);
            let p1 = points[(i + 1) % ll];
            let p11 = points[(i + 2) % ll].subtract(points[i]).scale(0.5);
            
            for (let j = 0; j < times; ++j) {
                let t1;
                let t2;
                let t3;
                if (!para[0][j]) {
                    t1 = para[0][j] = j / times;
                    t2 = para[1][j] = t1 * t1;
                    t3 = para[2][j] = t2 * t1;
                } else {
                    t1 = para[0][j] ;
                    t2 = para[1][j] ;
                    t3 = para[2][j] ;
                }

                result.push(
                    p0.scale(1 - 3 * t2 + 2 * t3).add(p1.scale(3 * t2 - 2 * t3)).add(p01.scale(t1 - 2 * t2 + t3)).add(p11.scale(t3 - t2))
                );

            }
            
        }

        if (isRing) {
            result.push(points[0]);
        }

        return result;
    }

}
