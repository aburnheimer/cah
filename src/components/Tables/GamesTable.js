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
      textAlign: "center",
      width: "100%"
    };
    const theadStyle = {
      fontWeight: "bold"
    };
    const tdTextStyle = {
      textAlign: "left"
    };
    const tdNumStyle = {
      width: "4em"
    };

    return (
      <form>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <td></td>
              <td style={tdTextStyle}>Name</td>
              <td style={tdNumStyle}>Current Round</td>
              <td style={tdNumStyle}>Num of Rounds</td>
            </tr>
          </thead>
          <tbody>
            {this.props.games.map((item, i) => {
              return(
                <tr key={i}>
                  <td><input type="radio"/></td>
                  <td style={tdTextStyle}>{item.Name.S}</td>
                  <td>{item.CurrentRound.N}</td>
                  <td>{item.NumRounds.N}</td>
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
