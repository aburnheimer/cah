import React from "react";

const Content = ({ styles }) => {
  const clue = {
    text:
      "Lorem ipsum dolor"
  };

  const contentStyle = {
    fontSize: "180%",
    paddingTop: styles.topBarHeight + 20,
    marginLeft: "auto",
    marginRight: "auto"
  };

  /* < 100 chars */
  return (
    <div style={contentStyle}>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ textAlign: "center" }}>{clue.text}</h2>
      </div>
    </div>
  );
};

export default Content;
