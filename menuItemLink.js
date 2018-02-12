import React, { Component } from 'react';

class MenuItemLink extends Component {
  render() {
    const { props } = this;
    const { href, onClick, children, role, inputRef, index, tabIndex, hasSubMenu } = props;

    return (
      <a
        tabIndex={tabIndex}
        ref={(link) => inputRef(link, index)}
        role={role}
        href={href}
        onClick={onClick}>
          {children}
      </a>
    );
  }
}

export default MenuItemLink;
