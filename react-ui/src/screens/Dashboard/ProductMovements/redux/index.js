import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import {checkResponseValidity, generateStatusMessage} from '../../../../helpers/general-helper';


export const listProductMovements = createAsyncThunk('listProductMovements', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try{
    const response = await axiosInstance.get(
      `/rest/product-movements/company/${payload}?token=${accessToken}`
    )

    const { response: validatedResponse, valid } = checkResponseValidity(response);
    
    if(valid) {
      return validatedResponse;
    }

    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  productMovmentList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

const productMovementSlice = createSlice({
  name: 'productMovement',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listProductMovements.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for product movements`
      }
    },
    [listProductMovements.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const {message: statusMessage, level} = generateStatusMessage(action.payload, 'Product Movement');

      return {
        ...state,
        productMovmentList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage
      }
    },
    [listProductMovements.rejected]: (state, action) => {
      const {status} = action.payload;
      const {message: statusMessage, level} = generateStatusMessage(action.payload, 'Product Movement');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage
      }
    }
  }
})

export const {clearData} = productMovementSlice.actions;
export default productMovementSlice.reducer;