import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

export class Tabs extends Component {
  render() {
    this.state = {
      tabs: ["fashion", "art", "music", "social", "gaming"],
    };

    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => (
          <div style={props}>
            <nav id="blog-tab-div">
              {this.state.tabs.map((tab, index) => (
                <button
                  key={index}
                  className="blog-tab"
                  onClick={this.props.toggle}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        )}
      </Spring>
    );
  }
}

export default Tabs;

{
  /* <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {(props) => (
        <div style={props}>
          <nav id="blog-tab-div">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className="blog-tab"
                onClick={this.props.toggle}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      )}
    </Spring> */
}
