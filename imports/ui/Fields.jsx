import React, { Component, PropTypes  } from 'react';
import { Debounce } from 'react-throttle';
import { Sheet } from '../api/collectionfuncs.js';
import { createContainer } from 'meteor/react-meteor-data';

export default class Fields extends Component {

  constructor(props) {
    super(props);
  }

showme(x) {
  if(typeof x[0] !== 'undefined') {

    return x[0].text
  }
}

  render() {

    return (
        <div>
            <p>{this.showme(this.props.sheet)}</p>
        </div>
    )
  }
}