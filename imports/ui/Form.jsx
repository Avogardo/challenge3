import React, { Component, PropTypes  } from 'react';
import { Debounce } from 'react-throttle';
import { Sheet } from '../api/collectionfuncs.js';
import { createContainer } from 'meteor/react-meteor-data';
import {AutorunMixin, SubscriptionMixin} from 'meteor/universe:utilities-react';
import Fields from './Fields.jsx';

class Form extends Component {

    constructor(props) {
        super(props);
        this.saveToCollection = this.saveToCollection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showcollection = this.showcollection.bind(this);
    }

    saveToCollection(e) {
        e.preventDefault();
        const text = e.target.value;

        if(Sheet.find().count() !== 0 ) {
            Meteor.call('sheet.update', this.props.sheet[0]._id, text);
        } else {
            Meteor.call('sheet.insert', text);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        Meteor.call('sheet.remove');
    }

    showcollection(e) {
        e.preventDefault();

        console.log(Sheet.find().fetch());
        console.log(this.props.sheet);
        console.log('Length: ' + Sheet.find().count());
        console.log('Text: ' + this.props.sheet[0].text);
    }

  render() {

    return (
        <div>
            Dane klienta
            <Debounce time="1000" handler="onChange">
                <input type="text" placeholder="Type your text here" name="name" onChange={this.saveToCollection}/>
            </Debounce>


            <form onSubmit={this.handleSubmit}><input type="submit" value="Clear memory" /></form>
            <form onSubmit={this.showcollection}><input type="submit" value="Show collection" /></form>
            <Fields sheet={this.props.sheet}/>
        </div>

    )
  }
}
//
Form.propTypes = {
  sheet: PropTypes.array.isRequired,
};

Meteor.subscribe('sheet');

export default createContainer(() => {
  return {
    sheet: Sheet.find({}).fetch()
  };
}, Form);