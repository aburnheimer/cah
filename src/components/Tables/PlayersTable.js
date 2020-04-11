import React from "react";

class PlayersTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.teamNameByTeamId = this.teamNameByTeamId.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  teamNameByTeamId(teamId) {
    var ret = null;
    if(teamId && this.props.teams) {
      var r = this.props.teams.filter(team => team.TeamId.S === teamId);
      if(r.length > 0) ret = r[0].Name.S;
    };
    return ret;
  }

  render() {
    const tableStyle = {
      fontSize: "small",
      textAlign: "left",
      width: "100%"
    };
    const theadStyle = {
      fontWeight: "bold"
    };
    const tdBoolStyle = {
      width: "4em",
      textAlign: "center"
    };

    return (
      <form>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <td></td>
              <td>Name</td>
              <td style={tdBoolStyle}>Admin</td>
              <td>Team</td>
            </tr>
          </thead>
          <tbody>
            {this.props.players.map((item, i) => {
              return(
                <tr key={i}>
                  <td><input type="radio"/></td>
                  <td>{item.GivenName.S} {item.FamilyName.S}</td>
                  <td style={tdBoolStyle}>{item.IsAdmin.BOOL?"yes":"no"}</td>
                  <td>{this.teamNameByTeamId(item.TeamId.S)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </form>
    );
  }
};

export default PlayersTable;
