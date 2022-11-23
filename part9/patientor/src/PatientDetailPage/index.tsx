import axios from "axios";
//import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Entry } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { SvgIcon } from "@mui/material";
import { Container, Typography, Table,TableRow, TableCell,
        TableBody, Button } from "@material-ui/core";
import EntryDetails from "../components/EntryDetails";
import { AddEntryModal} from "../EntryModal";
import React from "react";
import { EntryFormValues } from "../EntryModal/AddEntryForm";
import { addEntry } from "../state";

const PatientDetailPage = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [{patients}, dispatch] = useStateValue();
    const { id } = useParams<{id: string}>();
    const patientList = Object.values(patients);

    const patientDetail = patientList.find(p => p.id === id);

    const [error, setError] = React.useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    if (!patientDetail) {
      return (<div>loading ...</div>);
    }

    // const [{patientDetail} , dispatch] = useStateValue();
    // const {id}  = useParams<{ id: string }>();
    // //const dgs = Object.values(diagnosis).map((d: Diagnosis) => )
    // useEffect(() => {
    //     const fetchPatientDetails = async() => {
    //         if (id!= null && id!= String(patientDetail.id))
    //         try {
    //             if (id) {
    //             const {data: patientDetailFromApi} = await axios.get<Patient>(
    //                 `${apiBaseUrl}/patients/${id}`);
    //             dispatch(getPatientDetails(patientDetailFromApi));
    //             }
    //         }
    //         catch (e) {
    //             console.error(e);
    //         }
    //     };
    //     void fetchPatientDetails();
    // }, [dispatch]);

    const submitNewEntry = async (values: EntryFormValues) => {

      if (id) {
        try {
          console.log('passed values', values);
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addEntry(patientDetail, newEntry));
          closeModal();
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      }
      };

    // console.log(id);
    // console.log('details', patientDetail);

  return (
    <div>
        <Container>
        <br></br>
        <Typography variant = "h4">{patientDetail.name}{
        patientDetail.gender == 'male' ? (<SvgIcon component = {MaleIcon} />) :
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        patientDetail.gender == 'female' ? (<SvgIcon component= {FemaleIcon} />) : null}</Typography>
        <Typography>
          ssn: {patientDetail.ssn}
          <br></br>
          occupation: {patientDetail.occupation}
          <br></br>
          <br></br>
          <b>entries</b>
          </Typography>
          <Table style = {{marginBottom: "1em"}}>
            <TableBody>
              {patientDetail.entries.map((entry: Entry) => 
              (<TableRow key = {entry.id}>
                <TableCell>
                  <EntryDetails entry = {entry} />
                </TableCell>
              </TableRow>)
              )}
            </TableBody>
          </Table>
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
        </Button>

        {/* {patientDetail.map((patient: Patient) => 
        (<div key = {patient.id}>
        <Typography variant="h4">{patient.name}
        {patient.gender == 'male' ? (<SvgIcon component = {MaleIcon} />) :
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        patient.gender == 'female' ? (<SvgIcon component= {FemaleIcon} />) : null}</Typography> 
        <Typography>
        ssn: {patient.ssn}
        <br></br>
        occupation: {patient.occupation}
        <br></br>
        <br></br>
        <b>entries</b>
        <br></br>
        <br></br>
        </Typography>
        <Table style={{ marginBottom: "1em" }}>
            <TableBody>
        {patient.entries.map((entry: Entry) => (<TableRow key = {entry.id}>
        <TableCell>
        <EntryDetails entry = {entry} />
        </TableCell>
        </TableRow>
        ))}
        </TableBody>
        </Table> */}
        {/* <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={() => 0}
        error={error}
        onClose={closeModal}
      />
        <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
        </div>
      </Container> */}
    {/* </div> */}
    </Container>
    </div>

  );
};


export default PatientDetailPage;