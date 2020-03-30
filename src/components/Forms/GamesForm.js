import React from "react";

class GamesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'grapefruit'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Name</td>
              <td>Current Round</td>
              <td>Num. of Round</td>
            </tr>
          </thead>
          <tbody>
            {this.props.games.map((item, i) => {
              return(
                <tr key={i}>
                  <td><input type="radio"/></td>
                  <td>{item.Name.S}</td>
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

export default GamesForm;
