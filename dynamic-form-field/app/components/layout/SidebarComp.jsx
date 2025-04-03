'use client'
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltIcon from '@mui/icons-material/ListAlt';

const Item = (props) => {
  const { title, to, icon, selected, setSelected } = props;

  return (
    <MenuItem
      active={selected === title}
      style={{
        // color: colors.grey[100],
        color: `${selected === title ? "#fff" : "#141414"}`,
        backgroundColor: `${selected === title ? "#219ebc" : "#caf0f8"}`,
        borderRadius: '10px'
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link href={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SidebarComp = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const [userName, setUserName] = useState('Sumant');
    const [corporateName, setCorporateName] = useState("Reports")

    const handleClick = () => {

    }

  return (
    <Box
      sx={{
        '& .pro-icon-wrapper': {
          backgroundColor: '#1e6091 !important',
        },
        '& .pro-inner-item': {
          padding: '0px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#219ebc !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
        '& .css-dip3t8': {
          backgroundColor: 'rgb(249, 249, 249, 0.95) !important',
        },
        height: '100vh',
        width: '100%',
        backgroundColor: '#caf0f8'
      }}
    >
      <Sidebar
        backgroundColor={"#caf0f8"}
        transitionDuration={400}
        onBackdropClick={() => props.setToggle(false)}
        toggled={props.toggle}
        collapsedWidth="80px"
        width="250px"
        collapsed={isCollapsed}
        breakPoint="sm"
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? '#f5d9ff' : '#d359ff',
                  backgroundColor: active ? '#e2e2e2' : undefined,
                };
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '-10px 0 20px 0',
              backgroundColor: '#caf0f8'
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="end" alignItems="center" ml="15px">
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{color: '#219ebc'}} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Box onClick={() => handleClick()}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Configure Form"
                to="/dynamic-form"
                icon={<ListAltIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default SidebarComp