import React, { Component } from "react";

const Header = props => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline">
        <span>{props.tagLine}</span>
      </h3>
    </header>
  );
};

// propTypes is for validation
Header.propTypes = {
  tagLine: React.PropTypes.string.isRequired
};

export default Header;
