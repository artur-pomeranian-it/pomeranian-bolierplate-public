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
import { blockRouterMetaData as Timer } from './Timer/router-data';
import { blockRouterMetaData as JsAnimation } from './JsAnimation/router-data';
import { blockRouterMetaData as SlidingBanner } from './SlidingBanner/router-data';
import { blockRouterMetaData as HitTheMoleGame } from './HitTheMoleGame/router-data';
import { blockRouterMetaData as MemoGame } from './MemoGame/router-data';
import { blockRouterMetaData as PromiseAndMe } from './promiseAndMe/router-data';
import { blockRouterMetaData as UseEffectAndPromiseExercise } from './useEffectAndPromiseExercise/router-data';
import { blockRouterMetaData as AsyncAwait } from './AsyncAwait/router-data';
import { blockRouterMetaData as Testing } from './Testing/router-data';

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
  Timer,
  JsAnimation,
  SlidingBanner,
  HitTheMoleGame,
  MemoGame,
  PromiseAndMe,
  UseEffectAndPromiseExercise,
  AsyncAwait,
  Testing,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
