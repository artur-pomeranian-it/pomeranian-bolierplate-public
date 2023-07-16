import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { blockRouterMetaData as blockRouterMetaData121220231 } from './Exercise-example-12-12-2023-1/router-data';
import { blockRouterMetaData as Selectors } from './SelectorsAndCascade/router-data';
import { blockRouterMetaData as Colors } from './Colors/router-data';
import { blockRouterMetaData as ImageFiles } from './ImageFiles/router-data';
import { blockRouterMetaData as Backgrounds } from './Backgrounds/router-data';
import { blockRouterMetaData as CssFilter } from './CssFilter/router-data';
import { blockRouterMetaData as MediaFiles } from './MediaFiles/router-data';
import { blockRouterMetaData as BoxModel } from './BoxModel/router-data';
import { blockRouterMetaData as HTMLTables } from './HTMLTables/router-data';
import { blockRouterMetaData as TableTenis } from './TablesTennis/router-data';
import { blockRouterMetaData as ArrayRendering } from './ArrayRendering/router-data';
import { blockRouterMetaData as ArrayRenderToTable } from './ArrayRenderToTable/router-data';

export const blockRouterMetaData = [
  blockRouterMetaData121220231,
  Selectors,
  Colors,
  ImageFiles,
  Backgrounds,
  CssFilter,
  MediaFiles,
  BoxModel,
  HTMLTables,
  TableTenis,
  ArrayRendering,
  ArrayRenderToTable,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
