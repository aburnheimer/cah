import React from "react";

class PlayersTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
              <td>Admin</td>
              <td>Team</td>
            </tr>
          </thead>
          <tbody>
            {this.props.players.map((item, i) => {
              return(
                <tr key={i}>
                  <td><input type="radio"/></td>
                  <td>{item.GivenName.S} {item.FamilyName.S}</td>
                  <td>{item.IsAdmin.BOOL?"yes":"no"}</td>
                  <td>{item.TeamId.S}</td>
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
