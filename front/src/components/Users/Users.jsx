import * as React from "react";
import axios from "axios";
import { BiTrash, BiEdit, BiSearch, BiNotepad } from "react-icons/bi";
import { Usersreducer } from "./Users.reducer";
import AddUsers from "./AddUsers";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Paper, TablePagination } from "@mui/material";
import { DarkModeContext } from "../Contexts/DarkModeContext";

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
    <div className="flex   ml-[410px]">
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
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const Users = () => {
  const { darkMode } = React.useContext(DarkModeContext);
  const [open, setOpen] = React.useState(false);
  const [userState, dispatch] = React.useReducer(Usersreducer, {
    ListUsers: [],
    loading: false,
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - userState.ListUsers.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handledelete = (id) => {
    axios
      .delete("http://localhost:7780/destroyUser/" + id)
      .then((res) => {
        const newList = userState.ListUsers.filter((user) => user._id !== id);
        dispatch({
          type: "destroyUser",
          payload: {
            ListUsers: newList,
          },
        });
        toast.success(res.data);
      })
      .catch((err) => {});
  };

  const [query, setQuery] = React.useState("");

  const keys = ["username", "email"];

  const search = (data) => {
    return data.filter((list) =>
      keys.some(
        (key) =>
          list[key].toLowerCase().includes(query) ||
          list[key].toUpperCase().includes(query)
      )
    );
  };

  return (
    <div className="space-y-10">
      <AddUsers open={open} setOpen={setOpen} />
      <div className="w-[890px] ">
        {userState.loading ? (
          <div className="flex justify-between w-full">
            <Button
              startIcon={<BiNotepad />}
              onClick={(e) => setOpen(true)}
              variant="contained"
              sx={{ borderRadius: "20px" }}
              color="primary"
            >
              Add New
            </Button>
            <div
              className={`flex overflow-hidden relative ${
                darkMode
                  ? "bg-white/70 text-gray-600"
                  : "bg-[#242424]  text-gray-300"
              }  pl-3`}
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="search..."
                className="outline-none border-none bg-transparent "
              />
              <div
                className={`${
                  darkMode ? "bg-white text-[#0099ff]" : "bg-black text-white"
                }  backdrop-blur-md flex items-center w-10 justify-center absolute right-0 top-0 bottom-0`}
              >
                <BiSearch className="text-[20px] " />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[870px] flex justify-between">
            <div className="w-40 h-12 bg-black/10 animate-pulse rounded-full"></div>
            <div className="w-52 flex items-center h-11 bg-black/10 relative animate-pulse rounded-md ">
              <div className="bg-black/10 animate-pulse p-1 rounded-full absolute left-2 w-[150px] h-8 "></div>
              <div className="bg-black/10 animate-pulse p-1 rounded-md absolute right-2 ">
                <BiSearch className="text-gray-200 text-[25px]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {userState.loading ? (
        <div className="relative manch">
          <table className="w-[890px] border-collapse">
            <thead
              className={` ${
                darkMode
                  ? "bg-white/60 text-gray-600 border-gray-600"
                  : "bg-[#191919] text-white border-gray-300"
              }   shadow-md    z-10`}
            >
              <tr>
                <td
                  className={`${
                    !darkMode ? "border-gray-600" : "border-slate-300"
                  } border-r border-l w-[15%] py-4 px-3 font-semibold  border-t`}
                >
                  USERNAME
                </td>
                <td
                  className={`${
                    !darkMode ? "border-gray-600" : "border-slate-300"
                  } border-r border-l w-[35%] py-4 px-3 font-semibold  border-t`}
                >
                  EMAIL
                </td>
                <td
                  className={`${
                    !darkMode ? "border-gray-600" : "border-slate-300"
                  } border-r border-l w-[20%] py-4 px-3 font-semibold  border-t`}
                >
                  PASSWORD
                </td>
                <td
                  className={`${
                    !darkMode ? "border-gray-600" : "border-slate-300"
                  } border-r border-l w-[15%] py-4 px-3 font-semibold  border-t`}
                >
                  <div className="w-full h-full flex justify-center ">
                    PICTURE
                  </div>
                </td>
                <td
                  className={`${
                    !darkMode ? "border-gray-600" : "border-slate-300"
                  } border-r border-l w-[15%] py-4 px-3 font-semibold  border-t`}
                >
                  <div className="w-full h-full flex justify-center ">
                    ACTIONS
                  </div>
                </td>
              </tr>
            </thead>
          </table>
          <div className="w-[890px] h-[233px] wrapperTable  overflow-y-auto overscroll-y-auto">
            <table
              className={`${
                !darkMode
                  ? "bg-[#242424] text-gray-200"
                  : "bg-white/50 text-gray-500"
              }  border-collapse  w-full  `}
            >
              <tbody className=" ">
                {(rowsPerPage > 0
                  ? userState.ListUsers.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : search(userState.ListUsers)
                ).map((list, i) => (
                  <tr key={i} className="">
                    <td
                      className={`${
                        !darkMode ? "border-gray-600" : "border-slate-300"
                      } border w-[15%] px-3 py-2  uppercase`}
                    >
                      {list.username}
                    </td>
                    <td
                      className={`${
                        !darkMode ? "border-gray-600" : "border-slate-300"
                      } border w-[35%] px-3 py-2  `}
                    >
                      {list.email}
                    </td>
                    <td
                      className={`${
                        !darkMode ? "border-gray-600" : "border-slate-300"
                      } border w-[20%] px-3  max-w-[150px] overflow-hidden py-2 `}
                    >
                      <div className="overflow-hidden">{list.password}</div>
                    </td>
                    <td
                      className={`${
                        !darkMode ? "border-gray-600" : "border-slate-300"
                      } border w-[15%] px-3  max-w-[150px] overflow-hidden py-2 `}
                    >
                      <div className="overflow-hidden w-full flex justify-center h-full ">
                        <img
                          className="w-12 rounded-md border-2 border-[#0099ff] h-12 object-cover bg-center "
                          src={`http://localhost:7780/images/${list.picture}`}
                          alt="hello"
                        />
                      </div>
                    </td>
                    <td
                      className={`border w-[15%] px-3 py-2  ${
                        !darkMode ? "border-gray-600" : "border-slate-300"
                      }`}
                    >
                      <div className="flex gap-3 w-full h-full justify-center">
                        <IconButton onClick={() => handledelete(list._id)}>
                          <BiTrash className="text-[25px] text-pink-600" />
                        </IconButton>
                        <Link to={`/updateUser/${list._id}`}>
                          <IconButton>
                            <BiEdit className="text-[25px] text-green-500" />
                          </IconButton>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-black/50 backdrop-blur-md border  border-gray-300 h-20 fixed bottom-3 w-[890px] rounded-md flex justify-between">
            <Paper sx={{ opacity: "90%" }}>
              <TablePagination
                sx={{
                  width: "890px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={userState.ListUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: false,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </Paper>
          </div>
        </div>
      ) : (
        <div className="w-[890px] h-[300px] rounded-md relative p-2 space-y-4  ">
          <div className="flex gap-1 w-full h-full">
            <div className="w-1/3 p-1 space-y-1 rounded-md  h-full animate-pulse bg-black/10 ">
              <div className="w-full h-1/2 gap-1 animate-pulse bg-black/10 rounded-md "></div>
              <div className="w-full h-[48.5%] gap-1 animate-pulse bg-black/10 rounded-md "></div>
            </div>
            <div className="w-1/3 p-1 space-x-1 flex  h-full rounded-md animate-pulse bg-black/10 ">
              <div className="h-full w-1/2 gap-1 animate-pulse rounded-lg bg-black/10"></div>
              <div className="h-full w-1/2 gap-1 animate-pulse rounded-lg bg-black/10"></div>
            </div>
            <div className="w-1/3 p-1 space-y-1 rounded-md  h-full animate-pulse bg-black/10 ">
              <div className="w-full h-1/2 gap-1 animate-pulse bg-black/10 rounded-md "></div>
              <div className="w-full h-[48.5%] gap-1 animate-pulse bg-black/10 rounded-md "></div>
            </div>
          </div>

          <div className=" w-[870px] bg-black/10 rounded-md animate-pulse p-1 flex gap-1 ">
            <div className="w-[30%] rounded-md h-14 animate-pulse bg-black/10"></div>
            <div className="w-[70%] rounded-md  h-14 animate-pulse bg-black/10"></div>
          </div>
        </div>
      )}
    </div>
  );
};
