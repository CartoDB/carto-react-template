import { useCallback } from 'react';

export default function useRenderedFeatures(dispatch, setVF, removeVF, layerId) {
  function clearFeatures() {
    layerId && dispatch(removeVF(layerId));
  }

  const onViewportChange = useCallback(
    (e) => {
      // const features = e.getRenderedFeatures();
      dispatch(setVF({ layerId, data: e }));
    },
    [dispatch, layerId, setVF]
  );

  return [onViewportChange, clearFeatures];
}
