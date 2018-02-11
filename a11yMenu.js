import React, { Component, Children } from 'react';

export function a11yMenu(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    proc(WrappedComponentInstance) {

    }

    static displayName = `a11yMenu(${WrappedComponent.name})`;

    mapRoles(tree = super.render()) {
      const mappedRoles = Children.map(
        tree,
        (child) => {
          if (!child || !child.props) return child;

          if (child.props.children) {
            const newChild = React.cloneElement(child, {children: this.mapRoles(child.props.children)});

            if (!!child.props.role) return newChild;

            switch (child.type) {
              case "ul":
                return React.cloneElement(newChild, { role: "menu", tabIndex: "0" });
              case "li":
                return React.cloneElement(newChild, { role: "presentation" });
              case "a":
                return React.cloneElement(newChild, { role: "menuitem" });
              default:
                return newChild;
            }
          }
        }
      );

      const types = mappedRoles.map(role => role.type);

      if (types.indexOf('a') > -1 && types.indexOf('ul') > -1) {
        return mappedRoles.map(child => {
          if (child.type === "a") return React.cloneElement(child, {
            'aria-haspopup': true
          })
          if (child.type === "ul") return React.cloneElement(child, {
            'aria-hidden': true
          })
          return child;
        });
      }

      return mappedRoles;
    }

    render() {
      return this.mapRoles();
    }
  }
}
