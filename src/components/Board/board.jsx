import "./board.css";
import React, { Component } from "react";
import Player from "../Player/player";
import Dice from "../Dice/dice";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { diceScore: 0 };
  }

  rollDice = () => {
    let rand = Math.floor(Math.random() * 6) + 1; // [1,6]
    this.setState({ diceScore: rand, diceRoll: false });
    this.setState({ diceRoll: !this.state.diceRoll });
  };

  render() {
    return (
      <div className="container">
        <div className="board">
          <Player />
          <Dice
            name={this.state.diceRoll ? "dice-roll" : "dice"}
            face={this.state.diceScore}
          />
          <button className="btn primary-btn" onClick={this.rollDice}>
            Roll
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
