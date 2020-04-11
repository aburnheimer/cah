import React from "react";
import GamesForm from "./Forms/GamesForm";
import GamesTable from "./Tables/GamesTable";
import PlayersTable from "./Tables/PlayersTable";
import TeamsTable from "./Tables/TeamsTable";

class ConfigCategory extends React.Component {

  render() {
    const contentStyle = {
    };
    const categoryControlsStyle = {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "flex-end"
    };
    const categoryLabelStyle = {
      marginBottom: 0,
      fontSize: "160%"
    };
    const controlInputStyle = {
      margin: "1ex",
      border: "solid 1px"
    };

    var tableReturn = null;
    if(this.props.category === "Games") {
      tableReturn = <GamesTable games={this.props.games}></GamesTable>
    } else if(this.props.category === "Players") {
      tableReturn = <PlayersTable players={this.props.players}></PlayersTable>
    } else if(this.props.category === "Teams") {
      tableReturn = <TeamsTable teams={this.props.teams}></TeamsTable>
    }
    return (
      <div style={contentStyle}>
        <div style={ { display: "flex", justifyContent: "space-between" } }>
          <h3 style={categoryLabelStyle}>{this.props.category}</h3>
          <div style={categoryControlsStyle}>
            <input style={controlInputStyle} type="button" value="Delete"/>
            <input style={controlInputStyle} type="button" value="Edit"/>
            <input style={controlInputStyle} type="button" value="Create"/>
          </div>
        </div>
        { tableReturn }
      </div>
    );
  }
};

export default ConfigCategory;
