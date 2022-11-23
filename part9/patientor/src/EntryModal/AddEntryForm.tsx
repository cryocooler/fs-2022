import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, RatingSelectField } from "./EntryForm";
import { Type, Entry, HealthCheckRating} from "../types";
import { TypeOption, RatingOption } from "./EntryForm";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, "id" | "diagnosisCodes" | "discharge" |"sickLeave" >;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Type.healthCheck, label: "Health Check" },
  { value: Type.hospital, label: "Hospital" },
  { value: Type.occupation, label: "Occupational Healthcare" },
];

const ratingOptions: RatingOption[] = [
  {rating: HealthCheckRating.Healthy, ratingLabel: "Healthy" },
  {rating: HealthCheckRating.LowRisk, ratingLabel: "Low risk" },
  {rating: HealthCheckRating.HighRisk, ratingLabel: "High risk"},
  {rating: HealthCheckRating.CriticalRisk, ratingLabel: "Critical risk"}
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        specialist: "",
        type: Type.healthCheck,
        rating: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date= requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.rating) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="lorem ipsum dolorum"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name of practitioner"
              name="specialist"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            <RatingSelectField label = "Rating" name= "rating" options = {ratingOptions} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
