"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FormComponent from "../components/dynamicForm/FormComponent";
import FormComponentTable from "../components/dynamicForm/FormComponentTable";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const DynamicForm = () => {
  const [fieldList, setFieldList] = useState([
    {
      sectionNo: 1,
      sectionName: "",
      sectionFields: [
        {
          index: 1,
          fieldName: "",
          fieldType: "",
          required: "false",
        },
      ],
    },
  ]);

  const handleChange = (event, index, sectionNo) => {
    let newFields = JSON.parse(JSON.stringify(fieldList));
    newFields[sectionNo - 1].sectionFields[index - 1][event.target.name] = event.target.value;
    setFieldList(newFields);
  };

  const handleAddNewRow = (index, sectionNo) => {
    let newFields = JSON.parse(JSON.stringify(fieldList));
    if (index === newFields[sectionNo - 1].sectionFields.length) {
      newFields[sectionNo - 1].sectionFields.push({
        index: index + 1,
        fieldName: "",
        fieldType: "",
        required: "false",
      });
      setFieldList(newFields);
    } else {
      let newFieldArr = [];
      let count = 0;
      for (let i = 0; i < index; i++) {
        newFieldArr.push(newFields[sectionNo - 1].sectionFields[i]);
        count++;
      }
      // c = 1

      newFieldArr.push({
        index: count + 1, // 2
        fieldName: "",
        fieldType: "",
        required: "false",
      });
      // count += 1;

      for (
        let i = count;
        i < newFields[sectionNo - 1].sectionFields.length;
        i++
      ) {
        newFieldArr.push({
          index: i + 2,
          fieldName: newFields[sectionNo - 1].sectionFields[i].fieldName,
          fieldType: newFields[sectionNo - 1].sectionFields[i].fieldType,
          required: newFields[sectionNo - 1].sectionFields[i].required,
        });
      }

      newFields[sectionNo - 1].sectionFields = newFieldArr;

      setFieldList(newFields);
    }
  };

  const handleDeleteRow = (index, sectionNo) => {
    let newFields = JSON.parse(JSON.stringify(fieldList));
    if(index === newFields[sectionNo - 1].sectionFields.length) {
      newFields[sectionNo - 1].sectionFields.pop()
      setFieldList(newFields)
    } else {
      let newFieldArr = [];
      for (let i = 0; i < index - 1; i++) {
        newFieldArr.push(newFields[sectionNo - 1].sectionFields[i]);
      }

      for (
        let i = index;
        i < newFields[sectionNo - 1].sectionFields.length;
        i++
      ) {
        newFieldArr.push({
          index: i,
          fieldName: newFields[sectionNo - 1].sectionFields[i].fieldName,
          fieldType: newFields[sectionNo - 1].sectionFields[i].fieldType,
          required: newFields[sectionNo - 1].sectionFields[i].required,
        });
      }

      newFields[sectionNo - 1].sectionFields = newFieldArr;

      setFieldList(newFields);
    }
  }

  const handleSubmit = async () => {
    try {
      console.log(fieldList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSectionChange = (event, sectionNo) => {
    let newFields = JSON.parse(JSON.stringify(fieldList));
    newFields[sectionNo - 1]["sectionName"] = event.target.value;
    setFieldList(newFields);
  };

  const handleAddSection = (sectionNo, item) => {
    let newFields = JSON.parse(JSON.stringify(fieldList));
    if (sectionNo === newFields.length) {
      newFields.push({
        sectionNo: sectionNo + 1,
        sectionName: "",
        sectionFields: [
          {
            index: 1,
            fieldName: "",
            fieldType: "",
            required: "false",
          },
        ],
      });

      setFieldList(newFields);
    } else {
      let newFieldArr = [];
      let count = 0;
      for (let i = 0; i < sectionNo; i++) {
        newFieldArr.push(newFields[i]);
        count++;
      }
      // c = 1

      newFieldArr.push({
        sectionNo: count + 1,
        sectionName: "",
        sectionFields: [
          {
            index: 1,
            fieldName: "",
            fieldType: "",
            required: "false",
          },
        ],
      });
      // count += 1;

      for (
        let i = count;
        i < newFields.length;
        i++
      ) {
        newFieldArr.push(
          {
            sectionNo: i + 2,
            sectionName: newFields[i].sectionName,
            sectionFields: newFields[i].sectionFields
          },
        );
      }
      setFieldList(newFieldArr);
    }
  };

  return (
    <>
      <Typography>Dynamic Form</Typography>

      {/* {
        fieldList.map((field) => (
          <Box sx={{paddingTop: '10px'}}>
            <FormComponent key={field.index} field={field} handleChange={handleChange} index={field.index} handleAddNewRow={handleAddNewRow} />
          </Box>
        ))
      } */}
      <Box sx={{ marginTop: "2rem" }}>
        {fieldList.map((item) => {
          return (
            <>
              <Divider sx={{margin: '1rem'}} />
              <Box sx={{ display: "flex", width: "100%", marginTop: '2rem' }}>
                <TextField
                  name="sectionName"
                  label="Section Name"
                  value={item.sectionName}
                  onChange={(event) =>
                    handleSectionChange(event, item.sectionNo)
                  }
                />
                <Box
                  sx={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title={"Add Section"}>
                    <AddCircleOutlineRoundedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleAddSection(item.sectionNo, item)}
                    />
                  </Tooltip>
                  <Tooltip title={"Delete Section"}>
                    <DeleteOutlineRoundedIcon sx={{ cursor: "pointer" }} />
                  </Tooltip>
                </Box>
              </Box>
              <FormComponentTable
                sectionNo={item.sectionNo}
                fieldList={item}
                handleChange={handleChange}
                handleAddNewRow={handleAddNewRow}
                handleDeleteRow={handleDeleteRow}
              />
            </>
          );
        })}
      </Box>

      <Box sx={{ marginTop: "1rem" }}>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default DynamicForm;
