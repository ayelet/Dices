import "./dice.css";

import React, { Component } from "react";

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static dict = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
  };

  render() {
    return (
      <div className={this.props.name + ` glow`}>
        <i
          className={`glow fas fa-3x fa-dice-${Dice.dict[this.props.face]}`}
        ></i>
      </div>
    );
  }
}

export default Dice;
