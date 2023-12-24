import * as React from "react";
import axios from "axios";
import { BiTrash, BiEdit } from "react-icons/bi";
import { Usersreducer } from "./Users.reducer";
import {
  Box,
  IconButton,
  TablePagination,

} from "@mui/material";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import styled from "@emotion/styled";

import "react-toastify/dist/ReactToastify.css";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }} className='text-white'>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



export const Users = () => {
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);

        const emptyRows =
          page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - ListStudent.length)
            : 0;

        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };

  const [userState, dispatch] = React.useReducer(Usersreducer, {
    ListUsers: [],
    loading: false,
  });

  const getUsers = () => {
    axios
      .get("http://localhost:7780/getUsers")
      .then((res) => {
        dispatch({
          type: "userState",
          payload: {
            ListUsers: res.data,
          },
        });
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    getUsers();
  }, [userState]);
  return (
    <div className="space-y-20">
      <div className="">
        <button className="bg-[#0099ff] px-10 py-2 flex items-center rounded-full">
          Add New
        </button>
      </div>
      {userState.loading ? (
        <table className="border-collapse bg-black/20 text-gray-400 rounded-md overflow-hidden border">
          <thead>
            <tr>
              <td className="border px-10 py-2 font-semibold border-slate-600">
                USERNAME
              </td>
              <td className="border px-10 py-2 font-semibold border-slate-600">
                EMAIL
              </td>
              <td className="border px-10 py-2 font-semibold border-slate-600">
                PASSWORD
              </td>
              <td className="border px-10 py-2 font-semibold border-slate-600">
                ACTIONS
              </td>
            </tr>
          </thead>
          <tbody>
            {userState.ListUsers.map((list, i) => (
              <tr key={i}>
                <td className="border px-10 py-2 border-slate-600 ">
                  {list.username}
                </td>
                <td className="border px-10 py-2 border-slate-600 ">
                  {list.email}
                </td>
                <td className="border px-10 py-2 border-slate-600 ">
                  {list.password}
                </td>
                <td className="border px-10 py-2 border-slate-600 ">
                  <div className="flex gap-3 w-full h-full justify-center">
                    <BiTrash className="text-[25px] text-pink-600" />
                    <BiEdit className="text-[25px] text-green-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-[500px] h-[300px] bg-gray-700/40 rounded-md relative py-7 space-y-4 px-10 ">
          <div className="w-full flex gap-3 justify-between">
            <div className="w-[20%] rounded-full h-20 animate-pulse bg-gray-500"></div>
            <div className="w-[70%]  h-20 animate-pulse bg-gray-500"></div>
          </div>
          <div className="w-full rounded-full h-10 animate-pulse bg-gray-500"></div>
          <div className="w-full rounded-full h-10 animate-pulse bg-gray-500"></div>
        </div>
      )}
      <div>
        <TablePagination
        className="w-[670px] text-white bg-slate-900"
          variant=""
          rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
          colSpan={3}
          count={userState.ListUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "Ligne Par Page",
            },
            native: false,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </div>
    </div>
  );
};
