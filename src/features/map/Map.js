import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { setViewState } from "./mapSlice";

export function Map() {
  const viewState = useSelector((state) => state.map.viewState);
  const baseMap = useSelector((state) => state.map.baseMap);
  const dispatch = useDispatch();

  const handleViewStateChange = ({ viewState: nextViewState }) => {
    dispatch(setViewState(nextViewState));
  };
  return (
    <DeckGL controller={true} viewState={viewState} onViewStateChange={handleViewStateChange}>
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
