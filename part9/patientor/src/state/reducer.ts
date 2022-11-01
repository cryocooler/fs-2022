import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENTDETAILS";
    payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENTDETAILS":
      return {
        ...state,
        patientDetail: {
          [action.payload.id]: action.payload
        }
      };

    default:
      return state;
  }
};

export const setPatientList = (apiData : Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: apiData
  };
};

export const addPatient = (content: Patient) : Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
  };

};
export const getPatientDetails = (content: Patient) : Action => {
  return {
    type: "SET_PATIENTDETAILS",
    payload: content
  };
};

