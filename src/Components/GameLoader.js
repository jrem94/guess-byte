import React, { Component } from "react";
import ArtistPortrait from "./ArtistPortrait/ArtistPortrait";
import TagOption from "./TagOption/TagOption";
import axios from "axios";

export default class GameLoader extends Component {
  state = {
    tags: [],
    tag: "",
    artists: [],
    correct: "",
    track: "",
    score: 0,
    isPlaying: false,
    loaded: false,
    selectedValue: "none"
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=2d6163127bef2e1e90923382536f63c7&format=json`
      )
      .then(result =>
        this.setState({ tags: result.data.toptags.tag.map(tag => tag.name) })
      )
      .then(d => console.log(this.state.tags))
      .catch(err => console.log(err));

    this.setState({ loaded: true });
  }

  artistMapHandler = () => {
    const artistList = [];

    for (let i = 0; i < 4; i++) {
      artistList.push(
        this.state.artists[
          Math.floor(Math.random() * this.state.artists.length) + 1
        ]
      );
    }
    // this.setState({ artists: artistList });
    return artistList;
  };

  optionChangeHandler = event => {
    this.setState({ selectedValue: event.target.value });

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${
          this.state.selectedValue
        }&api_key=2d6163127bef2e1e90923382536f63c7&format=json`
      )
      .then(result =>
        this.setState({
          artists: result.data.topartists.artist.map(artist => artist.name)
        })
      )
      .catch(err => console.log(err));
  };

  getTrackHandler = () => {
    const artist = this.state.artists[
      Math.floor(Math.random() * this.state.artists.length) + 1
    ];
    this.setState({ correct: artist });

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=2d6163127bef2e1e90923382536f63c7&format=json`
      )
      .then(result =>
        this.setState({
          track:
            result.data.toptracks.track[
              Math.floor(Math.random() * result.data.toptracks.track.length) + 1
            ].url
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Guess Byte</h1>
        <h3>Score: {this.state.score}</h3>
        <div className="artist-container">
          {this.state.loaded
            ? this.artistMapHandler().map(artist => {
                return <ArtistPortrait name={artist} />;
              })
            : null}
        </div>
        {this.state.isPlaying ? (
          <div>
            <audio controls>
              <source src={this.state.track} type="audio/ogg" />
              <source src={this.state.track} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : (
          <div>
            <select
              name="tags"
              id="tag-list"
              value={this.state.selectedValue}
              onChange={e => this.optionChangeHandler(e)}
            >
              <option value="none">Select</option>
              {this.state.loaded
                ? this.state.tags.map(tag => {
                    return <TagOption name={tag} />;
                  })
                : null}
            </select>
          </div>
        )}
        {!this.state.isPlaying ? (
          <button
            onClick={() => {
              this.getTrackHandler();
              this.setState({ isPlaying: true });
            }}
          >
            PLAY
          </button>
        ) : null}
      </div>
    );
  }
}
