import { Box, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";

const ColumnFilterDialog = (props) => {
    const [checkList, setCheckList] = useState(props.columns);


    const handleChange = (item) => {
        let newCheckList = JSON.parse(JSON.stringify(checkList));
        newCheckList.forEach((value) => {
            if (value.field === item.field) {
                value.display = !value.display;
            }
        })

        setCheckList(newCheckList);
    }

    const handleReset = () => {
        let newCheckList = JSON.parse(JSON.stringify(checkList));
        newCheckList.forEach((value) => {
            value.display = true;
        })
        setCheckList(newCheckList);
        props.setColumns(newCheckList);
        props.setOpenDialog(false)
    }

    const handleApply = () => {
        props.setColumns(checkList);
        props.setOpenDialog(false)
    }

    return (
        <>
            <Box
                sx={{
                    paddingRight: '1rem',
                    paddingLeft: '1rem',
                    paddingTop: '1rem'
                }}
            >
                {/* header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <h3>Edit Column</h3>
                    <IoIosCloseCircle style={{
                        width: '25px',
                        height: '25px',
                        position: 'relative',
                        // top: '12px',
                        marginLeft: '2rem',
                        cursor: 'pointer'
                    }} onClick={() => props.setOpenDialog(false)} />
                </Box>

                {/* Options */}
                <Box
                    sx={{
                        maxHeight: '250px',
                        overflowY: 'auto',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        /* width */
                        "::-webkit-scrollbar": {
                            width: "5px"
                        },

                        /* Track */
                        "::-webkit-scrollbar-track": {
                            background: "#f1f1f1"
                        },

                        /* Handle */
                        "::-webkit-scrollbar-thumb": {
                            background: "#888"
                        },

                        /* Handle on hover */
                        "::-webkit-scrollbar-thumb:hover": {
                            background: "#555"
                        }
                    }}
                >
                    <FormGroup>
                        {
                            checkList?.length > 0 && checkList.map((item, index) => (
                                <FormControlLabel key={index} control={<Checkbox checked={item.display} onChange={() => handleChange(item)} />} label={item.field} />
                            ))
                        }
                    </FormGroup>
                </Box>

            </Box>
            {/* Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px'
                }}
            >
                <Button
                    sx={{
                        color: "white",
                        backgroundColor: '#2C387E',
                        fontSize: '12px',
                        width: '80px',
                        "&:hover": {
                            backgroundColor: "#8088b2",
                        },
                    }}
                    onClick={() => handleReset()}
                >Reset</Button>
                <Button
                    sx={{
                        color: "white",
                        backgroundColor: '#2C387E',
                        fontSize: '12px',
                        width: '80px',
                        "&:hover": {
                            backgroundColor: "#8088b2",
                        },
                    }}
                    onClick={() => handleApply()}
                >Apply</Button>
            </Box>
        </>
    )
}

export default ColumnFilterDialog