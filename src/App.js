/* Started from https://codeburst.io/how-to-build-fully-responsive-react-apps-with-nothing-but-inline-styles-and-javascript-242c091b6ba1 */
import React, { Component } from "react";
import TopBar from "./components/TopBar";
import FooterMenu from "./components/FooterMenu";
import Content from "./components/Content";
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
    };
    setInterval(function(ctx){
      if(ctx.state.timeRunning) {
        ctx.setState({secsRemaining: ctx.state.secsRemaining - 1});
      }
      if(ctx.state.secsRemaining < 0) {
        ctx.setState({timeRunning: false, secsRemaining: 60,
            clueText: `❌` + " Time's UP! " + `❌`});
        ctx.setState({contentLegible: true})
      }

    }, 1000, this);
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

  fetchNextClue(guessedClue=false, firstClue=false) {
    var queryParams = {};
    if(guessedClue && this.state.clueId.length > 0 ){
      queryParams["params"] = {};
      queryParams["params"]["guessedClue"] = this.state.clueId;
    }

    axios.get('action/fetchNextClue', queryParams)
      .then(res => {
          this.setState({clueId: res.data.ClueId});
          this.setState({clueText: res.data.Text});
          this.setState({cluesRemaining: res.data.CluesRemaining});
          this.setState({timeRunning: true});
          if(firstClue) this.setState({secsRemaining: 60});
          this.setState({contentLegible: true})
          setTimeout(function(ctx){ if (ctx.state.timeRunning) ctx.setState({contentLegible: false}); }, 3000, this);
      })
      .catch(err => {
          console.error("fetchNextClue: " + err);
      });

    }

  toggleLegible() {
    if (this.state.timeRunning){
      if(this.state["contentLegible"]){
        this.setState({contentLegible: false});
      } else {
        this.setState({contentLegible: true});
        setTimeout(function(ctx){ if (ctx.state.timeRunning) ctx.setState({contentLegible: false}); }, 3000, this);
      }
    }
  }


  render() {
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 75,
      footerMenuHeight: 90
    };

    const initialMenuItems = [
      { icon: `▶️`, text: "Next", clickFunction: () => { this.fetchNextClue(true, !this.state.timeRunning) } },
      { icon: `💭`, text: "Show", clickFunction: () => { this.toggleLegible() } },
      { icon: `⏭`, text: "Skip", clickFunction: () => { this.fetchNextClue(false, !this.state.timeRunning) } }
    ];

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: "100vh",
          position: "relative"
        }}
      >
        <TopBar styles={styles} secsRemaining={this.state.secsRemaining}
            cluesRemaining={this.state.cluesRemaining} />
        <Content styles={styles} blur={!this.state.contentLegible}
            clueText={this.state.clueText}/>
        <FooterMenu initialMenuItems={initialMenuItems} styles={styles}/>
      </div>
    );
  }
}

export default App;
