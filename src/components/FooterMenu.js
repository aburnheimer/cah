import React from "react";

class FooterMenu extends React.Component {

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          fontSize: "150%",
          width: "100%",
          height: this.props.styles.footerMenuHeight,
          backgroundColor: "#333",
          color: "#fff",
          position: "fixed",
          bottom: 0
        }}
      >
        {this.props.initialMenuItems.map((item, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1
              }}
              onClick={()=>item.clickFunction()}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
            </div>
          );
        })}
      </div>
    );
  }
};

export default FooterMenu;
