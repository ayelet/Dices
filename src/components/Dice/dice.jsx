import "./dice.css";
import React, { Component } from "react";

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 76 };
  }

  render() {
    return <div className={this.props.name}>{this.props.face}</div>;
  }
}

export default Dice;
