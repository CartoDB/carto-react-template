import { BarWidgetUI } from '@carto/react-ui';
import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MultipleCategoryWidgetUI, ORDER_TYPES } from 'components/widgets/MultipleCategoryWidgetUI';
import { MultipleFormulaWidgetUI } from 'components/widgets/MultipleFormulaWidgetUI';
import { MultiplePieWidgetUI } from 'components/widgets/MultiplePieWidgetUI';
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

  // [hygen] Add useEffect

  return (
    <div style={{ minWidth: '300px' }}>
      <Box p={2} width='100%'>
        <MultipleFormulaWidgetUI
          data={[1245, 3435.9]}
          labels={[
            { prefix: '$', suffix: ' sales', note: 'label 1' },
            { prefix: '$', suffix: ' sales', note: 'label 2' },
          ]}
          colors={[{ note: '#ff9900' }, { note: '#6732a8' }]}
        />
      </Box>
      <Divider />
      <Box p={2} width='100%'>
        <MultiplePieWidgetUI
          names={['name 1', 'name 2']}
          data={[
            [{ name: 'data 1', value: 40 }, { name: 'data 2', value: 60 }],
            [{ name: 'data 1', value: 30 }, { name: 'data 2', value: 70 }],
          ]}
          labels={[['label 1', 'label 2'], ['label 1', 'label 2']]}
          colors={[['#6732a8', '#32a852'], ['#a83232', '#ff9900']]}
          selectedCategories={selectedPie}
          onCategorySelected={setSelectedPie}
        />
      </Box>
      <Divider />
      <Box p={2} width='100%'>
        <BarWidgetUI
          yAxisData={[[40, 50, 60, 80, 100], [50, 60, 70, 80, 100]]}
          xAxisData={['label 1', 'label 2', 'label 3', 'label 4', 'label 5']}
          series={['name 1', 'name 2']}
          colors={['#f27', '#fa0']}
          stacked={false}
          selectedBars={selectedBars}
          onSelectedBarsChange={setSelectedBars}
        />
      </Box>
      <Box p={2} width='100%'>
        <MultipleCategoryWidgetUI
          data={categoryData}
          names={['serie 1', 'serie 2']}
          labels={['label 1', 'label 2', 'label 3', 'label 4', 'label 5', 'label 6']}
          colors={['#f27', '#fa0', '#32a852']}
          maxItems={3}
          order={ORDER_TYPES.RANKING}
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={setSelectedCategories}
          searchable={false}
        />
      </Box>
    </div>
  );
}
