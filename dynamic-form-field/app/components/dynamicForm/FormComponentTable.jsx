import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CloseIcon from "@mui/icons-material/Close";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1e6091',
    color: theme.palette.common.white,
    padding: "5px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: "5px",
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

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const style = {
  textField: {
    '& .MuiInputBase-root': {
          borderRadius: '10px', // Border radius
          height: '40px',
          padding: '0px',
          margin: '0px',
          fontSize: '14px'

        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            // borderColor: 'blue', // Change border color
            margin: '0px',
            height: '40px',
          },
          '&:hover fieldset': {
            borderColor: '#90a955', // Border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#f27059', // Border color when focused
          },
        },
        // '& .MuiInputLabel-root': {
        //   color: 'purple', // Change label color
        // },
        '& .MuiInputBase-input': {
          color: 'black', // Input text color
        },
  }
}

const FormComponentTable = (props) => {
  const {
    fieldList,
    handleChange,
    handleAddNewRow,
    sectionNo,
    handleDeleteRow,
    handleSaveDropdown,
  } = props;
  const [openDialog, setOpenDialog] = useState({
    open: false,
    index: 0,
    sectionNo: 0,
    data: [
      {
        index: 1,
        value: "",
      },
    ],
  });

  const handleDropdownChange = (item, index, event) => {
    let dataArr = JSON.parse(JSON.stringify(openDialog));
    dataArr.data[index - 1].value = event.target.value;
    setOpenDialog(dataArr);
  };

  const handleAddDropdown = (index) => {
    let dataObj = JSON.parse(JSON.stringify(openDialog));
    if (index === dataObj.data.length) {
      dataObj.data.push({
        index: index + 1,
        value: "",
      });
      setOpenDialog(dataObj);
    } else {
    }
  };

  const handleDeleteDropdown = () => {};

  return (
    <>
      {/* Dropdown dialog */}
      <Dialog
        open={openDialog.open}
        onClose={() => setOpenDialog({ open: false, index: 0, sectionNo: 0 })}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Dropdown
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialog({ open: false, index: 0, sectionNo: 0 })}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {openDialog.data &&
            openDialog.data.map((item, index) => (
              <Box key={index}>
                <TextField
                  size="small"
                  value={item.value}
                  onChange={(event) =>
                    handleDropdownChange(item, item.index, event)
                  }
                />
                <Tooltip title={"Add new row"}>
                  <AddCircleOutlineRoundedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleAddDropdown(item.index)}
                  />
                </Tooltip>
                {item.index !== 1 && (
                  <Tooltip title={"Delete new row"}>
                    <DeleteOutlineRoundedIcon
                      onClick={() =>
                        handleDeleteDropdown(field.index, sectionNo)
                      }
                      sx={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
              </Box>
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={() => handleSaveDropdown(openDialog)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer sx={{ marginTop: "1rem" }}>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell sx={{minWidth: '50px'}} width={50}>Index</StyledTableCell>
            <StyledTableCell sx={{minWidth: '150px'}} width={200}>Field Name</StyledTableCell>
            <StyledTableCell sx={{minWidth: '150px'}} width={200}>Field Type</StyledTableCell>
            <StyledTableCell sx={{minWidth: '150px'}} width={200}>Required</StyledTableCell>
            <StyledTableCell sx={{minWidth: '150px'}} width={200}>Authentication</StyledTableCell>
            <StyledTableCell sx={{minWidth: '150px'}} width={200} align="center">
              Action
            </StyledTableCell>
            <StyledTableCell sx={{minWidth: '150px'}} width={200}>Dropdown Items</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fieldList.sectionFields &&
            fieldList.sectionFields.map((field, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{field.index}</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    size="small"
                    sx={style.textField}
                    fullWidth
                    // label="Field Name"
                    name="fieldName"
                    value={field.fieldName}
                    onChange={(event) =>
                      handleChange(event, field.index, sectionNo)
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <FormControl sx={style.textField} size="small" fullWidth>
                    {/* <InputLabel id="demo-simple-select-label">
                      Select Form Type
                    </InputLabel> */}
                    <Select
                      name="fieldType"
                      value={field.fieldType}
                      // label="Select Form Type"
                      onChange={(event) =>
                        handleChange(event, field.index, sectionNo)
                      }
                    >
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="dropdown">Dropdown</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell>
                  <FormControl sx={style.textField} size="small" fullWidth>
                    {/* <InputLabel id="demo-simple-select-label">
                      Required
                    </InputLabel> */}
                    <Select
                      name="required"
                      value={field.required}
                      // label="Select Required"
                      onChange={(event) =>
                        handleChange(event, field.index, sectionNo)
                      }
                    >
                      <MenuItem value="true">YES</MenuItem>
                      <MenuItem value="false">NO</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>

                {/* Authentication */}
                <StyledTableCell>
                  <FormControl sx={style.textField} size="small" fullWidth>
                    {/* <InputLabel id="demo-simple-select-label">
                      Select Authentication
                    </InputLabel> */}
                    <Select
                      name="authentication"
                      value={field.authentication}
                      // label="Select Authentication"
                      onChange={(event) =>
                        handleChange(event, field.index, sectionNo)
                      }
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="name">Name Field</MenuItem>
                      <MenuItem value="onlyCharacter">Only Characters</MenuItem>
                      <MenuItem value="onlyNumber">Only Numbers</MenuItem>
                      <MenuItem value="characterNumber">
                        Characters + Numbers
                      </MenuItem>
                      <MenuItem value="phone">Phone</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="adhar">Adhar</MenuItem>
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
                        sx={{ cursor: "pointer", color: '#90a955' }}
                        onClick={() => handleAddNewRow(field.index, sectionNo)}
                      />
                    </Tooltip>
                    {field.index !== 1 && (
                      <Tooltip title={"Delete new row"}>
                        <DeleteOutlineRoundedIcon
                          onClick={() =>
                            handleDeleteRow(field.index, sectionNo)
                          }
                          sx={{ cursor: "pointer", color: '#f27059' }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </StyledTableCell>

                {/* Dropdown Items */}
                <StyledTableCell>
                  {field.fieldType === "dropdown" && (
                    <Box
                      sx={{
                        position: "relative",
                        left: "1rem",
                      }}
                    >
                      <Tooltip title={"Add Dropdown Items"}>
                        <EditNoteOutlinedIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setOpenDialog({
                              open: true,
                              index: field.index,
                              sectionNo: sectionNo,
                              data: field.dropdownValues,
                            });
                          }}
                        />
                      </Tooltip>
                    </Box>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      </TableContainer>
    </>
  );
};

export default FormComponentTable;
