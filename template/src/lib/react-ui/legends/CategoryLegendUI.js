import React from 'react';

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
              backgroundColor: `#${elem[1][0]
                .toString(16)
                .padStart(2, '0')}${elem[1][1]
                .toString(16)
                .padStart(2, '0')}${elem[1][2].toString(16).padStart(2, '0')}`,
            }}
          ></div>
          {categories.labels[elem[0]]}
        </div>
      ))}
    </div>
  );
}

export default CategoryLegendUI;
