_height = 20;
_width = 20;

function setupCanvas(){
    const canvas = document.getElementById('canvas');
    
    // while(canvas.firstChild()){
    //     canvas.remove.firstChild;
    // }

    for (let x = 0; x < this._width; index++) {
        const row = document.createElement('div');
        row.classList.add('PixelPad_canvasRow');

        for (let y = 0; y < this._height; y++) {
            const cell = document.createElement('div');
            cell.classList.add('PixelPad_canvasCell');
            row.appendChild(cell);
        }

        canvas.appendChild(row);
    }
}