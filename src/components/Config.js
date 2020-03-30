import React from "react";
import GamesForm from "./Forms/GamesForm";

class Config extends React.Component {

  /* < 100 chars */
  render() {
    const contentStyle = {
      fontSize: "180%"
    };

    return (
      <div style={contentStyle}>
        <div>
          <h2 className="category">Games</h2>
          <GamesForm games={this.props.games}
              currentGame={this.props.currentGame}></GamesForm>
          <h2 className="category">Teams</h2>
          <h2 className="category">Players</h2>
          <h2 className="category">Rounds</h2>
          <h2 className="category">Clues</h2>
        </div>
      </div>
    );
  }
};

export default Config;
