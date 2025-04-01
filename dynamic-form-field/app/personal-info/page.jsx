"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { dynamicData } from "../components/sampelObject";
import { getConfigForm } from "@/services/api";

const PersonalInfo = () => {
  const [formConfig, setFormConfig] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    initialLoad();
  }, [])

  const initialLoad = async() => {
    try{
      const res = await getConfigForm();
      let data = res.data.result[0];
      setFormConfig(data.formConfig)
      setLoading('')
    } catch(err) {
      console.log(err);
      setLoading('networkError')
    }
  }

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

      {loading === '' && formConfig.length > 0 && formConfig.map((item) => (
        <Box sx={{paddingTop: '2rem'}}>
          <Typography variant="h6" sx={{paddingBottom: '1rem', textDecoration: 'underline'}}>{item.sectionName}</Typography>
          <Grid container columns={12} spacing={2}>
          {
            item.sectionFields && item.sectionFields.map((field) => (
              <Grid size={3}>
                {(field.fieldType === "text" || field.fieldType === "date") && (
                  <TextField
                    size="small"
                    fullWidth
                    name={field.fieldName}
                    label={field.fieldName}
                    required={field.required === "true" ? true : false}
                    InputLabelProps={{
                      shrink:
                      field.fieldType === "date" ||
                        (formValues[field.fieldName] && true), // Keeps the label at the top
                    }}
                    type={field.fieldType}
                    value={
                      formValues[field.fieldName] ? formValues[field.fieldName] : ""
                    }
                    onChange={handleChange}
                  />
                )}
              </Grid>
            ))
          }
          </Grid>
        </Box>
      ))}

      <Box sx={{ marginTop: "1rem" }}>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default PersonalInfo;
