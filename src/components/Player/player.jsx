import "./player.css";
import React, { Component } from "react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="player card">
        <div className="score">{this.props.score}</div>
      </div>
    );
  }
}

export default Player;
