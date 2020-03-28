/* Started from https://codeburst.io/how-to-build-fully-responsive-react-apps-with-nothing-but-inline-styles-and-javascript-242c091b6ba1 */
import React, { Component } from "react";
import TopBar from "./components/TopBar";
import FooterMenu from "./components/FooterMenu";
import Content from "./components/Content";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentLegible: true,
      clueText: "Lorem ipsum dolor"
    };
  }

  render() {
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 75,
      footerMenuHeight: 90
    };

    const initialMenuItems = [
      { icon: `▶️`, text: "Next" },
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
