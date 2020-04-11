/* Started from https://codeburst.io/how-to-build-fully-responsive-react-apps-with-nothing-but-inline-styles-and-javascript-242c091b6ba1 */
import React, { Component } from "react";
import TopBar from "./components/TopBar";
import FooterMenu from "./components/FooterMenu";
import Content from "./components/Content";
import Config from "./components/Config";
import axios from './Axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentLegible: false,
      clueId: "",
      clueText: "",
      cluesRemaining: 0,
      timeRunning: false,
      secsRemaining: 60,
      initialClue: true,
      games: [],
      teams: [],
      players: [],
      currentGame: {},
      currentRound: 0
    };
    setInterval(function(ctx){
      if(ctx.state.timeRunning) {
        ctx.setState({secsRemaining: ctx.state.secsRemaining - 1});
      }
      if(ctx.state.secsRemaining <= 0) {
        ctx.setState({contentLegible: true, clueId: "",
            clueText: "`❌` Time's UP! `❌`", timeRunning: false,
            initialClue: true });
      }

    }, 1000, this);
  }

  fetchAllGames() {
    axios.get('resource', { params: { TableName: "cah-game" } })
      .then(res => {
          var fetchedGamesList = [];
          for (let key in res.data.Items) {
            fetchedGamesList.push({
                ...res.data.Items[key]
            });
          }
          this.setState({games: fetchedGamesList})
      })
      .catch(err => {
        console.error("fetchAllGames: " + err);
      });
  }


  fetchAllTeams() {
    axios.get('resource', { params: { TableName: "cah-team" } })
      .then(res => {
          var fetchedTeamsList = [];
          for (let key in res.data.Items) {
            fetchedTeamsList.push({
                ...res.data.Items[key]
            });
          }
          this.setState({teams: fetchedTeamsList})
      })
      .catch(err => {
        console.error("fetchAllTeams: " + err);
      });
  }

  fetchAllPlayers() {
    axios.get('resource', { params: { TableName: "cah-player" } })
      .then(res => {
          var fetchedPlayersList = [];
          for (let key in res.data.Items) {
            fetchedPlayersList.push({
                ...res.data.Items[key]
            });
          }
          this.setState({players: fetchedPlayersList})
      })
      .catch(err => {
        console.error("fetchAllPlayers: " + err);
      });
  }

  fetchAllClues() {
    axios.get('resource', { params: { TableName: "cah-clue" } })
      .then(res => {
          const fetchedCluesList = [];
          for (let key in res.data.Items) {
            fetchedCluesList.push({
                ...res.data.Items[key]
            });
          }
          this.setState({clues: fetchedCluesList})
      })
      .catch(err => {
        console.error("fetchAllClues: " + err);
      });
  }

  fetchNextClue(guessedClue=false, initialClue=false) {
    var queryParams = {};
    if(guessedClue && this.state.clueId.length > 0 ){
      queryParams["params"] = {};
      queryParams["params"]["guessedClue"] = this.state.clueId;
    }

    axios.get('action/fetchNextClue', queryParams)
      .then(res => {
          this.setState({clueId: res.data.ClueId, clueText: res.data.Text,
              cluesRemaining: res.data.CluesRemaining, timeRunning: true,
              contentLegible: true});
          if(initialClue) this.setState({secsRemaining: 60, initialClue: false});
          setTimeout(function(ctx){ if (ctx.state.timeRunning)
              ctx.setState({contentLegible: false}); }, 3000, this);
      })
      .catch(err => {
          console.error("fetchNextClue: " + err);
      });

    }

  toggleLegible() {
    if (this.state.timeRunning){
      if(this.state.contentLegible){
        this.setState({contentLegible: false});
      } else {
        this.setState({contentLegible: true});
        setTimeout(function(ctx){ if (ctx.state.timeRunning)
            ctx.setState({contentLegible: false}); }, 3000, this);
      }
    }
  }

  toggleTimeRunning() {
    if(this.state.timeRunning){
      this.setState({timeRunning: false, contentLegible: false});
    } else {
      this.setState({timeRunning: true});
    }
  }

  componentDidMount() {
    this.fetchAllGames();
    this.fetchAllTeams();
    this.fetchAllPlayers();
  }

  render() {
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 75,
      footerMenuHeight: 90
    };

    const clueMenuItems = [
      { icon: `▶️`, text: "Next", clickFunction: () => {
          this.fetchNextClue(true, this.state.initialClue) } },
      { icon: `💭`, text: "Show", clickFunction: () => { this.toggleLegible() } },
      { icon: `⏭`, text: "Skip", clickFunction: () => {
          this.fetchNextClue(false, this.state.initialClue) } }
    ];

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: "100vh",
          margin: "0 auto",
          maxWidth: "1024px",
          position: "relative"
        }}
      >
        <TopBar styles={styles} clickFunction={() => { this.toggleTimeRunning() }}
            timeRunning={this.state.timeRunning}
            secsRemaining={this.state.secsRemaining}
            cluesRemaining={this.state.cluesRemaining}
            currentRound={this.state.currentRound} />
        <Config styles={styles} currentRound={this.state.currentRound}
            games={this.state.games} currentGame={this.state.currentGame}
            teams={this.state.teams} players={this.state.players} />
        <Content styles={styles} blur={!this.state.contentLegible}
            clueText={this.state.clueText}
            currentRound={this.state.currentRound} />
        <FooterMenu menuItems={clueMenuItems} styles={styles}
        currentRound={this.state.currentRound} />
      </div>
    );
  }
}

export default App;
