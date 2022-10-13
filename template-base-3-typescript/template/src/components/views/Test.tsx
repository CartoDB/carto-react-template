import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MultipleFormulaWidgetUI } from 'components/widgets/MultipleFormulaWidgetUI';
import { MultipleHistogramWidgetUI } from 'components/widgets/MultipleHistogramWidgetUI';
import { MultiplePieWidgetUI } from 'components/widgets/MultiplePieWidgetUI';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  test: {},
}));

export default function Test() {
  const classes = useStyles();
  const [selectedPie, setSelectedPie] = useState<string[]>([]);

  // [hygen] Add useEffect

  return (
    <div>
      <Box p={2}>
        <MultipleFormulaWidgetUI
          data={[1245, 3435.9]}
          labels={[{ note: 'label 1' }, { note: 'label 2' }]}
        />
      </Box>
      <Divider />
      <Box p={2}>
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
      <Box p={2}>
        <MultipleHistogramWidgetUI
          data={[[40, 50, 60], [50, 60, 70]]}
          labels={['label 1', 'label 2']}
          names={['name 1', 'name 2']}
          totals={[150, 180]}
          colors={['#f00', '#ff0']}
        />
      </Box>
    </div>
  );
}
