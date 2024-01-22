_height = 20;
_maxHeight = 32;
_minHeight = 1;
_width = 20;
_maxWidth = 64;
_minWidth = 1;
_cellSize = 25;
_currentColor = 'blue';

_leftMouseDown = false;
_rightMouseDown = false;


//#region initialise
function initialise(){
    document.addEventListener('mousedown', setMouseState);
    document.addEventListener('mouseup', setMouseState);
    initialiseCanvas();
    initialiseColorBar();
    initialiseGridChanger();
    initialiseClearAllButton();
}

function initialiseCanvas(){
    const canvas = document.getElementById('canvas');
    canvas.style.width = `${_cellSize * _width}px`;
    canvas.style.height = `${_cellSize * _height}px`;;
    
    while(canvas.firstElementChild){
        canvas.removeChild(canvas.firstElementChild);
    }

    
    for (let y = 0; y < _height; y++) {
        const row = document.createElement('div');
        row.classList.add('PixelPad_canvasRow');

        for (let x = 0; x < _width; x++) {
            const cell = document.createElement('div');
            cell.addEventListener('click', onClickCanvasCell);
            cell.addEventListener('mouseenter', onMouseEnterCanvasCell)
            cell.addEventListener('contextmenu', onRightClickCanvasCell, false);
            cell.classList.add('PixelPad_canvasCell');

            if(y == 0){
                cell.classList.add('border-top');
            }
            if(x == 0){
                cell.classList.add('border-left');
            }
            
            row.appendChild(cell);
        }

        canvas.appendChild(row);
    }
}

function initialiseColorBar(){
    createColorBox('red', true);
    createColorBox('blue');
    createColorBox('green');
}

function initialiseGridChanger(){
    const row = document.getElementById('row1');
    
    const inputFieldX = document.createElement('input');
    inputFieldX.id = 'inputX';
    inputFieldX.classList.add('PixelPad_input');
    inputFieldX.value = _width;
    
    const inputFieldY = document.createElement('input');
    inputFieldY.id = 'inputY';
    inputFieldY.classList.add('PixelPad_input');
    inputFieldY.value = _height;

    const button = document.createElement('button');
    button.classList.add('PixelPad_button');
    button.addEventListener('click', changeCanvasSize);
    button.innerText = 'Change Size';

    row.appendChild(inputFieldX);
    row.appendChild(inputFieldY);
    row.appendChild(button);
}

//#endregion

//#region canvas size
function changeCanvasSize(){
    _width = document.getElementById('inputX').value;

    if(_width > _maxWidth){
        _width = _maxWidth;
        document.getElementById('inputX').value = _maxWidth;
    }
    else if(_width < _minWidth){
        _width = _minWidth;
        document.getElementById('inputX').value = _minWidth;
    }

    _height = document.getElementById('inputY').value;
    
    if(_height > _maxHeight){
        _height = _maxHeight;
        document.getElementById('inputY').value = _maxHeight;
    }
    else if(_height < _minHeight){
        _height = _minHeight;
        document.getElementById('inputY').value = _minHeight;
    }

    initialiseCanvas();
}


//#endregion

//#region colorBar
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
//#endregion



//#region Canvas Interaction
function onMouseEnterCanvasCell(e){
    if(_leftMouseDown){
        e.target.style.background = _currentColor;
    }
    else if(_rightMouseDown){
        e.target.style.background = 'none';
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

function setMouseState(e){
        if(e.button == 0){
            _leftMouseDown = (e.type == 'mousedown');
        }
        else if(e.button == 2){
            _rightMouseDown = (e.type == 'mousedown');
        }
}
//#endregion


function initialiseClearAllButton(){
    const row = document.getElementById('row1');
    const button = document.createElement('button');
    button.classList.add('PixelPad_button');
    button.innerText = 'Clear All';
    button.addEventListener('click', initialiseCanvas);

    row.appendChild(button);
}