import React from "react";

class GamesTable extends React.Component {
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
              <td style={tdNumStyle}>Num of Teams</td>
              <td style={tdNumStyle}>Num of Rounds</td>
              <td style={tdNumStyle}>Current Round</td>
            </tr>
          </thead>
          <tbody>
            {this.props.games.map((item, i) => {
              return(
                <tr key={i}>
                  <td><input type="radio"/></td>
                  <td>{item.Name.S}</td>
                  <td style={tdNumStyle}></td>
                  <td style={tdNumStyle}>{item.NumRounds.N}</td>
                  <td style={tdNumStyle}>{item.CurrentRound.N}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </form>
    );
  }
};

export default GamesTable;
