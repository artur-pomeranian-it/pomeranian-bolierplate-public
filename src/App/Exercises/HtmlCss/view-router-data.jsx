import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { blockRouterMetaData as blockRouterMetaData121220231 } from './Exercise-example-12-12-2023-1/router-data';
import { blockRouterMetaData as Selectors } from './SelectorsAndCascade/router-data';
import { blockRouterMetaData as Colors } from './Colors/router-data';
import { blockRouterMetaData as ImgageFiles } from './ImageFiles/router-data';
import { blockRouterMetaData as Backgrounds } from './Backgrounds/router-data';
import { blockRouterMetaData as CssFilter } from './CssFilter/router-data';
import { blockRouterMetaData as MediaFiles } from './MediaFiles/router-data';
import { blockRouterMetaData as BoxModel } from './BoxModel/router-data';
import { blockRouterMetaData as HTMLTables } from './HTMLTables/router-data';
import { blockRouterMetaData as TablesTennis } from './TablesTennis/router-data';

export const blockRouterMetaData = [
  blockRouterMetaData121220231,
  Selectors,
  Colors,
  ImgageFiles,
  Backgrounds,
  CssFilter,
  MediaFiles,
  BoxModel,
  HTMLTables,
  TablesTennis,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
