// (function(React, ReactDOM, Reactstrap) {
"use strict";
var h = React.createElement;

var Navbar = React.createClass({
  getInitialState: function getInitialState() {
    return { open: false };
  },
  toggleOpen: function toggleOpen() {
    this.setState({ open: !this.state.open });
  },
  render: function render() {
    return React.createElement(
      Reactstrap.Navbar,
      { color: "faded", light: true, toggleable: true },
      React.createElement(Reactstrap.NavbarToggler, { right: true, onClick: this.toggleOpen }),
      React.createElement(
        Reactstrap.NavbarBrand,
        { href: "/" },
        "Test Site"
      ),
      React.createElement(
        Reactstrap.Collapse,
        { isOpen: this.state.open, navbar: true },
        React.createElement(
          Reactstrap.Nav,
          { navbar: true },
          React.createElement(
            Reactstrap.NavItem,
            null,
            React.createElement(
              Reactstrap.NavLink,
              { href: "/" },
              "Test Link"
            )
          )
        )
      )
    )
  }
});

function layout() {
  return React.createElement(
    "div",
    null,
    React.createElement(Navbar)
  );
}

fetch('/pages.json')
  .then(function(response) {
    if(response.ok) { return response.json(); }
    throw new Error('Network response was not ok.');
  })
  .then(function(pages) {
    window.pages = pages;
    ReactDOM.render(layout(), document.getElementById('root'));
  })
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });

  // ReactDOM.render(layout(), document.getElementById('root'));
// })(React, ReactDOM, Reactstrap);

// delete React;
// delete ReactDOM;
// delete Reactstrap;
