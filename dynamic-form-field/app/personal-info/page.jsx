"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { dynamicData } from "../components/sampelObject";

const PersonalInfo = () => {
  const [formConfig, setFormConfig] = useState([...dynamicData]);
  const [formValues, setFormValues] = useState({});

  const handleChange = (event) => {
    let values = JSON.parse(JSON.stringify(formValues));
    values[event.target.name] = event.target.value;
    setFormValues(values);
  };

  const handleSubmit = () => {
    console.log(formValues);
  };

  return (
    <>
      <Typography variant="h3">Personal Info</Typography>

      <Grid container columns={12} spacing={2}>
        {formConfig.map((item) => (
          <Grid size={3}>
            {(item.fieldType === "text" || item.fieldType === "date") && (
              <TextField
                size="small"
                fullWidth
                name={item.fieldName}
                label={item.fieldName}
                required={item.required === "true" ? true : false}
                InputLabelProps={{
                  shrink: item.fieldType === "date" || formValues[item.fieldName] && true, // Keeps the label at the top
                }}
                type={item.fieldType}
                value={
                  formValues[item.fieldName] ? formValues[item.fieldName] : ""
                }
                onChange={handleChange}
              />
            )}
            {/* {item.fieldType === "date" && (
              <TextField
                size="small"
                fullWidth
                name={item.fieldName}
                label={item.fieldName}
                InputLabelProps={{
                  shrink: true, // Keeps the label at the top
                }}
                required={item.required === "true" ? true : false}
                type={item.fieldType}
                value={
                  formValues[item.fieldName] ? formValues[item.fieldName] : ""
                }
                onChange={handleChange}
              />
            )} */}

          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: "1rem" }}>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default PersonalInfo;
