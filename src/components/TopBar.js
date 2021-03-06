import React from "react";

class TopBar extends React.Component {
  timeRunStop = (timeRunning) => {
    var style={};
    style["color"]=timeRunning?"limeGreen":"tomato";
    return style;
  }

  topBarStyle = () => {
    var style = {
      position: "fixed",
      top: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "150%",
      width: "100%",
      height: this.props.styles.topBarHeight,
      backgroundColor: this.props.styles.white(),
      borderBottom: `1px solid ${this.props.styles.black(0.1)}`,
      fontWeight: "bold",
      padding: "0px 20px",
      boxSizing: "border-box"
    };
    if(this.props.currentRound <= 0) style["display"] = "none"
    return style;
  }

  render() {
    return (
      <div style={this.topBarStyle()}>
        <div style={this.timeRunStop(this.props.timeRunning)} onClick={()=>this.props.clickFunction()}>
          <span>{this.props.secsRemaining}</span>
        </div>
        <div>
          <span>{this.props.cluesRemaining}</span>
        </div>
        <div>
          <span>{`⏏️`}</span>
        </div>
      </div>
    );
  };
};

export default TopBar;
