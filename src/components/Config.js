import React from "react";
import ConfigCategory from "./ConfigCategory";

class Config extends React.Component {

  /* < 100 chars */
  render() {
    const contentStyle = {
    };

    return (
      <div style={contentStyle}>
        <ConfigCategory category="Games" games={this.props.games} currentGame={this.props.currentGame}></ConfigCategory>
        <ConfigCategory category="Teams" teams={this.props.teams}></ConfigCategory>
        <ConfigCategory category="Players" players={this.props.players}></ConfigCategory>
      </div>
    );
  }
};

export default Config;
