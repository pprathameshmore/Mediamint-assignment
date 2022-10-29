import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { fetchUsers, updateUser, exportCSV } from "../services/api-service";
import { Button } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";

export const TableView = () => {
  const [isRowEditable, setIsRowEditable] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    fetchData();
  }, []);

  const updateUserHandler = async (id, user) => {
    await updateUser(id, user);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (isRowEditable && currentRowIndex === tableMeta.rowIndex) {
            return () => (
              <input
                type="text"
                value={value}
                onChange={(e) => updateValue(e.target.value)}
              />
            );
          }
          return (
            <div
              style={{
                display:
                  isRowEditable && currentRowIndex === tableMeta.rowIndex
                    ? "none"
                    : "block",
              }}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (isRowEditable && currentRowIndex === tableMeta.rowIndex) {
            return () => (
              <input
                type="text"
                value={value}
                onChange={(e) => updateValue(e.target.value)}
              />
            );
          }
          return (
            <div
              style={{
                display:
                  isRowEditable && currentRowIndex === tableMeta.rowIndex
                    ? "none"
                    : "block",
              }}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (isRowEditable && currentRowIndex === tableMeta.rowIndex) {
            return () => (
              <input
                type="text"
                value={value}
                onChange={(e) => updateValue(e.target.value)}
              />
            );
          }
          return (
            <div
              style={{
                display:
                  isRowEditable && currentRowIndex === tableMeta.rowIndex
                    ? "none"
                    : "block",
              }}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (isRowEditable && currentRowIndex === tableMeta.rowIndex) {
            return () => (
              <input
                type="text"
                value={value}
                onChange={(e) => updateValue(e.target.value)}
              />
            );
          }
          return (
            <div
              style={{
                display:
                  isRowEditable && currentRowIndex === tableMeta.rowIndex
                    ? "none"
                    : "block",
              }}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={() => {
                setIsRowEditable(!isRowEditable);
                console.log("value", value);
                console.log("tableMeta", tableMeta);
                console.log("updateValue", updateValue);
                setCurrentRowIndex(tableMeta.rowIndex);

                if (isRowEditable && currentRowIndex === tableMeta.rowIndex) {
                  //save row
                  setIsRowEditable(false);
                  const user = {
                    id: tableMeta.rowData[0],
                    name: tableMeta.rowData[1],
                    email: tableMeta.rowData[2],
                    gender: tableMeta.rowData[3],
                    status: tableMeta.rowData[4],
                  };
                  setUsers((prevUsers) => {
                    const users = [...prevUsers];
                    users[tableMeta.rowIndex] = user;
                    return users;
                  });
                  updateUserHandler(tableMeta.rowData[0], user);
                }
              }}
            >
              {isRowEditable && currentRowIndex === tableMeta.rowIndex
                ? "Save"
                : "Edit"}
            </button>
          );
        },
      },
    },
  ];

  const options = {
    onTableChange: (action, tableState) => {
      console.log(action);
      console.log(tableState);
    },
    selectableRows: false,
  };

  const downloadCSVHandler = async () => {
    const data = await exportCSV();
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${Math.random()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <MUIDataTable
        title={"User List"}
        data={users}
        columns={columns}
        options={options}
      />
      <Button variant="contained" color="primary" onClick={downloadCSVHandler}>
        Download CSV
      </Button>
    </div>
  );
};
