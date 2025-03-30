import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const FormComponent = (props) => {
  const { field, handleChange, index, handleAddNewRow } = props;
  return (
    <>
      <Grid container columns={12} spacing={2}>
        <Grid size={2}>
          <TextField
            size="small"
            fullWidth
            label="Field Name"
            name="fieldName"
            value={field.fieldName}
            onChange={(event) => handleChange(event, index)}
          />
        </Grid>
        <Grid size={2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Form Type
            </InputLabel>
            <Select
              name="fieldType"
              value={field.fieldType}
              label="Select Form Type"
              onChange={(event) => handleChange(event, index)}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Required</InputLabel>
            <Select
              name="required"
              value={field.required}
              label="Select Required"
              onChange={(event) => handleChange(event, index)}
            >
              <MenuItem value="true">YES</MenuItem>
              <MenuItem value="false">NO</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "100%",
            }}
          >
            <AddCircleOutlineRoundedIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleAddNewRow(index)}
            />
            <DeleteOutlineRoundedIcon sx={{ cursor: "pointer" }} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FormComponent;
