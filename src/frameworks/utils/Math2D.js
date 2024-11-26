class Math2D {
    static Circle_GetAngle(x, y) {
        let th = 0;
        th = Math.atan2(y, x);

        return th;
    }

    static Circle_GetPosition(th, r, x, y)  {
        return {x: r * Math.cos(th) + x, y: r * Math.sin(th) + y};
    }
}

export default Math2D;