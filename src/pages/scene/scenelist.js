
module.exports = {
    getScene: function (scenename) {
        switch (scenename) {
            case 'BezierCurve': return import('../../scenes/BezierCurve.js');
            case 'CatmullRom': return import('../../scenes/CatmullRom.js');
            case 'FractalScene': return import('../../scenes/FractalScene.js');
            case 'FresnelScene': return import('../../scenes/FresnelScene.js');
            case 'Geometry_Intersection': return import('../../scenes/Geometry_Intersection.js');
            case 'RGBCube': return import('../../scenes/RGBCube.js');
            case 'TriangleScene': return import('../../scenes/TriangleScene.js');            
        }
    }
};
    