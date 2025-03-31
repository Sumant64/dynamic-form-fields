import {
    Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FormComponentTable = (props) => {
  const { fieldList, handleChange, handleAddNewRow, sectionNo, handleDeleteRow } = props;

  return (
    <>
      <TableContainer sx={{ marginTop: "1rem" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell width={50}>Index</StyledTableCell>
            <StyledTableCell width={200}>Field Name</StyledTableCell>
            <StyledTableCell width={200}>Field Type</StyledTableCell>
            <StyledTableCell width={200}>Required</StyledTableCell>
            <StyledTableCell width={200} align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fieldList.sectionFields && fieldList.sectionFields.map((field, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{field.index}</StyledTableCell>
              <StyledTableCell>
                <TextField
                  size="small"
                  fullWidth
                  label="Field Name"
                  name="fieldName"
                  value={field.fieldName}
                  onChange={(event) => handleChange(event, field.index, sectionNo)}
                />
              </StyledTableCell>
              <StyledTableCell>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Form Type
                  </InputLabel>
                  <Select
                    name="fieldType"
                    value={field.fieldType}
                    label="Select Form Type"
                    onChange={(event) => handleChange(event, field.index, sectionNo)}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Required
                  </InputLabel>
                  <Select
                    name="required"
                    value={field.required}
                    label="Select Required"
                    onChange={(event) => handleChange(event, field.index, sectionNo)}
                  >
                    <MenuItem value="true">YES</MenuItem>
                    <MenuItem value="false">NO</MenuItem>
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Tooltip title={"Add new row"}>
                    <AddCircleOutlineRoundedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleAddNewRow(field.index, sectionNo)}
                    />
                  </Tooltip>
                  {field.index !== 1 && <Tooltip title={"Delete new row"}>
                    <DeleteOutlineRoundedIcon onClick={() => handleDeleteRow(field.index, sectionNo)} sx={{ cursor: "pointer" }} />
                  </Tooltip>}
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default FormComponentTable;
