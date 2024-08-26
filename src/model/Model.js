import { config_4x4, config_5x5, config_6x6 } from "./config";

// someone needs to know about these configurations. Perhaps we should!
const configs = [ config_5x5, config_4x4, config_6x6 ]

//method in board
/*export class Push {
    constructor(dr, dc, dir) {
        //up/down
        this.dr = dr; //delta row //delta column
        this.dc = dc;
        this.dir = dir;
        //left/right
    }
}*/


export class Ninjase { //not too sure about this
    constructor(row,column) {
        this.color = "#00FF00"; 
        //do I define it as squares??
        this.row = row-1;
        if (column ==='A') {
            this.column = 0;
        } else if (column==='B') {
            this.column = 1;
        } else if (column==='C') {
            this.column = 2;
        } else if (column==='D') {
            this.column = 3;
        } else if (column==='E') {
            this.column = 4;
        } else if (column==='F') {
            this.column = 5;
        }
    }
    //say how he made up of 4 squares. It would be column +1 , row +1
}




// wouldn't it be useful to have a Square class?
export class Square {
    constructor(row, column) {
        this.row = row
        this.column = column
    }
}



export class Board {
    constructor (size) {
        this.size = size;
        this.numMoves = 0;
        this.score = 0;


        this.grid = Array.from(Array(size), () => new Array(size));

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                this.grid[r][c] = new Square(r,c)

                // a bit of a hack just to add some color
                if (r % 2 == 0 && c % 2 == 0) {
                    this.grid[r][c].color = 'white'
                } else {
                    this.grid[r][c].color = 'white'
                }
            }
        }

	// how you access a square by its [row][column] location
        // this.grid[2][4]
    }
    //already moved Ninja
    push(ninjar, ninjac,newcolor, dr, dc) { //delta r and dela c //start cases one at a time -- take a color and move one from the other
        if (this.grid[ninjar][ninjac].color !="white") { 
            this.score = this.score + 1;
           //i.e have to move a square
            if (dr ===-1 && dc === 0) { //up
                if (ninjar-1>=0) { //
                    let moveupColor = this.grid[ninjar][ninjac].color;
                    if (this.grid[ninjar-1][ninjac].color != 'white') { //i.e. the one above is not white
                        this.push(ninjar-1,ninjac,moveupColor,-1,0);
                    }
                    this.grid[ninjar-1][ninjac].color = this.grid[ninjar][ninjac].color;
                    this.grid[ninjar][ninjac].color = newcolor;
                } else { //i.e. have to go to end of board and fix
                    let moveupColor = this.grid[ninjar][ninjac].color;
                    if (this.grid[this.size-1][ninjac].color != 'white') {
                        this.push(this.size-1,ninjac,moveupColor,-1,0);
                    }
                    this.grid[this.size-1][ninjac].color = this.grid[ninjar][ninjac].color;
                    this.grid[ninjar][ninjac].color = newcolor;
                }
            } else if (dr ===1 && dc === 0) { //down
                if ((ninjar+1)<=(this.size-1)) { //
                    let moveupColor = this.grid[ninjar][ninjac].color;
                    if (this.grid[ninjar+1][ninjac].color != 'white') { //i.e. the one above is not white
                        this.push(ninjar+1,ninjac,moveupColor,1,0);
                    }
                    this.grid[ninjar+1][ninjac].color = this.grid[ninjar][ninjac].color;
                    this.grid[ninjar][ninjac].color = newcolor;
                } else { //i.e. have to go to top of board and fix
                    let moveupColor = this.grid[ninjar][ninjac].color;
                    if (this.grid[0][ninjac].color != 'white') {
                        this.push(0,ninjac,moveupColor,1,0);
                    }
                    this.grid[0][ninjac].color = this.grid[ninjar][ninjac].color;
                    this.grid[ninjar][ninjac].color = newcolor;
                }

            } else if (dr === 0 && dc === 1) { //right
                if ((ninjac+1)<=(this.size-1)) { //
                    let moveupColor = this.grid[ninjar][ninjac].color;
                    if (this.grid[ninjar][ninjac+1].color != 'white') { //i.e. the one above is not white
                        this.push(ninjar,ninjac+1,moveupColor,0,1);
                    }
                    this.grid[ninjar][ninjac+1].color = this.grid[ninjar][ninjac].color;
                    this.grid[ninjar][ninjac].color = newcolor;
                } else { //i.e. have to go to top of board and fix
                    let moveupColor = this.grid[ninjar][ninjac].color;
                    if (this.grid[ninjar][0].color != 'white') {
                        this.push(ninjar,0,moveupColor,0,1);
                    }
                    this.grid[ninjar][0].color = this.grid[ninjar][ninjac].color;
                    this.grid[ninjar][ninjac].color = newcolor;
                }
                
            } else if (dr ===0 && dc === -1) { //left
                if (ninjac-1>=0) { //
                    let moveupColor = this.grid[ninjar][ninjac].color;
                    if (this.grid[ninjar][ninjac-1].color != 'white') { //i.e. the one above is not white
                        this.push(ninjar,ninjac-1,moveupColor,0,-1);
                    }
                    this.grid[ninjar][ninjac-1].color = this.grid[ninjar][ninjac].color;
                    this.grid[ninjar][ninjac].color = newcolor;
                } else { //i.e. have to go to end of board and fix
                    let moveupColor = this.grid[ninjar][ninjac].color;
                    if (this.grid[ninjar][this.size-1].color != 'white') {
                        this.push(ninjar,this.size-1,moveupColor,0,-1);
                    }
                    this.grid[ninjar][this.size-1].color = this.grid[ninjar][ninjac].color;
                    this.grid[ninjar][ninjac].color = newcolor;
                }

            }
        } 
    }
    //to remove stuff
    remove() {

        for (let r = 0; r < this.size-1; r++) {
            for (let c = 0; c < this.size-1; c++) {
                if (this.grid[r][c].color!='white') {
                    let searchColor = this.grid[r][c].color;
                    if (this.grid[r+1][c].color === searchColor && this.grid[r][c+1].color === searchColor && this.grid[r+1][c+1].color === searchColor) {
                        //i.e. there is a box there
                        this.grid[r][c].color = 'white';
                        this.grid[r+1][c].color = 'white';
                        this.grid[r][c+1].color = 'white';
                        this.grid[r+1][c+1].color = 'white';
                        //increment the score here by 4
                        this.score = this.score + 4;
                    }
                }
               
            }
        }
    

    }

    // a method that might be useful
    isWon() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c].color != 'white') {
                    //i.e. game not over
                    return false;
                }
            }
        }
        return true;
    }


}

export default class Model {
    // info is going to be JSON-encoded puzzle
    
    // 'which' is an integer 0..1..2 which selects configuration you can use.
    
    constructor(which) {

        
        this.config = configs[which]
        this.size = Number(this.config.numColumns)
        this.board = new Board(this.size)
        
        

        this.name = this.config.name;
        //let numRows = parseInt(config.numRows);
       // let numColumns = parseInt(config.numColumns);
        let ninjaRow = parseInt(this.config.ninjaRow);
        let ninjaColumn = this.config.ninjaColumn;

        this.ninjase = new Ninjase(ninjaRow,ninjaColumn);
        this.board.push(this.ninjase.row,this.ninjase.column,'white',0, 0);

        for (let p of this.config.initial) {
            let row = parseInt(p.row)-1;
            if (p.column ==='A') {
                this.board.grid[row][0].color = p.color;
            } else if (p.column==='B') {
                this.board.grid[row][1].color = p.color;
            } else if (p.column==='C') {
                this.board.grid[row][2].color = p.color;
            } else if (p.column==='D') {
                this.board.grid[row][3].color = p.color;
            } else if (p.column==='E') {
                this.board.grid[row][4].color = p.color;
            } else if (p.column==='F') {
                this.board.grid[row][5].color = p.color;
            }
        }

        //this.initialize(configs[which]);
    }

}
