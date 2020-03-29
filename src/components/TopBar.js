import React from "react";

class TopBar extends React.Component {
  render() {
    const topBarStyle = {
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

    return (
      <div style={topBarStyle}>
        <span>{this.props.secsRemaining}</span>
        <span>{this.props.cluesRemaining}</span>
        <span>{`⏏️`}</span>
      </div>
    );
  };
};

export default TopBar;
