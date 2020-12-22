import { useCallback } from 'react';

export default function useRenderedFeatures(dispatch, setVF, removeVF, sourceId) {
  function clearFeatures() {
    sourceId && dispatch(removeVF(sourceId));
  }

  const onViewportChange = useCallback(
    (e) => {
      dispatch(setVF({ sourceId, data: e }));
    },
    [dispatch, sourceId, setVF]
  );

  return [onViewportChange, clearFeatures];
}
