"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { dynamicData } from "../components/sampelObject";
import { getConfigForm, postPersonalInfo } from "@/services/api";

const style = {
  textField: {
    "& .MuiInputBase-root": {
      borderRadius: "10px", // Border radius
      height: "40px",
      padding: "0px",
      margin: "0px",
      fontSize: "14px",
    },
    "& .MuiInputBase-input::placeholder": {
      fontSize: "12px", // Change placeholder font size here
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: 'blue', // Change border color
        margin: "0px",
        height: "40px",
      },
      "&:hover fieldset": {
        borderColor: "#90a955", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f27059", // Border color when focused
      },
    },
    // '& .MuiInputLabel-root': {
    //   color: 'purple', // Change label color
    // },
    "& .MuiInputBase-input": {
      color: "black", // Input text color
    },
  },
};

const PersonalInfo = () => {
  const [formConfig, setFormConfig] = useState([]);
  const [loading, setLoading] = useState("loading");
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      const res = await getConfigForm();
      let data = res.data.result[0];
      setFormConfig(data.formConfig);
      setLoading("");
    } catch (err) {
      console.log(err);
      setLoading("networkError");
    }
  };

  const handleChange = (event) => {
    let values = JSON.parse(JSON.stringify(formValues));
    values[event.target.name] = event.target.value;
    setFormValues(values);
  };

  const handleSubmit = async () => {
    try {
      console.log(formValues);
      const res = await postPersonalInfo(formValues);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Typography variant="h3">Personal Info</Typography>

      {loading === "" &&
        formConfig.length > 0 &&
        formConfig.map((item) => (
          <Box
            sx={{
              border: "1px solid #f2705970",
              padding: {xs: "1rem", md: "2rem"},
              backgroundColor: "white",
              borderRadius: "20px",
              margin: {xs: "5px", md: "2rem"},
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "1rem",
                backgroundColor: "#219ebc",
                color: "#fff",
                paddingLeft: "1rem",
              }}
            >
              {item.sectionName}
            </Typography>
            <Grid container columns={12} spacing={2}>
              {item.sectionFields &&
                item.sectionFields.map((field) => (
                  <Grid size={{xs: 12, md: 3}}>
                    {(field.fieldType === "text" ||
                      field.fieldType === "date" ||
                      field.fieldType === "number"
                      ) && (
                      <TextField
                        size="small"
                        sx={style.textField}
                        fullWidth
                        name={field._id}
                        label={field.fieldName}
                        required={field.required === "true" ? true : false}
                        InputLabelProps={{
                          shrink:
                            field.fieldType === "date" ||
                            (formValues[field.fieldName] && true), // Keeps the label at the top
                        }}
                        type={field.fieldType}
                        value={
                          formValues[field._id] ? formValues[field._id] : ""
                        }
                        onChange={handleChange}
                      />
                    )}
                  </Grid>
                ))}
            </Grid>
          </Box>
        ))}

      <Box sx={{ marginTop: "1rem", paddingLeft: {xs: '10px', md: '2rem'} }}>
        <Button variant="contained" sx={{backgroundColor: '#1e6091', borderRadius: '10px'}} onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default PersonalInfo;
