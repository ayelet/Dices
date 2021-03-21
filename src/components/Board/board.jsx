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
      dices: [
        { score: 3, diceRoll: false },
        { score: 3, diceRoll: false },
      ],
      currentScore: 0,
      playerTurn: 0,
      winThreshold: 100,
      shake: false,
      newGame: false,
      gameOver: false,
    };
  }

  rollDice = () => {
    let sum = 0;
    let _dices = [];
    for (let i = 0; i < 2; i++) {
      let rand = Math.floor(Math.random() * 6) + 1; // [1,6]
      sum += rand;
      _dices.push({ score: rand, rollDice: !this.state.dices[i].rollDice });
    }

    this.setState({ dices: _dices });

    if (sum !== 12) {
      this.setState({ currentScore: this.state.currentScore + sum });
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
      return;
    }
    this.resetCurrentScore();
    this.changeTurn();
  };

  //end the current round, either by a win (1) or by user choosing new game (2)
  endRound = (status) => {
    this.setState({ gameOver: true });
    // round is over, reset all parameters
    // this.resetState();
  };

  resetState = () => {
    let newPlayers = [
      { name: "Player 1", totalScore: 0, wins: 0 },
      { name: "Player 2", totalScore: 0, wins: 0 },
    ];
    this.setState({ players: newPlayers });
    this.setState({
      dices: [
        { score: 3, diceRoll: false },
        { score: 3, diceRoll: false },
      ],
    });
    this.setState({ currentScore: 0 });
    this.setState({ playerTurn: 0 });
    this.setState({ winThreshold: 100 });
    this.setState({ shake: false });
    this.setState({ gameOver: false });
  };

  newGame = () => {
    this.setState({ newGame: true });

    this.resetState();

    setTimeout(() => {
      this.setState({ newGame: false });
    }, 1000);
  };

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
    name += this.state.dices[i].rollDice
      ? "dice-roll-left "
      : "dice-roll-right ";
    name += this.state.shake ? " shake" : "";
    return name;
  };

  setWinThreshold = (e) => {
    console.log(e.target.value);
    if (e.target.value <= 0) return;
    this.setState({ winThreshold: e.target.value });
  };

  renderGameOver() {
    if (!this.state.gameOver) return null;
    let winner = this.state.players[this.state.playerTurn].name;
    return (
      <div className="game-over">
        {`${winner} won!`}
        <button className="btn1" onClick={this.newGame}>
          Restart?
        </button>
      </div>
    );
  }

  render() {
    return (
      <div
        className={
          this.state.newGame || this.state.gameOver ? "board-grayed" : "board"
        }
      >
        {this.renderGameOver}
        <div className="control">
          <button className="btn1 glow" onClick={this.rollDice}>
            Roll
          </button>
          <button className="btn1 glow" onClick={this.bank}>
            Bank
          </button>
          <input
            className="btn1 btn2 glow"
            type="number"
            value={this.state.winThreshold}
            onChange={this.setWinThreshold}
          />
          <button className="btn1 glow" onClick={this.newGame}>
            New Game
          </button>
        </div>

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
          <Dice
            name={this.getDiceClassName(0)}
            face={this.state.dices[0].score}
          />
          <Dice
            name={this.getDiceClassName(1)}
            face={this.state.dices[1].score}
          />
        </div>
        <div className="score-container">
          <div className="card current-score">
            {this.state.players[this.state.playerTurn].name +
              " current Score: " +
              this.state.currentScore}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
