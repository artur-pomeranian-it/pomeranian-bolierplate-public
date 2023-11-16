import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { SubRouteExampleMetaData } from './SubRouteExample/router-data';
import { excerciseMetaData as E1 } from './Excercise1/router-data';
import { excerciseMetaData as E2 } from './Excercise2/router-data';
import { excerciseMetaData as E3 } from './Excercise3/router-data';
import { excerciseMetaData as B9E1 } from './Blok-9-click5/router-data';
import { excerciseMetaData as B9E2 } from './Blok-9-seeOrNot/router-data';
import { excerciseMetaData as B9E3 } from './Blok-9-moreOrLess/router-data';
import { excerciseMetaData as B9E4 } from './Blok-9-moreOrLessAdvanced/router-data';
import { excerciseMetaData as B9E5 } from './Blok-9-moreOrLessGame/router-data';
import { excerciseMetaData as ToDoWithServer } from './ToDoWithServer/router-data';
import { excerciseMetaData as REST } from './Blok-36-LocalDevAndFetch/router-data';
import { BasicFormsMetaData } from './BasicForms/router-data';
import { blockRouterMetaData as firebase } from './AuthFirebase/router-data';
import { blockRouterMetaData as ReduxTest } from './Blok-46-ReduxTest/router-data';
import { blockRouterMetaData as ReduxCounter } from './Blok-46-ReduxCounter/router-data';

export const blockRouterMetaData = [
  SubRouteExampleMetaData,
  E1,
  E2,
  E3,
  B9E1,
  B9E2,
  B9E3,
  B9E4,
  B9E5,
  ToDoWithServer,
  REST,
  BasicFormsMetaData,
  firebase,
  ReduxTest,
  ReduxCounter,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
