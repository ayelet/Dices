import "./player.css";
import React, { Component } from "react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={`player card ${this.props.classname}`}>
        <h1 className="title">{this.props.name}</h1>
        <div className={`score`}>{this.props.score}</div>
      </div>
    );
  }
}

export default Player;
