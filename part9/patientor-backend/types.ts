export interface Diagnosis {
    code: string,
    name: string,
    latin?: string

}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
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