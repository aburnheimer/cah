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
      contentLegible: true,
      clueId: "",
      clueText: ""
    };
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

  fetchNextClue() {
    axios.get('resource', { params: { TableName: "cah-clue" } })
      .then(res => {

          var fetchedClueId = "";
          var fetchedClueText = "";
          for (let key in res.data.Items) {
            if(!res.data.Items[key].Guessed.BOOL){
              fetchedClueId=res.data.Items[key].ClueId.S;
              fetchedClueText=res.data.Items[key].Text.S;
              break;
            }
          }
          this.setState({clueId: fetchedClueId})
          this.setState({clueText: fetchedClueText})
      })
      .catch(err => {
          console.error("fetchNextClue: " + err);
      });

    }

  render() {
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 75,
      footerMenuHeight: 90
    };

    const initialMenuItems = [
      { icon: `▶️`, text: "Next", clickFunction: () => { this.fetchNextClue() } },
      { icon: `💭`, text: "Show", clickFunction: () => { this.setState({contentLegible: !this.state["contentLegible"]}) } },
      { icon: `⏭`, text: "Skip" }
    ];

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: "100vh",
          position: "relative"
        }}
      >
        <TopBar styles={styles} />
        <Content styles={styles} blur={this.state.contentLegible}  clueText={this.state.clueText}/>
        <FooterMenu initialMenuItems={initialMenuItems} styles={styles}/>
      </div>
    );
  }
}

export default App;
