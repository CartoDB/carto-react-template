import { BarWidgetUI, CategoryWidgetUI, ComparativeCategoryWidgetUI, ComparativeFormulaWidgetUI } from '@carto/react-ui';
import { Box, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  test: {},
}));

const categoryData = [
  [
    { name: 'data 1', value: 245 },
    { name: 'data 2', value: 354 },
    { name: 'data 3', value: 245 },
    { name: 'data 4', value: 354 },
    { name: 'data 5', value: 245 },
    { name: 'data 6', value: 354 },
  ],
  [
    { name: 'data 1', value: 454 },
    { name: 'data 2', value: 346 },
    { name: 'data 3', value: 454 },
    { name: 'data 4', value: 346 },
    { name: 'data 5', value: 454 },
    { name: 'data 6', value: 346 },
  ],
  [
    { name: 'data 1', value: 532 },
    { name: 'data 2', value: 754 },
    { name: 'data 3', value: 532 },
    { name: 'data 4', value: 754 },
    { name: 'data 5', value: 532 },
    { name: 'data 6', value: 754 },
  ],
];

export default function Test() {
  const classes = useStyles();
  const [selectedPie, setSelectedPie] = useState<string[]>([]);
  const [selectedBars, setSelectedBars] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formulaData, setFormulaData] = useState([1245, 3435.9]);

  function updateFormulaData() {
    setFormulaData([
      Number((Math.random() * 1000).toFixed(2)),
      Number((Math.random() * 1000).toFixed(2)),
    ]);
  }

  // [hygen] Add useEffect

  return (
    <div style={{ minWidth: '300px' }}>
      <Box p={2} width='100%'>
        <ComparativeFormulaWidgetUI
          data={formulaData}
          labels={[
            { prefix: '$', suffix: ' sales', note: 'label 1' },
            { prefix: '$', suffix: ' sales', note: 'label 2' },
          ]}
          colors={[{ note: '#ff9900' }, { note: '#6732a8' }]}
        />
        <Box pt={4}>
          <Button onClick={updateFormulaData}>Update</Button>
        </Box>
      </Box>
      <Divider />
      <Box p={2} position='relative' overflow='auto'>
        <BarWidgetUI
          yAxisData={[
            [40, 50, 60, 80, 100],
            [50, 60, 70, 80, 100],
          ]}
          xAxisData={['label 1', 'label 2', 'label 3', 'label 4', 'label 5']}
          series={['name 1', 'name 2']}
          colors={['#f27', '#fa0']}
          stacked={false}
          selectedBars={selectedBars}
          onSelectedBarsChange={setSelectedBars}
        />
      </Box>
      <Box p={2} position='relative' overflow='auto'>
        <ComparativeCategoryWidgetUI
          data={categoryData}
          names={['serie 1', 'serie 2', 'serie 3']}
          labels={[
            'label 1',
            'label 2',
            'label 3',
            'label 4',
            'label 5',
            'label 6',
          ]}
          colors={['#f27', '#fa0', '#32a852']}
          maxItems={3}
          order={CategoryWidgetUI.ORDER_TYPES.RANKING}
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={setSelectedCategories}
        />
      </Box>
      {/* <Divider />
      <Box p={2} width='100%'>
        <ComparativePieWidgetUI
          names={['name 1', 'name 2']}
          data={[
            [
              { name: 'data 1', value: 40 },
              { name: 'data 2', value: 60 },
            ],
            [
              { name: 'data 1', value: 30 },
              { name: 'data 2', value: 70 },
            ],
          ]}
          labels={[
            ['label 1', 'label 2'],
            ['label 1', 'label 2'],
          ]}
          colors={[
            ['#6732a8', '#32a852'],
            ['#a83232', '#ff9900'],
          ]}
          selectedCategories={selectedPie}
          onCategorySelected={setSelectedPie}
        />
      </Box> */}
    </div>
  );
}
