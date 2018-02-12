import React, { Component, Children } from 'react';
import Menu from './menu';
import MenuItem from './menuItem';
import MenuItemLink from './menuItemLink';

export function a11yMenu(WrappedComponent) {
  return class Enhancer extends WrappedComponent {

    static displayName = `a11yMenu(${WrappedComponent.name})`;

    mapRoles(tree = super.render()) {
      return Children.map(
        tree,
        (child) => {
          if (!child || !child.props) return child;

          if (child.props.children) {
            const newChild = React.cloneElement(child, {children: this.mapRoles(child.props.children)});

            if (child.props.role === "navigation" || child.type === "nav") return newChild;

            let props;
            switch (child.type) {
              case "ul":
                props = { ...newChild.props, role: "menu" };
                return <Menu { ...props } />;
              case "button":
              case "a":
                props = { ...newChild.props, role: "menuitem" };
                return <MenuItemLink {...props} />;
              case "li":
                props = { ...newChild.props, role: "presentation" };
                return <MenuItem { ...props } />;
              default:
                return React.cloneElement(newChild, { role: "presentation" });
            }
          }
        }
      );
    }

    render() {
      return (
        <div>
          {this.mapRoles()}
        </div>
      );
    }
  }
}
