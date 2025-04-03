"use client";
import React, { useEffect, useState } from "react";
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
import { getConfigForm, postConfigForm } from "@/services/api";

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
            borderColor: 'green', // Border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'red', // Border color when focused
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
          authentication: "none",
          dropdownValues: [
            {
              index: 1,
              value: "",
            },
          ],
        },
      ],
    },
  ]);
  const [loading, setLoading] = useState('loading');

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      const res = await getConfigForm();
      let data = res.data.result[0];
      if(data?.formConfig.length > 0) {
        setFieldList(data.formConfig);
      }
      setLoading("");
    } catch (err) {
      console.log(err);
      setLoading("networkError");
    }
  };

  const handleChange = (event, index, sectionNo) => {
    let newFields = JSON.parse(JSON.stringify(fieldList));
    newFields[sectionNo - 1].sectionFields[index - 1][event.target.name] =
      event.target.value;
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
        dropdownValues: [
          {
            index: 1,
            value: "",
          },
        ],
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
        dropdownValues: [
          {
            index: 1,
            value: "",
          },
        ],
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
          dropdownValues:
            newFields[sectionNo - 1].sectionFields[i].dropdownValues,
        });
      }

      newFields[sectionNo - 1].sectionFields = newFieldArr;

      setFieldList(newFields);
    }
  };

  const handleDeleteRow = (index, sectionNo) => {
    let newFields = JSON.parse(JSON.stringify(fieldList));
    if (index === newFields[sectionNo - 1].sectionFields.length) {
      newFields[sectionNo - 1].sectionFields.pop();
      setFieldList(newFields);
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
  };

  const handleSubmit = async () => {
    try {
      console.log(fieldList);
      const res = await postConfigForm(fieldList);
      console.log(res);
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

      for (let i = count; i < newFields.length; i++) {
        newFieldArr.push({
          sectionNo: i + 2,
          sectionName: newFields[i].sectionName,
          sectionFields: newFields[i].sectionFields,
        });
      }
      setFieldList(newFieldArr);
    }
  };

  const handleRemoveSection = (sectionNo, item) => {
    let newFields = JSON.parse(JSON.stringify(fieldList));
    if (sectionNo === newFields.length) {
      newFields.pop();

      setFieldList(newFields);
    } else {
      let newFieldArr = [];
      for (let i = 0; i < sectionNo - 1; i++) {
        newFieldArr.push(newFields[i]);
      }

      for (let i = sectionNo; i < newFields.length; i++) {
        newFieldArr.push({
          sectionNo: i,
          sectionName: newFields[i].sectionName,
          sectionFields: newFields[i].sectionFields,
        });
      }

      setFieldList(newFieldArr);
    }
  };

  const handleSaveDropdown = () => {};

  return (
    <Box>
      <Typography>Dynamic Form</Typography>

      {/* {
        fieldList.map((field) => (
          <Box sx={{paddingTop: '10px'}}>
            <FormComponent key={field.index} field={field} handleChange={handleChange} index={field.index} handleAddNewRow={handleAddNewRow} />
          </Box>
        ))
      } */}
      <Box sx={{ marginTop: "2rem" }}>
        {loading === "" && fieldList.map((item) => {
          return (
            <Box sx={{border: '1px solid #f27059', padding: '2rem', margin: '2rem', borderRadius: '20px', backgroundColor: 'white'}}>
              <Box sx={{ display: "flex", width: "100%"}}>
                <TextField
                  size="small"
                  name="sectionName"
                  label="Section Name"
                  sx={style.textField}
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
                      sx={{ cursor: "pointer", color: '#90a955' }}
                      onClick={() => handleAddSection(item.sectionNo, item)}
                    />
                  </Tooltip>
                  <Tooltip title={"Delete Section"}>
                    <DeleteOutlineRoundedIcon
                      onClick={() => handleRemoveSection(item.sectionNo, item)}
                      sx={{ cursor: "pointer", color: '#f27059' }}
                    />
                  </Tooltip>
                </Box>
              </Box>
              <FormComponentTable
                sectionNo={item.sectionNo}
                fieldList={item}
                handleChange={handleChange}
                handleAddNewRow={handleAddNewRow}
                handleDeleteRow={handleDeleteRow}
                handleSaveDropdown={handleSaveDropdown}
              />
            </Box>
          );
        })}
      </Box>

      <Box sx={{ marginTop: "1rem" }}>
        <Button variant="contained" sx={{backgroundColor: '#1e6091', marginLeft: '2rem'}} onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default DynamicForm;
