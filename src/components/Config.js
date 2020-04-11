import React from "react";
import ConfigCategory from "./ConfigCategory";

class Config extends React.Component {

  /* < 100 chars */
  render() {
    const contentStyle = {
      fontSize: "180%"
    };

    return (
      <div style={contentStyle}>
        <ConfigCategory category="Games" games={this.props.games} currentGame={this.props.currentGame}></ConfigCategory>
        <ConfigCategory category="Teams"></ConfigCategory>
        <ConfigCategory category="Players"></ConfigCategory>
        <ConfigCategory category="Rounds"></ConfigCategory>
        <ConfigCategory category="Clues"></ConfigCategory>
      </div>
    );
  }
};

export default Config;
