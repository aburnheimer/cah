import React from "react";

class Content extends React.Component {
  blurredStyle=(b)=>{
    var style = {}
    if(b){
      style={
        color: "transparent",
        textShadow: "0 0 30px rgba(0,0,0,0.75)"
      }
    }
    style["textAlign"] = "center"
    return style;
  }

  contentStyle = () => {
    var style = {
      fontSize: "180%",
      paddingTop: this.props.styles.topBarHeight + 20,
      marginLeft: "auto",
      marginRight: "auto"
    }
    if(this.props.currentRound <= 0) style["display"] = "none"
    return style;
  };

  /* < 100 chars */
  render() {
    return (
      <div style={this.contentStyle()}>
        <div style={{ marginBottom: 40 }}>
          <h2 id="clue" style={this.blurredStyle(this.props.blur)}>{this.props.clueText}</h2>
        </div>
      </div>
    );
  }
};

export default Content;
