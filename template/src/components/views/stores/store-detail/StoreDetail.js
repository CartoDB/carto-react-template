import React from 'react';
import { useParams } from 'react-router-dom';

function StoreDetail(props) {
  const { id } = useParams();
  return <div>{`Store details, store_id: ${id}`}</div>;
}

export default StoreDetail;
