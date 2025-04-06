"use client";
import { useEffect, useState } from "react";
import PersonalInfoTable from "./components/personalInfo/PersonalInfoTable";
import { getConfigForm, getPersonalInfo } from "@/services/api";
import { Box, Button, Dialog, InputBase, Paper } from "@mui/material";
import ColumnFilterDialog from "./components/personalInfo/ColumnFilterDialog";
import { CiFilter } from "react-icons/ci";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [openDialog, setOpenDialog] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [createdDate, setCreatedDate] = useState({
    from: "",
    to: "",
    field: "All",
  });
  const [isCustom, setIsCustom] = useState({
    from: "",
    to: "",
    display: false,
  });
  const [sort, setSort] = useState({ field: "", value: "" });
  const [loading, setLoading] = useState("loading");

  useEffect(() => {
    columnsDynamic();
  }, []);

  useEffect(() => {
    initialLoad(searchValue, page, rowsPerPage);
  }, [page, rowsPerPage, sort]);

  const columnsDynamic = async () => {
    try {
      // for the columns
      const resConfig = await getConfigForm();
      let dataConfig = resConfig.data.result[0];

      let columnArr = [];
      dataConfig?.formConfig?.length > 0 &&
        dataConfig?.formConfig?.map((item) => {
          item.sectionFields.map((field) => {
            columnArr.push({
              id: field?._id,
              field: field?.fieldName,
              display: true,
            });
          });
        });

      setColumns(columnArr);
    } catch (err) {
      console.log(err);
    }
  };

  const initialLoad = async (search, page, rowPerPage) => {
    try {
      let params = {
        rowsPerPage: rowPerPage,
        page: page,
        search: search,
        sort: sort.field ? `${sort.field}-${sort.value}` : "",
      };
      const res = await getPersonalInfo(params);
      const data = res.data.result[0]?.data;
      const pagination = res.data.pagination;

      setRows(data);
      setCount(pagination.totalCounts);
      setLoading("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNoSearch = () => {
    setSearchValue("");
    initialLoad("", 1, 10);
  };

  const handleEnterPress = (e) => {
    if (searchValue !== "" && e.key === "Enter") {
      setPage(1);
      setRowsPerPage(10);
      initialLoad(searchValue, 1, 10);
    }
  };

  const handleSearch = () => {
    initialLoad(searchValue, 1, 10);
  };

  return (
    <>
      {/* Columns filter dialog */}
      <Dialog open={openDialog === "filter"} onClose={() => setOpenDialog("")}>
        <ColumnFilterDialog
          columns={columns}
          setColumns={setColumns}
          setOpenDialog={setOpenDialog}
        />
      </Dialog>

      <Box paddingTop={"20px"}>
        {/* Options Container */}
        <Box
          sx={{
            display: "flex",
            marginBottom: "10px",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              border: '1px solid grey',
              borderRadius: '10px'
            }}
          >
            <Box
              sx={{
                cursor: "pointer",
                padding: "4px 10px",
              }}
              onClick={() => setOpenDialog("filter")}
            >
              <CiFilter style={{position: 'relative', top: '20%'}} />
            </Box>
          </Box>

          {/* Search Container */}
          <Box
            sx={{
              position: "relative",
              borderRadius: "10px",
              backgroundColor: "#fffffff0",
              border: `1px solid #e0e0e0`,
              padding: "5px",
              marginRight: "15px",
              marginTop: { xs: "10px", md: "0px" },
              width: { xs: "100%", md: "200px" },
              height: "25px",
              display: { xs: "flex", md: "flex" },
            }}
          >
            <SearchIcon
              sx={{ marginRight: "10px", cursor: "pointer" }}
              onClick={handleSearch}
            />
            <InputBase
              placeholder="Search Payer"
              value={searchValue}
              sx={{
                height: "25px",
                position: "relative",
                width: '100%'
              }}
              inputProps={{ "aria-label": "search" }}
              type="search"
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value == "") {
                  handleNoSearch();
                }
              }}
              onKeyDown={(e) => handleEnterPress(e)}
            />
          </Box>
        </Box>

        {columns.length > 0 && (
          <PersonalInfoTable
            sort={sort}
            setSort={setSort}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            columns={columns}
            count={count}
            rowsPerPage={rowsPerPage}
            rows={rows}
          />
        )}
      </Box>
    </>
  );
}
