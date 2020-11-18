import { combineReducers } from 'redux';

import departmentArea from '../DepartmentArea/redux';
import finishedGoods from '../FinishedGoods/redux';
import itemTypes from '../ItemTypes/redux';
import items from '../Items/redux';
import units from '../Units/redux';
import regionCodes from '../RegionCodes/redux';
import provinceCodes from '../ProvinceCode/redux';
import zipCodes from '../ZipCodes/redux';
import accountCodes from '../AccountCodes/redux';
import productDivisions from '../ProductDivisions/redux';
import clusterCode from '../ClusterCodes/redux';
import institutionalCodes from '../InstitutionalCodes/redux';
import memoTypes from '../MemoTypes/redux';

const maintenance = combineReducers({
  departmentArea,
  finishedGoods,
  itemTypes,
  items,
  regionCodes,
  provinceCodes,
  accountCodes,
  units,
  zipCodes,
  clusterCode,
  productDivisions,
  institutionalCodes,
  memoTypes
});

export default maintenance;
