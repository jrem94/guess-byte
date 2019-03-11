import React from "react";

export default function ArtistPortrait(props) {
  return <h3 key={props.name}>{props.name}</h3>;
}
