import "./dice.css";

import React, { Component } from "react";

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 76 };
  }

  renderCubeFace() {
    console.log("Render cube face ", this.props.name);
    switch (this.props.face) {
      case 1:
        return <i className="fas fa-3x fa-dice-one"></i>;
      case 2:
        return <i className="fas fa-3x fa-dice-two"></i>;
      case 3:
        return <i className="fas fa-3x fa-dice-three"></i>;
      case 4:
        return <i className="fas fa-3x fa-dice-four"></i>;
      case 5:
        return <i className="fas fa-3x fa-dice-five"></i>;
      case 6:
        return <i className="fas fa-3x fa-dice-six"></i>;
      default:
        return "";
    }
  }

  render() {
    return <div className={this.props.name}>{this.renderCubeFace()}</div>;
  }
}

export default Dice;
