_height = 20;
_width = 20;
_currentColor = 'blue';


function initialise(){
    initialiseCanvas();
    createColorBox('red', true);
    createColorBox('blue');
    createColorBox('green');
}

function initialiseCanvas(){
    const canvas = document.getElementById('canvas');
    
    // TODO: Luke see why this isn't working. It is needed for resizing the grid
    // while(canvas.firstChild()){
    //     canvas.remove.firstChild;
    // }

    for (let x = 0; x < this._width; x++) {
        const row = document.createElement('div');
        row.classList.add('PixelPad_canvasRow');

        for (let y = 0; y < this._height; y++) {
            const cell = document.createElement('div');
            cell.addEventListener('click', onClickCanvasCell);
            cell.addEventListener('contextmenu', onRightClickCanvasCell, false);
            cell.classList.add('PixelPad_canvasCell');

            if(x == 0){
                cell.classList.add('border-top');
            }
            if(y == 0){
                cell.classList.add('border-left');
            }
            
            row.appendChild(cell);
        }

        canvas.appendChild(row);
    }
}


function onClickCanvasCell(e){
    e.target.style.background = _currentColor;
}

function onRightClickCanvasCell(e){
    e.preventDefault();
    e.target.style.background = 'none';
    return false;
}

function createColorBox(color, selected = false){
    const colorBar = document.getElementById('colorBar');
    const colorBox = document.createElement('button');
    colorBox.addEventListener('click', function(e) {changeCurrentColor(e, color)});
    colorBox.classList.add('PixelPad_colorBox');

    if(selected){
        colorBox.classList.add('selected');
        _currentColor = 'red';
    }
    
    colorBox.style.background = color;
    colorBar.appendChild(colorBox);
}

function changeCurrentColor(e, color){
    _currentColor = color;
    unselectColorBoxes();
    e.target.classList.add('selected');
}

function unselectColorBoxes(){
    const boxes = document.getElementsByClassName('PixelPad_colorBox');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('selected');
        
    }
}