import { newPatientEntry, Gender, Entry, HealthCheckRating, NewEntry} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  }

// const isArray = (arr : unknown): arr is Array<string> => {
//   return arr instanceof Array<string>
// }

// const isNumeric = (n: unknown): n is number => {
//   return typeof n === 'number' || n instanceof Number;
// };


const parseName = (name: unknown): string => {
  console.log("name", name)
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
      if (!gender || !isGender(gender)) {
          throw new Error('incorrect or missing gender ' + gender )
      }
      return gender
  }
  const parseOccupation = (occupation: unknown): string => {
      if (!occupation || !isString(occupation)) {
          throw new Error('Incorrect or missing occupation ' + occupation)
      }
      return occupation
  }

  const parseSsn = (ssn : unknown):string => {
      if (!ssn || !isString(ssn)) {
          throw new Error('incorrect or missing ssn ' + ssn);
      }
      return ssn;
  };

  const parseEntries = (entries: any ):Entry[] => {

    return entries;
  };


//  const parseHealthCheckEntry = (entry: HealthCheckEntry): Entry => {
//    if (!entry.healthCheckRating) {
//     throw new Error("Healthcheck not provided");
//    }
//    return entry;
//  }

//  const parseHospitalEntry = (entry: HospitalEntry): Entry => {
//   if (!entry.discharge) {
//     throw new Error("no discharge provided");
//   }
//     return entry;
//  };

//  const parseOccupationalHealthCareEntry = (entry: OccupationalHealthcareEntry) 
//     : Entry => {
//       if (!entry.employerName || !isString(entry.employerName)) {
//         throw new Error ("no employer given");
//       }
//       return entry;
//  };

//  const parseType = (
//   type: unknown
// ): "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
//   if (!type) {
//     throw new Error("Incorrect type: " + type);
//   }
//   if (
//     ["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(
//       type as "HealthCheck" | "OccupationalHealthcare" | "Hospital"
//     )
//   ) {
//     return type as "HealthCheck" | "OccupationalHealthcare" | "Hospital";
//   } else {
//     throw new Error("Incorrect or missing type: " + type);
//   }
// };

const parseRating = (rating: unknown): HealthCheckRating => {
  console.log('passed rating', rating);
  if(!Object.values(HealthCheckRating).includes(rating as HealthCheckRating)) {
    throw new Error("Invalid rating" + rating);
  }
  return rating as HealthCheckRating;
};

// const parseSickLeave = (sl :unknown): SickLeave => {
//   if (!sl) {
//     throw new Error("incorrect sick leave");
//   }
//   if (Object.keys(sl).includes("startDate") && Object.keys(sl).includes("endDate")) {
//     return sl as SickLeave;
//   } else {
//     throw new Error("incorrect sickleave" + sl);
//   }
// };

// const parseDischarge = (disc: unknown): Discharge => {
//   if (!disc) {
//     throw new Error("Incorrect discharge");
//   } 
//   if (Object.keys(disc).includes("date") && Object.keys(disc).includes("criteria")) {
//     return disc as Discharge;
//   } else {
//     throw new Error ("Incorrect discharge" + disc);
//   }
// };

// const parseDiagnosis = (codes: unknown): Array<Diagnosis["code"]>=> {

//   if (!codes) {
//     throw new Error("Invalid diagnosis codes");
//   }
//   if (Array.isArray(codes) ) {
//     return codes as Array<Diagnosis["code"]>;
//  } else {
//   throw new Error("invalid codes array");
//  }

// };

// const parseHealthCheckRating = (healthCheckRating: unknown): number => {
//   if (![0, 1, 2, 3].includes(Number(healthCheckRating))) {
//     throw new Error("Incorrect healthCheckRating");
//   }
//   return Number(healthCheckRating);
// };

  // type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown,
  //                 occupation: unknown, entries: unknown};
/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object : any): newPatientEntry => {
    const newEntry : newPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn:  parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries),


    };
    return newEntry;
};



type FieldsToParse = {
  date: unknown;
  type: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  description: unknown;
  employerName?: unknown;
  rating?: unknown;
};


const toNewEntry = (object: FieldsToParse): NewEntry | Error => {
const{description, date, specialist, rating, employerName}
= object;

  switch (object.type) {
    case 'HealthCheck':
      console.log('healthcheck rating type received');
      console.log('rating received', rating);
      return {
        type: 'HealthCheck',
        description: parseName(description),
        date: parseName(date),
        specialist: parseName(specialist),
        healthCheckRating: parseRating(rating),
       // diagnosisCodes: parseDiagnosis(diagnosisCodes)
      };
      case 'OccupationalHealthcare':
        console.log('rating type occuhealthcare');
        return {
          type: "OccupationalHealthcare",
          date: parseName(date),
          description: parseName(description),
          specialist: parseName(specialist),
          employerName: parseName(employerName),
        //  diagnosisCodes: parseDiagnosis(diagnosisCodes)

        };
        case 'Hospital':
          console.log('hospital rating type received');

        return {
          type: "Hospital",
          description: parseName(description),
          date: parseName(date),
          specialist: parseName(specialist),
         // diagnosisCodes: parseDiagnosis(diagnosisCodes),
        };
        default:
          return {name: ' not correct type',
                  message: 'Not correct type'};
  }
};

export {toNewPatientEntry, toNewEntry};