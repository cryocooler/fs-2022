import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { getPatientDetails, useStateValue } from "../state";
import { Patient, Entry, Diagnosis} from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { SvgIcon } from "@mui/material";

const renderPatient = () => {
    const [{patientDetail, diagnosis} , dispatch] = useStateValue();
    const {id}  = useParams<{ id: string }>();
    //const dgs = Object.values(diagnosis).map((d: Diagnosis) => )
    useEffect(() => {
        const fetchPatientDetails = async() => {
            if (id!= null && id!= String(patientDetail.id))
            try {
                if (id) {
                const {data: patientDetailFromApi} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`);
                dispatch(getPatientDetails(patientDetailFromApi));
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        void fetchPatientDetails();
    }, [dispatch]);

    console.log(id);
    console.log('details', patientDetail);

return (
    <div>
        {Object.values(patientDetail).map((patient: Patient) => 
        (<div key = {patient.id}>
        <h3>{patient.name}
        {patient.gender == 'male' ? (<SvgIcon component = {MaleIcon} />) :
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        patient.gender == 'female' ? (<SvgIcon component= {FemaleIcon} />) : null}</h3> 
        ssn: {patient.ssn}
        <br></br>
        occupation: {patient.occupation}
        <br></br>
        <br></br>
        <b>entries</b>
        <br></br>
        <br></br>
        {patient.entries.map((entry: Entry) => (<div key = {entry.id}>
          {entry.date} <i>{entry.description}</i>
        <br></br>
        <br></br>
        {entry.diagnosisCodes?.map((dg) =>
        (<li key = {dg}>
           {dg} {Object.values(diagnosis).filter((d: Diagnosis) => d.code === dg).map((d: Diagnosis)=> d.name)}
        </li>)
        )}
        </div>
            ))}
        </div>
        ))}
    </div>
);
};


export default renderPatient;