export interface Diagnosis {
    code: string,
    name: string,
    latin?: string

}


export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender?: string,
    occupation?: string,
    entries: Entry[]
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
    Undefined = "undefined"
}

export type publicPatientEntry = Omit<Patient, 'ssn' | 'entries'>;
export type newPatientEntry = Omit<Patient, 'id'>;

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge?: Discharge;
  }

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type NewEntry = DistributiveOmit<Entry, 'id'>;

//   export interface NewEntry {
//     date: string;
//     type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
//     specialist: string;
//     description: string;
//     diagnosisCodes?: Array<Diagnosis["code"]>;
//     discharge?: Discharge;
//     employerName?: string;
//     healthCheckRating?: number;
//     sickLeave?: SickLeave;
//   }



  //export type NewEntry = Omit<NewEntry, "id">;