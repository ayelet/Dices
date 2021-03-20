import "./board.css";
import React, { Component } from "react";
import Player from "../Player/player";
import Dice from "../Dice/dice";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numDice: 2,
      turn: 0,
      currentScore: 0,
      totalScore1: 0,
      playerTurn: 0,
      diceScore1: 3,
      diceScore2: 3,
      diceRoll1: false,
      diceRoll2: false,
      players: [{ totalScre: 0 }, { totalScore: 0 }],
      winThreshold: 100,
    };
  }

  rollDice = () => {
    let rand1 = Math.floor(Math.random() * 6) + 1; // [1,6]
    this.setState({ diceScore1: rand1 });
    let rand2 = Math.floor(Math.random() * 6) + 1; // [1,6]
    this.setState({ diceScore2: rand2 });
    this.setState({ diceRoll2: !this.state.diceRoll2 });
    this.setState({ diceRoll1: !this.state.diceRoll1 });
    this.setState({ currentScore: this.state.currentScore + rand1 + rand2 });
    console.log("current Score afyer update: ", this.state.currentScore);
  };

  bank = () => {
    this.setState({
      totalScore1: this.state.totalScore1 + this.state.currentScore,
    });
  };

  endRound = () => {
// round is over, reset all parameters
  }

  newGame = () => {
      
  }

  changeTurn() {
    let nextPlayer = this.state.playerTurn + (1 % this.numPlayers);
    this.setState({ playerTurn: nextPlayer });
  }

  render() {
    return (
      <div className="container">
        <div className="board">
          <Player score={this.state.totalScore1} />
          <div className="dice-container">
            <Dice
              name={
                this.state.diceRoll1
                  ? "dice dice-roll-left"
                  : "dice dice-roll-right"
              }
              face={this.state.diceScore1}
            />
            <Dice
              name={
                this.state.diceRoll2
                  ? "dice dice-roll-left"
                  : "dice dice-roll-right"
              }
              face={this.state.diceScore2}
            />
          </div>
          <div className="current-score">{this.state.currentScore}</div>
          <button className="btn primary-btn" onClick={this.rollDice}>
            Roll
          </button>
          <button className="btn primary-btn" onClick={this.bank}>
            Bank
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
