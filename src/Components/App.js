import './App.css';
import React from 'react';

import GameBoard from './GameBoard';
import Header from './Header';
import Ship from './Ship';
import Cell from './Cell';
import Instruction from './Instruction';
import Statistics from './Statistics';
import Settings from './Settings';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

const ships = [
  {
      "id": 0,
      "name": "Battleship",
      "mast": 4,
      "lifes": 4,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 1,
      "name": "Cruiser",
      "mast": 3,
      "lifes": 3,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 2,
      "name": "Cruiser",
      "mast": 3,
      "lifes": 3,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 3,
      "name": "Destroyer",
      "mast": 2,
      "lifes": 2,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 4,
      "name": "Destroyer",
      "mast": 2,
      "lifes": 2,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 5,
      "name": "Destroyer",
      "mast": 2,
      "lifes": 2,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 6,
      "name": "Single-masted",
      "mast": 1,
      "lifes": 1,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 7,
      "name": "Single-masted",
      "mast": 1,
      "lifes": 1,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 8,
      "name": "Single-masted",
      "mast": 1,
      "lifes": 1,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  },
  {
      "id": 9,
      "name": "Single-masted",
      "mast": 1,
      "lifes": 1,
      "submitted": false,
      "rotated": false,
      "xy":["", ""]
  }
];

const letters = ['a','b','c','d','e','f','g','h','i','j'];

class App extends React.Component {

state = {
  stageOfTheGame: "shipSubmitting",

  score: {
    my: 0,
    ai: 0
  },

  ships: [],
  aiShips: [],
  myGameBoard: [],
  aiGameBoard: [],

  statusOfMyGameBoard: Array.from({length: 10}, (column, columnID) => Array.from({length: 10}, (row, rowID) => "")),
  statusOfAiGameBoard: Array.from({length: 10}, (column, columnID) => Array.from({length: 10}, (row, rowID) => "")),

  shipsOnMyGameBoard: Array.from({length: 10}, (column, columnID) => Array.from({length: 10}, (row, rowID) => "")),
  shipsOnAiGameBoard: Array.from({length: 10}, (column, columnID) => Array.from({length: 10}, (row, rowID) => "")),

  nowShipID: -1,
  temporaryShipCordinatesX: -1,
  temporaryShipCordinatesY: -1,
  prevRotatedShipPreview: false,

  aiPreviusHitShot: [-1, -1],
  aiPreviusPreviusHitShot: [-1, -1],

  allShipsSubmitted: false,
  allAiShipsSubmitted: false,

  gameEnded: false,

  shotsFired: 0,
  hitShots: 0,

  aiShotsFired: 0,
  aiHitShots: 0,

  notification: true,
  blindGame: false,
  mode: "hard"
}

componentDidMount() {
  this.setState({
      ships: JSON.parse(JSON.stringify(ships)),
      aiShips: JSON.parse(JSON.stringify(ships)),
      myGameBoard: Array.from({length: 10}, (row, rowID) => Array.from({length: 10}, (column, columnID) => <Cell key={letters[columnID]+''+rowID} letters={letters[columnID]} rowID={rowID} type="myGameBoard" previewShip={this.previewShip} shipStatus={this.state.statusOfMyGameBoard[columnID][rowID]} shipId={this.state.shipsOnMyGameBoard[columnID][rowID]}/>)),
      aiGameBoard: Array.from({length: 10}, (row, rowID) => Array.from({length: 10}, (olumn, columnID) => <Cell key={letters[columnID]+''+rowID} letters={letters[columnID]} rowID={rowID} type="aiGameBoard" round={this.round} shipStatus={this.state.statusOfAiGameBoard[columnID][rowID]} shipId={this.state.shipsOnAiGameBoard[columnID][rowID]} blindGame={this.state.blindGame}/>)),
  })
}

componentDidUpdate(prevProps, prevState) {
  if(JSON.stringify(this.state.statusOfMyGameBoard) !== JSON.stringify(prevState.statusOfMyGameBoard)) {
    this.setState({
      myGameBoard: Array.from({length: 10}, (row, rowID) => Array.from({length: 10}, (column, columnID) => <Cell key={letters[columnID]+''+rowID} letters={letters[columnID]} rowID={rowID} type="myGameBoard" previewShip={this.previewShip} shipStatus={this.state.statusOfMyGameBoard[columnID][rowID]} shipId={this.state.shipsOnMyGameBoard[columnID][rowID]}/>)),
    })
  }
  if (JSON.stringify(this.state.statusOfAiGameBoard) !== JSON.stringify(prevState.statusOfAiGameBoard)) {
    this.setState({
      aiGameBoard: Array.from({length: 10}, (row, rowID) => Array.from({length: 10}, (column, columnID) => <Cell key={letters[columnID]+''+rowID} letters={letters[columnID]} rowID={rowID} type="aiGameBoard" round={this.round} shipStatus={this.state.statusOfAiGameBoard[columnID][rowID]} shipId={this.state.shipsOnAiGameBoard[columnID][rowID]} blindGame={this.state.blindGame}/>)),
    })
  }
}

//Changing type of game from easy to hard and from hard to easy
handleMode = () => {
  if(!this.state.gameEnded) {
    for(let i = 0; i < this.state.ships.length; i++) {
      if(this.state.ships[i].submitted) {
        store.addNotification({
          title: "Błąd",
          message: "Nie mozesz zmienić trybu gry w trakcie rozgrywki.",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
        return;
      }
    }
  }

  if(this.state.mode === "easy") {
    this.setState({
      mode: "hard"
    })
  } else {
    this.setState({
      mode: "easy"
    })
  }
}

//Truning off and on notifications
handleNotification = () => {
  this.setState({
    notification: !this.state.notification
  })
}

//Turning off and on BlindGame
handleBlindGame = () => {
  if(!this.state.gameEnded) {
    for(let i = 0; i < this.state.ships.length; i++) {
      if(this.state.ships[i].submitted) {
        store.addNotification({
          title: "Błąd",
          message: "Nie mozesz zmienić trybu gry w trakcie rozgrywki.",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
        return;
      }
    }
  }

  this.setState({
    blindGame: !this.state.blindGame,
    notification: true
  })
}

//Notification sent when the ship has been misplaced 
shipError = (message) => {
  if(this.state.notification) {
    return store.addNotification({
      title: "Błąd",
      message: message,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000
      }
    });
  }
}

//Notification sent when player shot
shotNotification = (title, message, type) => {
  if(this.state.notification) {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000
      }
    });
  }
}

//Count lifes if 0 return true
countAllShipsLifes = (newShips) => {
  let allLifeOfMyShips = 0;
  
  for (let i = 0; i < newShips.length; i++) {
    allLifeOfMyShips  += newShips[i].lifes;
  }
  
  if(allLifeOfMyShips) {
    return false;
  } else {
    return true;
  }
}

//Clearing preview
clearPreview = (x, y, rotated, mast, newMyCellsStatus) => {
  if(rotated && x !== -1 && y !== -1) {
    for(let i = 0; i < mast; i++){
      newMyCellsStatus[x + i][y] = "";
    }
  } else if (!rotated && x !== -1 && y !== -1) {
    for(let i = 0; i < mast; i++){
      newMyCellsStatus[x][y + i] = "";
    }
  }
  return newMyCellsStatus;
}

//Sink ship
sinkShip = (x, y, rotated, mast, newCellsStatus) => {
  if(rotated) {
    for(let i = 0; i <= 2; i++){
      for(let a = 0; a <= mast + 1; a++) {
          if(y - 1 + i >= 0 && x + a - 1>= 0 && y - 1 + i <= 9 && x + a - 1 <= 9){
            if(newCellsStatus[x + a - 1][y + i - 1] === "") {
              newCellsStatus[x + a - 1][y + i - 1] = "shotted";
            }
            if(newCellsStatus[x + a - 1][y + i - 1] === "hit") {
              newCellsStatus[x + a - 1][y + i - 1] = "sinked";
            }
          }
      }
    }

  } else {
    for(let i = 0; i <= mast + 1; i++){
      for(let a = 0; a <= 2; a++) {
        if(y - 1 + i >= 0 && x + a - 1 >= 0 && y - 1 + i <= 9 && x + a - 1 <= 9){
          if(newCellsStatus[x + a - 1][y + i - 1] === "") {
            newCellsStatus[x + a - 1][y + i - 1] = "shotted";
          }
          if(newCellsStatus[x + a - 1][y + i - 1] === "hit") {
            newCellsStatus[x + a - 1][y + i - 1] = "sinked";
          }
        }
      }
    }
  }

  return newCellsStatus
}

chceckIsWin = (newShips, who) => {
  if(this.countAllShipsLifes(newShips)) {
    const newScore = this.state.score;
    if(who === "ai") {
      newScore.ai++;
    } else if (who === "my") {
      newScore.my++;
    }

    this.setState({
      score: newScore,
      gameEnded: true,
    })
  }
}

//Rendering ship to place on board
shipOneByOneRender() {
  for(let i = 0; i < this.state.ships.length; i++) {
    if(this.state.ships[i].submitted === false) {
        return <Ship key={this.state.ships[i].id} id={this.state.ships[i].id} name={this.state.ships[i].name} mast={this.state.ships[i].mast} rotated={this.state.ships[i].rotated} rotate={this.shipRotate} submit={this.shipSubmit} setNowShipID={this.setNowShipID}/>;
    }
    if(this.state.allShipsSubmitted === false && i === this.state.ships.length-1) {
      this.renderAiShips();
      this.setState({
        allShipsSubmitted: true,
        stageOfTheGame: "shots",
      })
    }
  }
}

//Setting id of ship which is placing now
setNowShipID = (id) => {
  if(this.state.nowShipID !== id) {
    this.setState({
      nowShipID: id
    })
  }
}

//Function to rotate ship
shipRotate = (id) => {

  let error = false;

  //Copy of variables
  const newShips = [...this.state.ships];

  //Changing orientantation of ship
  newShips[id].rotated = !newShips[id].rotated;

  //efreshing preview when ship placed
  if(this.state.temporaryShipCordinatesX !== -1 && !error) this.previewShip(this.state.temporaryShipCordinatesX, this.state.temporaryShipCordinatesY);

  this.setState({
      ships: newShips,
      })
}

//Render preview of ship on board
previewShip = (x, y) => {
  //Disable function if all ships have already been submitted 
  if(this.state.allShipsSubmitted) return;

  //Copy of variables
  const mast = this.state.ships[this.state.nowShipID].mast;
  const rotated = this.state.ships[this.state.nowShipID].rotated;
  let newMyCellsStatus = JSON.parse(JSON.stringify(this.state.statusOfMyGameBoard));


  //Clearing preview
  newMyCellsStatus = this.clearPreview(this.state.temporaryShipCordinatesX, this.state.temporaryShipCordinatesY, this.state.prevRotatedShipPreview, mast, newMyCellsStatus);

  //Retrun function when player want to place ship illegaly
  if(rotated && x + mast > 10) {
    this.shipError(`Błędne położenie statku.`);
    return;
  }
  if(!rotated && y + mast > 10) {
    this.shipError(`Błędne położenie statku.`);
    return;
  }

  //Check if there are any previously installed ships around and on the ship 
  if(rotated) {
    for(let i = 0; i <= 2; i++){
      for(let a = 0; a <= mast+1; a++) {
          if(y - 1 + i >=0 && x + a - 1>=0 && y - 1 + i <=9 && x + a - 1<=9){
            if(newMyCellsStatus[x + a - 1][y + i - 1] === "ship") {
              this.shipError(`Błędne położenie statku.`);
              this.setState({
                statusOfMyGameBoard: newMyCellsStatus
            })
              return;
            }
          }
      }
    }
  } else {
    for(let i = 0; i <= mast+1; i++){
      for(let a = 0; a <= 2; a++) {
        if(y - 1 + i >=0 && x + a - 1 >= 0 && y - 1 + i <= 9 && x + a - 1 <= 9){
          if(newMyCellsStatus[x + a - 1][y + i - 1] === "ship") {
            this.shipError(`Błędne położenie statku.`);
            this.setState({
              statusOfMyGameBoard: newMyCellsStatus
            })
            return;
          }
        }
      }
    }
  }

  //Adding preview of ship
  if(rotated) {
    for(let i = 0; i < mast; i++){
      newMyCellsStatus[x + i][y] = "previewShip";
    }
  } else {
    for(let i = 0; i < mast; i++){
      newMyCellsStatus[x][y + i] = "previewShip";
    }
  }
 
  this.setState({
      statusOfMyGameBoard: newMyCellsStatus,
      temporaryShipCordinatesX: x,
      temporaryShipCordinatesY: y,
      prevRotatedShipPreview: rotated
  })
}

//Submitting place of ship
shipSubmit = (id, mast, rotated) => {
  //Return the function if the ship has not been laid down yet 
  if(this.state.temporaryShipCordinatesX === -1 || this.state.temporaryShipCordinatesY === -1) {
    this.shipError(`Nie położyłeś jeszcze statku.`);
    return;
  }

  //Copy of variables
  let newMyCellsStatus = JSON.parse(JSON.stringify(this.state.statusOfMyGameBoard));
  const newShipsOnMyGameBoard = JSON.parse(JSON.stringify(this.state.shipsOnMyGameBoard));

  const x = this.state.temporaryShipCordinatesX;
  const y = this.state.temporaryShipCordinatesY;

  const newShips = JSON.parse(JSON.stringify(this.state.ships));

  //Check on the site where we want to submit no ship anymore 
  if(rotated) {
    for(let i = 0; i <= 2; i++){
      for(let a = 0; a <= mast+1; a++) {
          if(y - 1 + i >=0 && x + a - 1>=0 && y - 1 + i <=9 && x + a - 1<=9){
            if(newMyCellsStatus[x + a - 1][y + i - 1] === "ship") {
              this.shipError(`Błędne położenie statku.`);
              return;
            }
          }
      }
    }
  } else {
    for(let i = 0; i <= mast+1; i++){
      for(let a = 0; a <= 2; a++) {
        if(y - 1 + i >=0 && x + a - 1 >= 0 && y - 1 + i <= 9 && x + a - 1 <= 9){
          if(newMyCellsStatus[x + a - 1][y + i - 1] === "ship") {
            this.shipError(`Błędne położenie statku.`);
            return;
          }
        }
      }
    }
  }

  //Set the data in the ships object array
  newShips[id].x = x;
  newShips[id].y = y;
  newShips[id].submitted = true;


  //Clearing prewiew
  newMyCellsStatus = this.clearPreview(this.state.temporaryShipCordinatesX, this.state.temporaryShipCordinatesY, this.state.prevRotatedShipPreview, newShips[id].mast, newMyCellsStatus);

  //Ship setting
  if(rotated) {
    for(let i = 0; i < mast; i++){
      newMyCellsStatus[x + i][y] = "ship";
      newShipsOnMyGameBoard[x + i][y] = id;
    }
  } else {
    for(let i = 0; i < mast; i++){
      newMyCellsStatus[x][y + i] = "ship";
      newShipsOnMyGameBoard[x][y + i] = id;
    }
  }
 
  this.setState({
      ships: newShips,
      statusOfMyGameBoard: newMyCellsStatus,
      shipsOnMyGameBoard: newShipsOnMyGameBoard,
      temporaryShipCordinatesX: -1,
      temporaryShipCordinatesY: -1
      })
}

//Placing and rendering ships of computer
renderAiShips = () => {

  //Copy of variables
  const newAiShips = JSON.parse(JSON.stringify(this.state.aiShips));
  const newAiCellsStatus = JSON.parse(JSON.stringify(this.state.statusOfAiGameBoard));
  const newShipsOnAiGameBoard = JSON.parse(JSON.stringify(this.state.shipsOnAiGameBoard));


  //Arranging ships in turn by id 
  for(let i = 0; i < this.state.aiShips.length; i++) {
    let needToRenderAgain = true;

    while(needToRenderAgain) {
      //Drawing of cordynates 
      newAiShips[i].x = Math.floor(Math.random()*10);
      newAiShips[i].y = Math.floor(Math.random()*10);

      //Rotation draw 
      newAiShips[i].rotated = Math.random() < 0.5;

      //Checking if the drawn variables, taking into account the mast and rotation, do not stick out beyond the map 
      if(newAiShips[i].rotated && newAiShips[i].x + newAiShips[i].mast <= 9) {
          for(let index = 0; index <= 2; index++){
            for(let a = 0; a <= newAiShips[i].mast+1; a++) {
              if(newAiShips[i].y + index - 1 >= 0 && newAiShips[i].x + a - 1 >= 0 && newAiShips[i].y + index - 1 <= 9 && newAiShips[i].x + a - 1 <= 9){
                if(newAiCellsStatus[newAiShips[i].x + a - 1][newAiShips[i].y + index - 1] !== "aiShip") {
                  needToRenderAgain = false;
                }
              }
            }
          }
      } else if(!newAiShips[i].rotated && newAiShips[i].y + newAiShips[i].mast <= 9) {
        for(let index = 0; index <= newAiShips[i].mast+1; index++){
          for(let a = 0; a <= 2; a++) {
            if(newAiShips[i].y + index - 1 >= 0 && newAiShips[i].x + a - 1 >= 0 && newAiShips[i].y + index - 1 <= 9 && newAiShips[i].x + a - 1 <= 9){
              if(newAiCellsStatus[newAiShips[i].x + a - 1][newAiShips[i].y + index - 1] !== "aiShip") {
                needToRenderAgain = false;
              }
            }
          }
        }
      }

      if(newAiShips[i].rotated && newAiShips[i].x + newAiShips[i].mast <= 9) {
        for(let index = 0; index <= 2; index++){
          for(let a = 0; a <= newAiShips[i].mast+1; a++) {
            if(newAiShips[i].y + index - 1 >= 0 && newAiShips[i].x + a - 1 >= 0 && newAiShips[i].y + index - 1 <= 9 && newAiShips[i].x + a - 1 <= 9){
              if(newAiCellsStatus[newAiShips[i].x + a - 1][newAiShips[i].y + index - 1] === "aiShip") {
                needToRenderAgain = true;
              }
            }
          }
        }
      } else if(!newAiShips[i].rotated && newAiShips[i].y + newAiShips[i].mast <= 9) {
        for(let index = 0; index <= newAiShips[i].mast+1; index++){
          for(let a = 0; a <= 2; a++) {
            if(newAiShips[i].y + index - 1 >= 0 && newAiShips[i].x + a - 1 >= 0 && newAiShips[i].y + index - 1 <= 9 && newAiShips[i].x + a - 1 <= 9){
              if(newAiCellsStatus[newAiShips[i].x + a - 1][newAiShips[i].y + index - 1] === "aiShip") {
                needToRenderAgain = true;
              }
            }
          }
        }
      }
    }

    //Setting the variables in the copy of the array 
    newAiShips[i].submitted = true;

    //Setting ship
    if(newAiShips[i].rotated) {
      for(let index = 0; index < newAiShips[i].mast; index++){

        newAiCellsStatus[newAiShips[i].x + index][newAiShips[i].y] = "aiShip";
        newShipsOnAiGameBoard[newAiShips[i].x + index][newAiShips[i].y] = i;
      }
    } else if(!newAiShips[i].rotated) {
      for(let index = 0; index < newAiShips[i].mast; index++){
        newAiCellsStatus[newAiShips[i].x][newAiShips[i].y + index] = "aiShip";
        newShipsOnAiGameBoard[newAiShips[i].x][newAiShips[i].y + index] = i;
      }
    }
  }

  this.setState({
    statusOfAiGameBoard: newAiCellsStatus,
    aiShips: newAiShips,
    shipsOnAiGameBoard: newShipsOnAiGameBoard,
    allAiShipsSubmitted: true
  })
}

//Round function(player and computer shot one after another)
round = (x, y, id) => {
  //Turning off funtion off when game did't start or did end
  if (!this.state.allShipsSubmitted || !this.state.allAiShipsSubmitted || this.state.gameEnded) return;

  //Turing off funtion when cell has been shooted if it isn't blind game
  if(!this.state.blindGame) {
    if(this.state.statusOfAiGameBoard[x][y] === "shotted" || this.state.statusOfAiGameBoard[x][y] === "hit" || this.state.statusOfAiGameBoard[x][y] === "sinked") return;
  }

  //Player shot
  this.shot(x, y, id);

  //Easy mode
  if(this.state.mode === "easy"){
    //Computer shot
    this.aiShot();
  } else { //Hard mode
    //Inteligent computer shot
    this.aiInteligentShot();
  }
}

//Player shot
shot = (x, y, id) => {

  //Copy of variables
  let newAiCellsStatus = JSON.parse(JSON.stringify(this.state.statusOfAiGameBoard));
  const newAiShips = JSON.parse(JSON.stringify(this.state.aiShips));

  let newShotsFired = this.state.shotsFired;
  let newHitShots = this.state.hitShots;

  //Adding shot to statistics
  newShotsFired++;

  //Chaning cell status and sand nottifications depend of actual cell status
  if(newAiCellsStatus[x][y] === "") {
    newAiCellsStatus[x][y] = "shotted";
    this.shotNotification("Strzał!", `Oddany strzał w pole ${String.fromCharCode(97 + x)}${y} nie został trafiony.`, "danger");
  } else if(newAiCellsStatus[x][y] === "aiShip") {
    newAiCellsStatus[x][y] = "hit";
    newAiShips[id].lifes = newAiShips[id].lifes -1;
    newHitShots++;
    this.shotNotification("Strzał!", `Oddany strzał w pole ${String.fromCharCode(97 + x)}${y} został trafiony.`, "success");

    if(newAiShips[id].lifes === 0) {
      this.shotNotification(`Statek zatopiony!`, `Oddany strzał w pole ${String.fromCharCode(97 + x)}${y} zatopił statek.`, "success");
      
      newAiCellsStatus = this.sinkShip(newAiShips[id].x, newAiShips[id].y, newAiShips[id].rotated, newAiShips[id].mast, newAiCellsStatus);
    }
  } else if(newAiCellsStatus[x][y] === "shotted") {
    this.shotNotification("Strzał!", `Oddany strzał w pole ${String.fromCharCode(97 + x)}${y} nie został trafiony.`, "danger");
  } else if(newAiCellsStatus[x][y] === "hit" || newAiCellsStatus[x][y] === "sinked") {
    this.shotNotification("Strzał!", `Oddany strzał w pole ${String.fromCharCode(97 + x)}${y} został trafiony.`, "success");
  }

  //Check is player win
  this.chceckIsWin(newAiShips, "my");

  this.setState({
    statusOfAiGameBoard: newAiCellsStatus,
    aiShips: newAiShips,
    shotsFired: newShotsFired,
    hitShots: newHitShots
  })
}

//Computer shot(rng)
aiShot = () => {
  //Copy of variables
  let newMyCellsStatus = JSON.parse(JSON.stringify(this.state.statusOfMyGameBoard));
  const newShips = JSON.parse(JSON.stringify(this.state.ships));

  //Draw cordinates
  let needToRandomAgain = true;

  let x = -1;
  let y = -1;

  while(needToRandomAgain) {
    x = Math.floor(Math.random()*10);
    y = Math.floor(Math.random()*10);
    if(newMyCellsStatus[x][y] !== "shotted" && newMyCellsStatus[x][y] !== "hit" && newMyCellsStatus[x][y] !== "sinked") {
      needToRandomAgain = false;
    }
  }

  const id  = this.state.shipsOnMyGameBoard[x][y];

  let newAiShotsFired = this.state.aiShotsFired;
  let newAiHitShots = this.state.aiHitShots;

  //Adding computer shot to statistics
  newAiShotsFired++;

  //Change cell status
  if(newMyCellsStatus[x][y] === "") {
    newMyCellsStatus[x][y] = "shotted";
  }
  if(newMyCellsStatus[x][y] === "ship") {
    newMyCellsStatus[x][y] = "hit";
    newShips[id].lifes = newShips[id].lifes -1;
    newAiHitShots++;

    //Checking if the ship still has life, if it doesn't, shoot it and sink it
    if(newShips[id].lifes === 0) {
      newMyCellsStatus = this.sinkShip(newShips[id].x, newShips[id].y, newShips[id].rotated, newShips[id].mast, newMyCellsStatus);
    }
  }

  //Check is player win
  this.chceckIsWin(newShips, "ai");

  this.setState({
    statusOfMyGameBoard: newMyCellsStatus,
    ships: newShips,
    aiShotsFired: newAiShotsFired,
    aiHitShots: newAiHitShots
  })
}

//Comuter shot(inteligent algorytm)
aiInteligentShot = () => {
  //Copy of variables
  let newMyCellsStatus = JSON.parse(JSON.stringify(this.state.statusOfMyGameBoard));
  const newShips = JSON.parse(JSON.stringify(this.state.ships));
  const newShipsOnMyGameBoard = JSON.parse(JSON.stringify(this.state.shipsOnMyGameBoard));
  let newAiPreviusPreviusShot = JSON.parse(JSON.stringify(this.state.aiPreviusPreviusHitShot));
  let newAiPreviusShot = JSON.parse(JSON.stringify(this.state.aiPreviusHitShot));

  let newAiShotsFired = this.state.aiShotsFired;
  let newAiHitShots = this.state.aiHitShots;

  //Add computer shot to statistics
  newAiShotsFired++;

  if(newAiPreviusShot[0] === -1 && newAiPreviusShot[1] === -1) {
    let needToRandomAgain = true;

    let x = -1;
    let y = -1;
  
    while(needToRandomAgain) {
      x = Math.floor(Math.random()*10);
      y = Math.floor(Math.random()*10);
      if(newMyCellsStatus[x][y] !== "shotted" && newMyCellsStatus[x][y] !== "hit" && newMyCellsStatus[x][y] !== "sinked") {
        needToRandomAgain = false;
      }
    }

    const id = this.state.shipsOnMyGameBoard[x][y];

    if(newMyCellsStatus[x][y] === "") {
      newMyCellsStatus[x][y] = "shotted";
    }
    if(newMyCellsStatus[x][y] === "ship") {
      newMyCellsStatus[x][y] = "hit";
      newAiPreviusShot = [x, y];
      newShips[id].lifes = newShips[id].lifes -1;
      newAiHitShots++;
  
      if(newShips[id].lifes === 0) {
        newMyCellsStatus = this.sinkShip(newShips[id].x, newShips[id].y, newShips[id].rotated, newShips[id].mast, newMyCellsStatus);
        newAiPreviusShot = [-1, -1];
      }
    }
  } else if(newAiPreviusShot[0] !== -1 && newAiPreviusShot[1] !== -1 && newAiPreviusPreviusShot[0] !== -1 && newAiPreviusPreviusShot[1] !== -1) {
      let x = -1;
      let y = -1;

      if(newAiPreviusShot[0] === newAiPreviusPreviusShot[0]) {
        x = newAiPreviusShot[0];

        const smallerY = Math.min(newAiPreviusShot[1], newAiPreviusPreviusShot[1]);
        const biggerY = Math.max(newAiPreviusShot[1], newAiPreviusPreviusShot[1]);

        if(smallerY - 1 >= 0) {
          if(newMyCellsStatus[x][smallerY - 1] === "ship" || newMyCellsStatus[x][smallerY - 1] === "") {
            y = smallerY - 1;
          } else if(newMyCellsStatus[x][smallerY - 1] === "hit") {
            if(smallerY - 2 >= 0) {
              if(newMyCellsStatus[x][smallerY - 2] === "ship" || newMyCellsStatus[x][smallerY - 2] === "") {
                y = smallerY - 2;
              }
            }
          }
        }
        if(biggerY + 1 <= 9 && y === -1) {
          if(newMyCellsStatus[x][biggerY + 1] === "ship" || newMyCellsStatus[x][biggerY + 1] === "") {
            y = biggerY + 1;
          } else if(newMyCellsStatus[x][biggerY + 1] === "hit") {
            if(smallerY + 2 <= 9) {
              if(newMyCellsStatus[x][biggerY + 2] === "ship" || newMyCellsStatus[x][biggerY + 2] === "") {
                y = biggerY + 2;
              }
            }
          }
        }
  } else if(newAiPreviusShot[1] === newAiPreviusPreviusShot[1]) {
        y = newAiPreviusShot[1];

        const smallerX = Math.min(newAiPreviusShot[0], newAiPreviusPreviusShot[0]);
        const biggerX = Math.max(newAiPreviusShot[0], newAiPreviusPreviusShot[0]);

        if(smallerX - 1 >= 0) {
          if(newMyCellsStatus[smallerX - 1][y] === "ship" || newMyCellsStatus[smallerX - 1][y] === "") {
            x = smallerX - 1;
          } else if(newMyCellsStatus[smallerX - 1][y] === "hit") {
            if(smallerX - 2 >= 0 && smallerX - 2 <= 9) {
              if(newMyCellsStatus[smallerX - 2][y] === "ship" || newMyCellsStatus[smallerX - 2][y] === "") {
                x = smallerX - 2;
              }
            }
          }
        }
        if(biggerX + 1 <= 9 && x === -1) {
          if(newMyCellsStatus[biggerX + 1][y] === "ship" || newMyCellsStatus[biggerX + 1][y] === "") {
            x = biggerX + 1;
          } else if(newMyCellsStatus[biggerX + 1][y] === "hit") {
            if(biggerX + 2 <= 9) {
              if(newMyCellsStatus[biggerX + 2][y] === "ship" || newMyCellsStatus[biggerX + 2][y] === "") {
                x = biggerX + 2;
              }
            }
          }
        }
      }

      const id = newShipsOnMyGameBoard[x][y];

      if(newMyCellsStatus[x][y] === "") {
        newMyCellsStatus[x][y] = "shotted";
      }
      if(newMyCellsStatus[x][y] === "ship") {
        newMyCellsStatus[x][y] = "hit";
        newShips[id].lifes = newShips[id].lifes -1;
        newAiHitShots++;
    
        if(newShips[id].lifes === 0) {
          newMyCellsStatus = this.sinkShip(newShips[id].x, newShips[id].y, newShips[id].rotated, newShips[id].mast, newMyCellsStatus);

          newAiPreviusPreviusShot = [-1, -1];
          newAiPreviusShot = [-1, -1];
        }
      }
  } else if (newAiPreviusShot[0] !== -1 && newAiPreviusShot[1] !== -1 && newAiPreviusPreviusShot[0] === -1 && newAiPreviusPreviusShot[1] === -1) {    
    let needToRandomAgain = true;

    let x = -1;
    let y = -1;

    let randomNumber = Math.floor(Math.random()*4);

    while(needToRandomAgain) {
      switch (randomNumber) {
        case 0:
          if(newAiPreviusShot[1] - 1 >= 0 ) {
            if(newMyCellsStatus[newAiPreviusShot[0]][newAiPreviusShot[1] - 1] !== "shotted" && newMyCellsStatus[newAiPreviusShot[0]][newAiPreviusShot[1] - 1] !== "sinked" && newMyCellsStatus[newAiPreviusShot[0]][newAiPreviusShot[1] - 1] !== "hit") {
              x = newAiPreviusShot[0];
              y = newAiPreviusShot[1] - 1;
            }
          }
          break;
        case 1:
          if(newAiPreviusShot[0] + 1 <= 9) {
            if(newMyCellsStatus[newAiPreviusShot[0] + 1][newAiPreviusShot[1]] !== "shotted" && newMyCellsStatus[newAiPreviusShot[0] + 1][newAiPreviusShot[1]] !== "sinked" && newMyCellsStatus[newAiPreviusShot[0] + 1][newAiPreviusShot[1]] !== "hit") {
              x = newAiPreviusShot[0] + 1;
              y = newAiPreviusShot[1];
            }
          }
          break;
        case 2:
          if(newAiPreviusShot[1] + 1 <= 9) {
            if(newMyCellsStatus[newAiPreviusShot[0]][newAiPreviusShot[1] + 1] !== "shotted" && newMyCellsStatus[newAiPreviusShot[0]][newAiPreviusShot[1] + 1] !==  "sinked"  && newMyCellsStatus[newAiPreviusShot[0]][newAiPreviusShot[1] + 1] !==  "hit") {
              x = newAiPreviusShot[0];
              y = newAiPreviusShot[1] + 1;
            }
          }
          break;
        case 3:
          if(newAiPreviusShot[0] - 1 >= 0) {
            if(newMyCellsStatus[newAiPreviusShot[0] - 1][newAiPreviusShot[1]] !== "shotted" && newMyCellsStatus[newAiPreviusShot[0] - 1][newAiPreviusShot[1]] !== "sinked" && newMyCellsStatus[newAiPreviusShot[0] - 1][newAiPreviusShot[1]] !== "hit") {
              x = newAiPreviusShot[0] - 1;
              y = newAiPreviusShot[1];
            }
          }
          break;
        default:
          break;
      }
      if(x !== -1 && y !== -1) {
        needToRandomAgain = false;
      }
      randomNumber++;
      if(randomNumber === 4) randomNumber = 0;
    }

    const id = newShipsOnMyGameBoard[x][y];

    if(newMyCellsStatus[x][y] === "") {
      newMyCellsStatus[x][y] = "shotted";
    }
    if(newMyCellsStatus[x][y] === "ship") {
      newMyCellsStatus[x][y] = "hit";
      newShips[id].lifes = newShips[id].lifes - 1;
      newAiHitShots++;
      newAiPreviusPreviusShot = newAiPreviusShot;
      newAiPreviusShot = [x, y];
  
      if(newShips[id].lifes === 0) {
        newMyCellsStatus = this.sinkShip(newShips[id].x, newShips[id].y, newShips[id].rotated, newShips[id].mast, newMyCellsStatus);

        newAiPreviusPreviusShot = [-1, -1];
        newAiPreviusShot = [-1, -1];
      }
    }
  }

  //Check is player win
  this.chceckIsWin(newShips, "ai");

  this.setState({
    statusOfMyGameBoard: newMyCellsStatus,
    ships: newShips,
    aiShotsFired: newAiShotsFired,
    aiHitShots: newAiHitShots,
    aiPreviusPreviusHitShot: newAiPreviusPreviusShot,
    aiPreviusHitShot: newAiPreviusShot
  })
}

//Reset/new game funtion
newGame = () => {
  this.setState({
    ships: JSON.parse(JSON.stringify(ships)),
    aiShips: JSON.parse(JSON.stringify(ships)),

    stageOfTheGame: "shipSubmitting",

    statusOfMyGameBoard: Array.from({length: 10}, (column, columnID) => Array.from({length: 10}, (row, rowID) => "")),
    statusOfAiGameBoard: Array.from({length: 10}, (column, columnID) => Array.from({length: 10}, (row, rowID) => "")),
  
    shipsOnMyGameBoard: Array.from({length: 10}, (column, columnID) => Array.from({length: 10}, (row, rowID) => "")),
    shipsOnAiGameBoard: Array.from({length: 10}, (column, columnID) => Array.from({length: 10}, (row, rowID) => "")),
  
    nowShipID: -1,
    temporaryShipCordinatesX: -1,
    temporaryShipCordinatesY: -1,
    prevRotatedShipPreview: false,
  
    allShipsSubmitted: false,
    allAiShipsSubmitted: false,
  
    gameEnded: false,

    shotsFired: 0,
    hitShots: 0,
  
    aiShotsFired: 0,
    aiHitShots: 0,
  })
}

render() {
  return (
    <div className="appShips">
      <Settings notification={this.state.notification} handleNotification={this.handleNotification} blindGame={this.state.blindGame} handleBlindGame={this.handleBlindGame} mode={this.state.mode} handleMode={this.handleMode} reset={this.newGame}/>
      <ReactNotification />
    <h1 className="gameTitle">SykiShips</h1>
      <div className="stats">
        <Header score={this.state.score}/>
        {this.shipOneByOneRender()}
        {this.state.gameEnded ? <button className="newGameButton" onClick={this.newGame}>Nowa gra</button> : ""}
        {this.state.allShipsSubmitted && !this.state.gameEnded ? <Statistics shots={this.state.shotsFired} aiShots={this.state.aiShotsFired} hitShots={this.state.hitShots} aiHitShots={this.state.aiHitShots} statusOfMyGameBoard={this.state.statusOfMyGameBoard} statusOfAiGameBoard={this.state.statusOfAiGameBoard} myShips={this.state.ships} aiShips={this.state.aiShips}/> : ""}
      </div>
      <GameBoard type="myGameBoard" gameBoard={this.state.myGameBoard}/>
      <GameBoard type="aiGameBoard" gameBoard={this.state.aiGameBoard}/>
      <Instruction stage={this.state.stageOfTheGame}/>
    </div>
  );
}
}

export default App;
