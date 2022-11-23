import { Entry } from "../types";
import { Typography, SvgIcon } from "@material-ui/core";
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import {assertNever} from "assert-never";
import HealthRatingSingle from "./HealthRatingSingle";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return (
                <div>
                <Typography>{entry.date} <SvgIcon component = {MedicalServicesIcon}/></Typography> 
                <Typography><i>{entry.description}</i></Typography>
                <HealthRatingSingle rating = {entry.healthCheckRating} />
                <Typography>diagnosed by {entry.specialist}</Typography>
                
                </div>
            );
        case "Hospital":
            return (
                <div>
                <Typography>{entry.date}<SvgIcon component = {MedicalServicesIcon}/></Typography> 
                <Typography><i>{entry.description}</i></Typography>
                <Typography>diagnosed by {entry.specialist}</Typography>

                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div>
                 <Typography>{entry.date} <SvgIcon component = {WorkIcon}/> <i>{entry.employerName}</i></Typography>
                 <Typography><i>{entry.description}</i></Typography>
                 <Typography>diagnosed by {entry.specialist}</Typography>

                </div>
            );
        default:
            return (
                assertNever(entry)
            );

    }
};

export default EntryDetails;