import React from "react";

class TeamsTable extends React.Component {
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
                  <td>{item.CaptainId.S}</td>
                  <td style={tdNumStyle}>{item.SeqNum.N}</td>
                  <td>{item.GameId.S}</td>
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
