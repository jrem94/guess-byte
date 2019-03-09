import React, { Component } from "react";
import axios from "axios";

export default class PersonList extends Component {
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=2d6163127bef2e1e90923382536f63c7&format=json`
      )
      .then(result => console.log(result.data.toptags.tag))
      .catch(err => console.log(err));
  }

  render() {
    return <div>LOADER</div>;
  }
}
