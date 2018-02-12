import React, { Component } from 'react';
import MenuItem from './menuItem';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.links = [];



    this.inputRef = this.inputRef.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleArrowNav = this.handleArrowNav.bind(this);
  }

  inputRef(link, i) {
    this.links[i] = link;
    return this.links;
  }

  handleFocus() {
    return this.links[0].focus();
  }

  handleArrowNav(e) {
    const links = this.links;
    switch (e.keyCode) {
      case 39:
        console.log("39 ->");

      default:
        console.log(e.keyCode);
        return e;
    }
  }

  render() {
    const { role, children } = this.props;
    return (
      <ul
        onFocus={() => this.handleFocus()}
        onKeyDown={(e) => this.handleArrowNav(e)}
        tabIndex="0"
        role={role || "menu"}>
        {children.map((child, index) => {
          const props = { ...child.props, index };

          return <MenuItem hasSubMenu={false} inputRef={this.inputRef} key={index} {...props} />}
        )}
      </ul>
    );
  }
}

export default Menu;
