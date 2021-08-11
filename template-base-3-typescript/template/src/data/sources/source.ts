// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

export interface Source {
  id: string;
  connection: string;
  data: string;
  type: MAP_TYPES;
}

const SOURCE_ID = 'source';

const source = {
  id: SOURCE_ID,
  connection: 'TYPE HERE YOUR CONNECTION NAME',
  data: `TYPE YOUR QUERY HERE`,
  type: MAP_TYPES.QUERY,
};

export default source;
