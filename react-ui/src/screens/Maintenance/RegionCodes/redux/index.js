import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { message as Message } from 'antd';

export const listRegionCode = createAsyncThunk('listRegionCode', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/region-codes?token=${accessToken}`);

  return response;
});

export const createRegionCode = createAsyncThunk('createRegionCode', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/region-codes?token=${accessToken}`, payload);

  return response;
});

export const updateRegionCode = createAsyncThunk('updateRegioncode', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/region-codes?token=${accessToken}`, payload);

  return response;
});

export const deleteRegionCode = createAsyncThunk('deleteRegionCode', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/region-codes/delete?token=${accessToken}`, id);

  return response;
});

const initialState = {
  regionCodeList: [],
  status: '',
  statusMessage: '',
  action: '',
}

const regionCodeSlice = createSlice({
  name: 'regionCodes',
  initialState: initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listRegionCode.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listRegionCode.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for region codes"
          Message.warning(statusMessage)
        }

        return {
          ...state,
          regionCodeList: data,
          status: 'succeeded',
          action: 'get',
          statusMessage: statusMessage,
        };
      }
      else {
        Message.error(message.ITEMS_GET_REJECTED)
        return {
          ...state,
          status: 'failed',
          action: 'get',
          statusMessage: message.ITEMS_GET_REJECTED,
        };
      }
    },
    [listRegionCode.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        regionCodeList: data,
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createRegionCode.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createRegionCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createRegionCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateRegionCode.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateRegionCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateRegionCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteRegionCode.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteRegionCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteRegionCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export const { clearData } = regionCodeSlice.actions;
export default regionCodeSlice.reducer;
