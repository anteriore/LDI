import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const tempListDepot = createAsyncThunk('tempListDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(`/rest/depots?token=${accessToken}`);

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const listDepot = createAsyncThunk('listDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  let { fnCallback } = payload;
  if (typeof fnCallback !== 'function') {
    fnCallback = () => {};
  }
  const response = await axiosInstance.get(`rest/depots?token=${accessToken}`);

  if (typeof response !== 'undefined') {
    const { status } = response;
    if (status === 200) {
      if (response.data.length === 0) {
        response.statusText = `${message.API_200_EMPTY} in depot.`;
      } else {
        response.statusText = `${message.API_200_SUCCESS} in depot.`;
      }
      fnCallback(response);
      return response;
    }

    if (status === 500 || status === 400) {
      fnCallback(response);
      return thunkAPI.rejectWithValue(response);
    }
  } else {
    return thunkAPI.rejectWithValue(response);
  }
});

export const addDepot = createAsyncThunk('addDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/depots/?token=${accessToken}`, payload);
  return response;
});

export const deleteDepot = createAsyncThunk('deleteDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/depots/delete?token=${accessToken}`, payload);
  return response;
});

const depotSlice = createSlice({
  name: 'depots',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [tempListDepot.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for depot`,
      };
    },
    [tempListDepot.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Depot');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [tempListDepot.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Depot');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage: message,
      };
    },
    [listDepot.pending]: (state) => {
      state.status = 'loading';
    },
    [listDepot.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for depots';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listDepot.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = depotSlice.actions;
export default depotSlice.reducer;
