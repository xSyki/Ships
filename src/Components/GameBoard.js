import React from 'react';
import InstructionX from './InstructionX';
import InstructionY from './InstructionY';

class GameBoard extends React.Component {

  gameBoardTitle = () => {
    if(this.props.type === "myGameBoard") return <h2 className="gameBoardInstructionTitle">Ty:</h2>
    else return <h2 className="gameBoardInstructionTitle">Komputer:</h2>
  }

  render(){
      return(
          <div className={this.props.type}>
              {this.gameBoardTitle()}
              <InstructionX/>
              <InstructionY/>
              <div className="gameBoardCells">
              {this.props.gameBoard}
              </div>
        </div>
      )
  }
}

export default GameBoard;