import "./board.css";

import React, { Component } from "react";
import Player from "../Player/player";
import Dice from "../Dice/dice";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [
        { name: "Player 1", totalScore: 0, wins: 0 },
        { name: "Player 2", totalScore: 0, wins: 0 },
      ],
      numDice: 2,
      turn: 0,
      currentScore: 0,
      totalScore1: 0,
      playerTurn: 0,
      diceScore1: 3,
      diceScore2: 3,
      diceRoll: false,
      //   diceRoll2: false,
      //   players: [{ totalScre: 0 }, { totalScore: 0 }],
      winThreshold: 100,
      shake: false,
    };
  }

  rollDice = () => {
    let rand1 = Math.floor(Math.random() * 6) + 1; // [1,6]
    let rand2 = Math.floor(Math.random() * 6) + 1; // [1,6]
    this.setState({ diceScore1: rand1 });
    this.setState({ diceScore2: rand2 });
    this.setState({ diceRoll: !this.state.diceRoll });
    let sum = rand1 + rand2;
    if (sum !== 12) {
      this.setState({ currentScore: this.state.currentScore + sum });
      console.log("current Score after update: ", this.state.currentScore);
    } else {
      this.shakeCubes();
      this.resetCurrentScore();
      this.changeTurn();
    }
    console.log(this.state.players[0]);
  };

  // Shake to cubes when player hits 6-6
  shakeCubes = () => {
    console.log("shaking cubes");
    this.setState({ shake: true });
    setTimeout(() => {
      this.setState({ shake: false });
    }, 1000);
  };

  resetCurrentScore = () => {
    this.setState({ currentScore: 0 });
  };

  // Store all the points in this round and move turn to next player
  bank = () => {
    let players = [...this.state.players];
    let turn = this.state.playerTurn;
    players[turn].totalScore += this.state.currentScore;
    this.setState({
      players: players,
    });
    if (players[turn].totalScore > this.state.winThreshold) {
      this.endRound(0); //
    }
    this.resetCurrentScore();
    this.changeTurn();
  };

  //end the current round, either by a win (1) or by user choosing new game (2)
  endRound = (status) => {
    if (status === 1) {
      // display a win message to the user
    }
    // round is over, reset all parameters
  };
  //TODO:implement
  newGame = () => {};

  // Change the turn to the next player
  changeTurn() {
    let numPlayers = this.state.players.length;
    let nextPlayer = (this.state.playerTurn + 1) % numPlayers;
    console.log("Change turn: ", nextPlayer, numPlayers);
    this.setState({ playerTurn: nextPlayer });
  }

  // Return the class name of the dices according to game state
  getDiceClassName = (i) => {
    let name = "dice ";
    name += this.state.diceRoll ? "dice-roll-left " : "dice-roll-right ";
    name += this.state.shake ? " shake" : "";
    // console.log("dice: ", name);
    return name;
  };

  setWinThreshold = (e) => {
    console.log(e.target.value);
    if (e.target.value <= 0) return;
    this.setState({ winThreshold: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="board">
          <div className="players">
            {this.state.players.map((player, i) => {
              return (
                <Player
                  key={this.state.players[i].name}
                  name={this.state.players[i].name}
                  score={this.state.players[i].totalScore}
                  classname={i === this.state.playerTurn ? "" : "step-back"}
                />
              );
            })}
          </div>
          <div className="dice-container">
            <Dice name={this.getDiceClassName()} face={this.state.diceScore1} />
            <Dice name={this.getDiceClassName()} face={this.state.diceScore2} />
          </div>
          <div className="control">
            <div className="card current-score">
              {this.state.players[this.state.playerTurn].name +
                " current Score: " +
                this.state.currentScore}
            </div>
            <button className="btn1 glow" onClick={this.rollDice}>
              Roll
            </button>
            <button className="btn1 glow" onClick={this.bank}>
              Bank
            </button>
            <input
              className="btn1 glow"
              type="number"
              value={this.state.winThreshold}
              // diabled="true"
              onChange={this.setWinThreshold}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
