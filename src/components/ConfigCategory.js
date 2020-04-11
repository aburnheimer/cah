import React from "react";
import GamesForm from "./Forms/GamesForm";

class ConfigCategory extends React.Component {

  render() {
    const categoryControlsStyle = {
      display: "flex",
      alignItems: "flex-end"
    };
    const categoryLabelStyle = {
      marginBottom: 0
    };

    return (
      <div>
        <div style={categoryControlsStyle}>
          <h2 style={categoryLabelStyle}>{this.props.category}</h2>
          <input type="button" value="Create"/>
          <input type="button" value="Edit"/>
          <input type="button" value="Delete"/>
        </div>
      </div>
    );
  }
};

// <GamesForm games={this.props.games}
//     currentGame={this.props.currentGame}/>

export default ConfigCategory;
