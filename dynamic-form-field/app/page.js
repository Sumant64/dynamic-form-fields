"use client";
import { useEffect, useState } from "react";
import PersonalInfoTable from "./components/personalInfo/PersonalInfoTable";
import { getConfigForm, getPersonalInfo } from "@/services/api";
import { Button, Dialog } from "@mui/material";
import ColumnFilterDialog from "./components/personalInfo/ColumnFilterDialog";

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
      <Button onClick={() => setOpenDialog('filter')} variant="contained">Filter</Button>

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
    </>
  );
}
