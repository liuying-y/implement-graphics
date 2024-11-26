

class TextBlock {
    constructor(bScene, text, position, fontStyle, backgroundStyle) {
        this._text = text || '';
        this._position = position || new BABYLON.Vector2(0, 0);
        this._bScene = bScene;
        if (!TextBlock.Style) {
            TextBlock.Style = this._bScene.guiCanvas.createStyle();
            TextBlock.Style.fontSize = 24;
            TextBlock.Style.fontFamily = 'Microsoft Yahei';
        }
        this._fontStyle = Object.assign({color: 'White', height: '50px'}, fontStyle);
        this._backStyle = Object.assign({
            type: 'Rectangle',
            color: 'white',
            background: null,
            height: '50px',
            width: 0.2,
            cornerRadius: 20
        }, backgroundStyle);


        this._backControl =  new BABYLON.GUI[this._backStyle.type]();
        this._backControl.top = this._position.y + 'px';
        this._backControl.left = this._position.x + 'px';
        Object.assign(this._backControl, this._backStyle);
        this._bScene.addControl(this._backControl);


        this._textControl = new BABYLON.GUI.TextBlock();
        this._textControl.text = this._text;
        this._textControl.height = this._fontStyle.height;
        this._textControl.top = this._position.y + 'px';
        this._textControl.left = this._position.x + 'px';
        this._textControl.color = this._fontStyle.color;
        this._textControl.style = TextBlock.Style;
        this._bScene.addControl(this._textControl);

    }

    changeText(str) {
        this._textControl.text = str;
    }

    changeBackgroundColor(str) {
        this._backControl.background = str;
    }
}

module.exports = TextBlock;