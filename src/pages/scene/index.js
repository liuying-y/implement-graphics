import css from '../../css/base.css';
import {getScene} from './scenelist.js';
// import BabylonScene from './src/frameworks/Base/base';
window.onload = function() {
    /* globals */
    window.canvas = document.createElement('canvas');
    document.body.appendChild(window.canvas);

    /* instance */
    // let scene = window.bScene = new BabylonScene(canvas);

    let sceneName = window.location.href.split('?').pop();
    document.title = sceneName;
    getScene(sceneName).then((module) => {
        let className = module[sceneName];
        window.b = new className(canvas);
        
    });
}