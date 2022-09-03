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
    occupation?: string
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
    Undefined = "undefined"
}

export type publicPatientEntry = Omit<Patient, 'ssn'>;
export type newPatientEntry = Omit<Patient, 'id'>;