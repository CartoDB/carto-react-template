import React from "react";
import { useSelector } from "react-redux";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";

export function Map() {
  const viewState = useSelector((state) => state.map.viewState);
  const baseMap = useSelector((state) => state.map.baseMap);

  return (
    <DeckGL initialViewState={viewState} controller={true}>
      {mapFor(baseMap)}
    </DeckGL>
  );
}

function mapFor(baseMap) {
  if (baseMap.mapType === "mapbox") {
    return <StaticMap reuseMaps mapStyle={baseMap.style} preventStyleDiffing />;
  } else {
    return <div></div>;
  }
}
