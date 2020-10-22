import React from 'react';
import rgbToHex from '../utils/rgbToHex';

function CategoryLegendUI(props) {
  const { categories } = props;
  return (
    <div>
      {Object.entries(categories.colors).map((elem, i) => (
        <div key={i}>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: categories.geomType === 'point' ? '50%' : '0%',
              backgroundColor: rgbToHex(elem[1]),
            }}
          ></div>
          {categories.labels[elem[0]]}
        </div>
      ))}
    </div>
  );
}

export default CategoryLegendUI;
