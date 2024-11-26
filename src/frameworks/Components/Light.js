/*
 * @Author: Yan 
 * @Date: 2018-05-18 14:24:08 
 * @Last Modified by: Yan
 * @Last Modified time: 2018-05-18 14:35:45
 */

export default class Light {
    constructor(origin, direction, rootmesh) {
        this.origin = origin.clone();
        this.direction = direction.clone();
        this.rootmesh = rootmesh;


    }

    static get lens() {
        return Light.__lenslist;
    }

    static lensAdd(len) {
        Light.__lenslist.push(len);
    }

    static lensDelete(len) {
        
    }
};

Light.__lenslist = [];