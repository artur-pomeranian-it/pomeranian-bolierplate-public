import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { blockRouterMetaData as blockRouterMetaDataJsVariables1 } from './Exercise-js-variables-1/router-data';
import { blockRouterMetaData as blockRouterMetaDataJsVariables2 } from './Exercise-js-variables-2/router-data';
import { blockRouterMetaData as blockRouterMetaDataJsFunction1 } from './Exercise-js-functions/router-data';
import { blockRouterMetaData as JsArraysBasics } from './JsArraysBasics/router-data';
import { blockRouterMetaData as JsArrayMethodsExercise } from './JsArrayMethodsExercise/router-data';
import { blockRouterMetaData as JsStringsAsArrays } from './JsStringsAsArrays/router-data';
import { blockRouterMetaData as JsObjectsBasics } from './JsObjectsBasics/router-data';
import { blockRouterMetaData as JsDateTime } from './JsDateTime/router-data';
import { blockRouterMetaData as Blok22Warmup } from './Blok22Warmup/router-data';
import { blockRouterMetaData as SetTimeout } from './SetTimeout/router-data';
import { blockRouterMetaData as VanishString } from './VanishString/router-data';

export const blockRouterMetaData = [
  blockRouterMetaDataJsVariables1,
  blockRouterMetaDataJsVariables2,
  blockRouterMetaDataJsFunction1,
  JsArraysBasics,
  JsArrayMethodsExercise,
  JsStringsAsArrays,
  JsObjectsBasics,
  JsDateTime,
  Blok22Warmup,
  SetTimeout,
  VanishString,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
