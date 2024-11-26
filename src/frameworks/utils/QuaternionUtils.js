class QuaternionUtils {
    static getTransQuaternion(oldPos, newPos) {
        oldPos.normalize();
        newPos.normalize();
        if (oldPos.equals(newPos)) {
            return;
        }

        let cos2 = BABYLON.Vector3.Dot(oldPos, newPos) / oldPos.length() / newPos.length() / 2;
        let sin = Math.sqrt(0.5 - cos2);
        let cos = Math.sqrt(0.5 + cos2);
        let v = BABYLON.Vector3.Cross(oldPos, newPos).normalize().scale(sin);

        let q = new BABYLON.Quaternion(v.x, v.y, v.z, cos);

        return q;
    }

    static transVectorByQuaternion (start, q) {
        let pp = new BABYLON.Quaternion(start.x, start.y, start.z, 0);
        let r  = QuaternionUtils.transQuatByQuaternion(pp, q);
        return new BABYLON.Vector3(r.x, r.y, r.z);
    }

    static transQuatByQuaternion(start, q) {
        return q.multiply(start).multiply(q.conjugate());
    }
}

export default QuaternionUtils;