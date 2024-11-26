/*
 * @Author: Yan 
 * @Date: 2017-12-29 17:26:59 
 * @Last Modified by: Yan
 * @Last Modified time: 2019-01-10 13:13:53
 */

import {Const} from '../Base/const';
import WebGlChecker from '../../libs/WebGLCheck/WebglCheck';
global.CONST = Const;

class Main{
    constructor (bScene) {
        this.checkWebGl();

    }

    checkWebGl() {
        if (!WebGlChecker.isWebGLAvailable()) {
            let warning = WebGlChecker.getWebGLErrorMessage();
            document.body.appendChild(warning);
        }

        if (!WebGlChecker.isWebGL2Available()) {
            let warning = WebGlChecker.getWebGL2ErrorMessage();
            document.body.appendChild(warning);
        }
    }


    update() {
        
    }

}
export default Main;
