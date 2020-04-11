import React from "react";

class TeamsTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  playerNameByPlayerId(playerId) {
    var ret = null;
    if(playerId && this.props.players) {
      var r = this.props.players.filter(player => player.PlayerId.S === playerId);
      if(r.length > 0) ret = [r[0].GivenName.S, r[0].FamilyName.S].join(" ");
    };
    return ret;
  }

  gameNameByGameId(gameId) {
    var ret = null;
    if(gameId && this.props.games) {
      var r = this.props.games.filter(game => game.GameId.S === gameId);
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
    const tdNumStyle = {
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
              <td>Captain</td>
              <td style={tdNumStyle}>Order</td>
              <td>Game</td>
            </tr>
          </thead>
          <tbody>
            {this.props.teams.map((item, i) => {
              return(
                <tr key={i}>
                  <td><input type="radio"/></td>
                  <td>{item.Name.S}</td>
                  <td>{this.playerNameByPlayerId(item.CaptainId.S)}</td>
                  <td style={tdNumStyle}>{item.SeqNum.N}</td>
                  <td>{this.gameNameByGameId(item.GameId.S)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </form>
    );
  }
};

export default TeamsTable;
