
import {layout} from './Layout.js'
import React from 'react';
import './App.css';
import Model from './model/Model.js';
import { redrawCanvas } from './boundary/Boundary.js'

function App() {
  // initial instantiation of the Model
  const [model, setModel] = React.useState(new Model(0));  // only place where Model object is instantiated.
  //this 0 is saying do 5x5
  const [redraw, forceRedraw] = React.useState(0);    // change values to force redraw

  const appRef = React.useRef(null);      // Later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // Later need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {
    
    /** Happens once. */
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model, redraw])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)

  //won game

  // controller to handle moving
  const moveNinjase = (direction) => { //up
    if (model.board.isWon() === false) {
      if (direction == 1 && model.ninjase.row!=0) { //up
        model.board.numMoves = model.board.numMoves+1;
        model.ninjase.row = model.ninjase.row -1;
        model.board.push(model.ninjase.row,model.ninjase.column,'white', -1, 0);
        model.board.push(model.ninjase.row,model.ninjase.column+1,'white', -1, 0);
      } else if (direction ==-1 && (model.ninjase.row!=model.board.size-2)) { //down
        model.board.numMoves = model.board.numMoves+1;
        model.ninjase.row = model.ninjase.row +1;
        model.board.push(model.ninjase.row+1,model.ninjase.column,'white', 1, 0);
        model.board.push(model.ninjase.row+1,model.ninjase.column+1,'white', 1, 0);
  
      } else if (direction ==2 && (model.ninjase.column!=model.board.size-2)) { //right
        model.board.numMoves = model.board.numMoves+1;
        model.ninjase.column = model.ninjase.column +1;
        model.board.push(model.ninjase.row,model.ninjase.column+1,'white', 0, 1);
        model.board.push(model.ninjase.row+1,model.ninjase.column+1,'white', 0, 1);
      } else if (direction == -2 && model.ninjase.column!=0) { //left 
        model.board.numMoves = model.board.numMoves+1;
        model.ninjase.column = model.ninjase.column -1;
        model.board.push(model.ninjase.row,model.ninjase.column,'white', 0, -1);
        model.board.push(model.ninjase.row+1,model.ninjase.column,'white', 0, -1);
      }
      
     // model.board.grid[1][3].color = 'red'
      forceRedraw(redraw+1)   // react to changes, if model has changed.
      //check if won now
      
    }
  }
  //CONTROL OBJECT
  const setConfiguration = (number) => {
    document.getElementById("victorymessage").style.visibility = "hidden";
    setModel(new Model(number))  //function to set configuration
    //make score and move counter 0
  }

  //Control Object for removeGroup'
  const removeGroup = (number) =>{
    model.board.remove();

    forceRedraw(redraw+1)   // react to changes, if model has changed.
  }
  //Reset Control object
  const reset = (number) => {   //currently working on this nowwwww
    document.getElementById("victorymessage").style.visibility = "hidden";
    if (model.board.size === 5) {
      setModel(new Model(0))
    } else if (model.board.size === 4) {
      setModel(new Model(1))
    } else if (model.board.size === 6) {
      setModel(new Model(2))
    }
  }
  

  return (
    <main style={layout.Appmain} ref = {appRef}>
    <div className="App" ref={appRef}>
      <canvas tabIndex="1"  
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width={500} //these numbers should matter
        height={500}
        />
      <button style={layout.resetbutton} data-testid="Reset" onClick={(e) => reset(0)}> reset </button>
      <button style={layout.upbutton} data-testid="upbutton" onClick={(e) => moveNinjase(1)}> ^ </button>
      <button style={layout.downbutton}  data-testid="downbutton" onClick={(e) => moveNinjase(-1)}>v</button>
      <button style={layout.rightbutton}  data-testid="rightbutton" onClick={(e) => moveNinjase(2)}>&gt;</button>
      <button style={layout.leftbutton}  data-testid="leftbutton" onClick={(e) => moveNinjase(-2)}>&lt;</button>
      <button data-testid="configbutton1" style={layout.configbutton1} onClick={(e) => setConfiguration(1)}>4x4</button>
      <button data-testid="configbutton2" style={layout.configbutton2}  onClick={(e) => setConfiguration(0)}>5x5</button>
      <button data-testid="configbutton3" style={layout.configbutton3} onClick={(e) => setConfiguration(2)}>6x6</button>
      <label style={layout.text}>{"number of moves: " + model.board.numMoves}</label>
      <button style={layout.remove} onClick={(e) => removeGroup(1)}>remove group button </button>
      <label style={layout.text3}>{"score: " + model.board.score}</label>
    </div>
    <div>
    <p id="victorymessage" 
    style={layout.message}>{"\n * \nCongrats on winning\n * \n"}</p>
    </div>
    </main>
    
  );
}

export default App;
