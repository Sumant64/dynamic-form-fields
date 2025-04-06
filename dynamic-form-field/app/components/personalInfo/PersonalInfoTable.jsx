import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import React from "react";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

const PersonalInfoTable = ({ columns, page, rowsPerPage, count, rows, setPage, setRowsPerPage, sort, setSort, handleEditInfo }) => {
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

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  }

  const handleSort = (item) => {
    console.log(item)
      if(item === sort.field) {
        setSort({field: item, value: sort.value === "asc" ? "desc" : "asc"})
      } else {
        setSort({field: item, value: "asc"})
      }
  }

  return (
  <>
    {/* table section */}
    <TableContainer sx={{ height: '70vh' }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ position: 'sticky', top: '0px', zIndex: '5' }}>
            <TableRow>
              {
                columns.length > 0 && columns.map((item, index) => {
                  if (item.display) {
                    return (
                      <StyledTableCell key={index} sx={{ cursor: 'pointer' }} onClick={() => handleSort(item.id)}>
                        <Tooltip title="Click to Sort Column">
                          <div>
                              {item.field}
                              {sort.field === item.id && sort.value === "asc" && <SouthIcon sx={{position: 'relative', top: '2px', marginLeft: '5px', fontSize: '15px'}} /> }
                              {sort.field === item.id && sort.value === "desc" && <NorthIcon sx={{position: 'relative', top: '2px', marginLeft: '5px', fontSize: '15px'}} />}
                          </div>
                        </Tooltip>
                      </StyledTableCell>
                    )
                  }
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
                rows?.length > 0 && rows.map((row, index) => {
                    return (
                        <StyledTableRow sx={{cursor: 'pointer'}} onClick={() => handleEditInfo(row._id)} key={index}>
                            {
                                columns.length > 0 && columns.map((column) => column.display && <StyledTableCell>{row.personalInfo[column.id]}</StyledTableCell>)
                            }
                        </StyledTableRow>
                    )
                })
            }
          </TableBody>
        </Table>
      </TableContainer>

      {/* table pagination */}
      {rows.length > 0 && (
        <TablePagination
          component={Paper}
          elevation={2}
          sx={{
            "& .MuiTablePagination-selectLabel": {
              margin: '0px'
            },
            "& .MuiTablePagination-displayedRows": {
              margin: '0px'
            },
            "& .MuiTablePagination-input .MuiSvgIcon-fontSizeMedium": {
              color: '#fff'
            },
            backgroundColor: "#1e6091",
            padding: '0px !important',
            color: "#fff",
            bottom: "0px",
            width: "100%",
          }}
          count={count}
          page={page - 1}
          onPageChange={(event, newPage) => setPage(newPage + 1)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
  </>
  );
};

export default PersonalInfoTable;
