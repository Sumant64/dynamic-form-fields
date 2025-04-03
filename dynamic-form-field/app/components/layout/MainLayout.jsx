'use client'
import { Box } from '@mui/material';
import React, { useState } from 'react';
import SidebarComp from './SidebarComp';

const MainLayout = (props) => {
    const [toggle, setToggle] = useState(false);

  return (
    <>
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                backgroundColor: '#caf0f8',
                padding: {xs: '5px', md: '13px'}
            }}
        >
            {/* Sidebar */}
            <Box sx={{
                backgroundColor: '#caf0f8',
                
            }}>
                <SidebarComp toggle={toggle} setToggle={setToggle} />
            </Box>
            {/* all the routes */}
            <Box sx={{ width: '100%', borderRadius: '20px', marginLeft: { xs: '0px', md: '20px' }, overflowY: 'auto', padding: '1rem', backgroundColor: '#FEFEFE' }}>
                {props.children}
            </Box>
        </Box>
    </>
  )
}

export default MainLayout