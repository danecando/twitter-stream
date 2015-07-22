'use strict';
/**
 * Header Component
 * @since 1.0.0
 * @type {*|exports|module.exports}
 */

var React = require('react');
var Link = require('react-router').Link;
var _ = require('lodash');

var Header = React.createClass({

  /**
   * Executes hash tag link with enter key on tag input
   * @todo possibly add to list of most used hash tags
   * @param event
   */
  hashInputSubmit: function(event) {
    var e = _.cloneDeep(event);
    if (e.keyCode !== 13) return;

    var hashLink = document.getElementById('hash-link');
    hashLink.click();
  },

  /**
   * Updates href attribute on hash link with input input
   * @param event
   */
  hashInputChange: function(event) {
    this.setState({ hashLink: event.target.value });
  },

  /**
   * Initial hashLink href value
   * @returns {{hashLink: string}}
   */
  getInitialState: function() {
    return { hashLink: ''};
  },

  /**
   * Renders site header
   * @returns {jsx}
   */
  render: function() {
    var hashLink = '/' + this.state.hashLink;
    return (
        <header id="app-header">
          <div className="contain">
            <section className="site-title">
              <h2>Node4U Twitter Stream</h2>
            </section>
            <section className="app-nav">
              <nav className="nav">
                <div className="btn-container">
                  <Link to="/" className="btn btn-home">Home</Link>
                </div>
                <div className="hash-nav">
                  <input
                      id="hash-link-input"
                      type="text"
                      onChange={this.hashInputChange}
                      onKeyDown={this.hashInputSubmit}
                      placeholder="hashtag"/>
                  <Link id="hash-link" to={hashLink}>Stream</Link>
                </div>
              </nav>
            </section>
          </div>
        </header>
    );
  }
});

module.exports = Header;
