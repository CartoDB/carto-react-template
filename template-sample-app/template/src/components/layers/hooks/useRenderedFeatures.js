import { useCallback } from 'react';

export default function useRenderedFeatures(dispatch, setVF, removeVF) {
  function clearFeatures(layerId) {
    layerId && dispatch(removeVF(layerId));
  }

  const onViewportChange = useCallback(
    (e, layerId) => {
      const features = e.getRenderedFeatures();
      dispatch(setVF({ layerId, data: features }));
    },
    [setVF, dispatch]
  );

  return [onViewportChange, clearFeatures];
}
