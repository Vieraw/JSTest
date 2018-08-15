import axios from 'axios';
import {SAVE_RECORDS, SET_RECORDS, ADD_RECORD, RECORD_CHANGE, DELETE_RECORD} from "./types";
import uuid from "uuid";

export const saveRecords = item => dispatch => {
    axios
        .post('/api/add', item)
        .then(res => dispatch({
            type: SAVE_RECORDS,
            payload: 'Data saved successfully'
        }))
};

export const setRecords = data => {
    return {
        type: SET_RECORDS,
        payload: data
    };
};

export const addRecord = () => {
    return {
        type: ADD_RECORD,
        payload: {
            id: uuid(),
            age: '',
            name: '',
            gender: '',
            company: '',
            email: '',
            phone: '',
            address: '',
            readOnly: false
        }
    }
};

export const recordChange = (id, target) => {
    return {
        type: RECORD_CHANGE,
        payload: {id: id, name: target.name, value: target.value}
    };
};

export const deleteRecord = id => {
    return {
        type: DELETE_RECORD,
        payload: id
    };
};