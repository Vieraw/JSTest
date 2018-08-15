import {SAVE_RECORDS, ADD_RECORD, DELETE_RECORD, RECORD_CHANGE, SET_RECORDS} from "../actions/types";

const initialState = {
    records: [],
    message: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_RECORDS:
            return {
                ...state,
                message: action.payload,
            };
        case DELETE_RECORD:
            return {
                ...state,
                records: state.records.filter(item => item.id !== action.payload)
            };
        case ADD_RECORD:
            return {
                ...state,
                records: [...state.records, action.payload]
            };
        case RECORD_CHANGE:
            return {
                ...state,
                records: state.records.map((value) => {
                    if (value.id === action.payload.id) {
                        value[action.payload.name] = action.payload.value;
                    }
                    return value;
                })
            };
        case SET_RECORDS:
        {
            return {
                ...state,
                records: action.payload,
            };
        }
        default:
            return state;
    }
}