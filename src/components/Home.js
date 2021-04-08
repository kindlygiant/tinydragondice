import React, { Component } from "react";
import withContext from "../withContext";

class Home extends Component {
    render() {
        return (
            <>
            <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Welcome</h4>
          </div>
        </div>
            </>
        )
    }
}

export default withContext(Home);