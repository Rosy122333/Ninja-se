/** Redraw entire canvas from model. */

const OFFSETx = 30;
const OFFSETy = 80;
export function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');
    if (ctx === null) { return; }    // here for testing purposes...
    
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0,70, canvasObj.width, canvasObj.height);  

    // draws squares based on information? Perhaps you can use some of this concept
    let size = model.board.size
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        let square = model.board.grid[r][c]
        let x = c * 50
        let y = r * 50
        let w = 50
        let h = 50
        ctx.shadowBlur = 10;
        ctx.fillStyle = square.color;
        ctx.fillRect(x+OFFSETx, y+OFFSETy, w, h);
      }
    }

    // THEN draw ninjase
    ctx.fillStyle = model.ninjase.color;
    ctx.fillRect(model.ninjase.column*50+OFFSETx,model.ninjase.row*50+OFFSETy,100,100);

    if (model.board.isWon() === true) {
      document.getElementById("victorymessage").style.visibility = "visible";
      document.getElementById("victorymessage").style.opacity=100;
      //message
    }


}