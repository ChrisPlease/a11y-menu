import React, {Component} from 'react';
import Menu from './menu';
import MenuItemLink from './menuItemLink';

class MenuItem extends Component {
  render() {
    const { role, children, inputRef, index } = this.props;

    return (
      <li role={role}>
        {children.map((child, i) => {
          const { role } = child.props;
          return role !== "menuitem" ?
            <Menu key={i} {...child.props } /> :
            <MenuItemLink tabIndex={index === 0 ? "0" : "-1"} hasSubMenu={true} index={index} inputRef={inputRef} key={i} {...child.props} />;
        })}
      </li>
    );
  }
};

export default MenuItem;
