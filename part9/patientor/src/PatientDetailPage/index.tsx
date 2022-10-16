import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { SvgIcon } from "@mui/material";

const renderPatient = () => {
    const [{patientDetail}, dispatch] = useStateValue();
    const {id}  = useParams<{ id: string }>();


    useEffect(() => {
        const fetchPatientDetails = async() => {
            if (id!= null && id!= String(patientDetail.id))
            try {
                if (id) {
                const {data: patientDetailFromApi} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`);
                dispatch({type: "SET_PATIENTDETAILS", payload: patientDetailFromApi});
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
        </div>
        ))}
    </div>
);
};


export default renderPatient;