import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { SubRouteExampleMetaData } from './SubRouteExample/router-data';
import { excerciseMetaData as E1 } from './Excercise1/router-data';
import { excerciseMetaData as E2 } from './Excercise2/router-data';
import { excerciseMetaData as E3 } from './Excercise3/router-data';

export const blockRouterMetaData = [SubRouteExampleMetaData, E1, E2, E3];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
