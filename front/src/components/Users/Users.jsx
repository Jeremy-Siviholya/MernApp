import * as React from "react";
import axios from "axios";
import { BiTrash, BiEdit, BiCartAdd } from "react-icons/bi";
import { Usersreducer } from "./Users.reducer";
import AddUsers from "./AddUsers";
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Paper, TablePagination } from "@mui/material";


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
    const [open, setOpen] = React.useState(false);
    const [userState, dispatch] = React.useReducer(Usersreducer, {
      ListUsers: [],
      loading: false,
    });


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userState.ListUsers.length) : 0;

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

  const handledelete=(id)=>{
    axios.delete("http://localhost:7780/destroyUser/"+id).then(res=>{
        const newList= userState.ListUsers.filter(user=>user._id !== id)
        dispatch({
          type: "destroyUser",
          payload: {
            ListUsers:newList
          },
        });
           toast.success(res.data);

    }).catch(err=>{})
  }

  return (
    <div className="space-y-10">
      <AddUsers open={open} setOpen={setOpen} />
      <div className="">
        {userState.loading ? (
          <Button
            startIcon={<BiCartAdd />}
            onClick={(e) => setOpen(true)}
            variant="contained"
            color="primary"
          >
            Add New
          </Button>
        ) : (
          <div className="w-40 h-12 bg-white/10 animate-pulse rounded-full"></div>
        )}
      </div>

      {userState.loading ? (
        <div className="relative manch">
          <table className="w-[890px] border-collapse">
            <thead className=" bg-black/60 text-gray-300 shadow-md   border-gray-600 z-10">
              <tr>
                <td className="border-r border-l w-[15%] py-4 px-3 font-semibold border-slate-600 border-t">
                  USERNAME
                </td>
                <td className="border-r border-l w-[35%] py-4 px-3 font-semibold border-slate-600 border-t">
                  EMAIL
                </td>
                <td className="border-r border-l w-[20%] py-4 px-3 font-semibold border-slate-600 border-t">
                  PASSWORD
                </td>
                <td className="border-r border-l w-[15%] py-4 px-3 font-semibold border-slate-600 border-t">
                  PICTURE
                </td>
                <td className="border-r border-l w-[15%] py-4 px-3 font-semibold border-slate-600 border-t">
                  <div className="w-full h-full flex justify-center ">
                    ACTIONS
                  </div>
                </td>
              </tr>
            </thead>
          </table>
          <div className="w-[890px] h-[233px] wrapperTable  overflow-y-auto overscroll-y-auto">
            <table className="border-collapse bg-black/50 w-full  ">
              <tbody className="text-gray-400 ">
                {(rowsPerPage > 0
                  ? userState.ListUsers.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : userState.ListUsers
                ).map((list, i) => (
                  <tr key={i} className="">
                    <td className="border w-[15%] px-3 py-2 border-slate-600 ">
                      {list.username}
                    </td>
                    <td className="border w-[35%] px-3 py-2 border-slate-600 ">
                      {list.email}
                    </td>
                    <td className="border w-[20%] px-3  max-w-[150px] overflow-hidden py-2 border-slate-600 ">
                      <div className="overflow-hidden">{list.password}</div>
                    </td>
                    <td className="border w-[15%] px-3  max-w-[150px] overflow-hidden py-2 border-slate-600 ">
                      <div className="overflow-hidden">{list.picture}</div>
                    </td>
                    <td className="border w-[15%] px-3 py-2 border-slate-600 ">
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
          <div className="bg-black/50 backdrop-blur-md border border-gray-600 h-20 fixed bottom-3 w-[890px] rounded-md flex justify-between">
            <Paper sx={{ width: "100%" }} variant="square">
              <TablePagination
                sx={{ width: "890px", height: "75px" }}
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
            <div className="w-1/3 p-1 space-y-1 rounded-md  h-full animate-pulse bg-white/10 ">
              <div className="w-full h-1/2 gap-1 animate-pulse bg-black/30 rounded-md "></div>
              <div className="w-full h-[48.5%] gap-1 animate-pulse bg-black/30 rounded-md "></div>
            </div>
            <div className="w-1/3 p-1 space-x-1 flex  h-full rounded-md animate-pulse bg-white/10 ">
              <div className="h-full w-1/2 gap-1 animate-pulse rounded-lg bg-black/30"></div>
              <div className="h-full w-1/2 gap-1 animate-pulse rounded-lg bg-black/30"></div>
            </div>
            <div className="w-1/3 p-1 space-y-1 rounded-md  h-full animate-pulse bg-white/10 ">
              <div className="w-full h-1/2 gap-1 animate-pulse bg-black/30 rounded-md "></div>
              <div className="w-full h-[48.5%] gap-1 animate-pulse bg-black/30 rounded-md "></div>
            </div>
          </div>

          <div className=" w-[820px] bg-white/10 rounded-md animate-pulse p-1 flex gap-1 ">
            <div className="w-[30%] rounded-md h-14 animate-pulse bg-black/30"></div>
            <div className="w-[70%] rounded-md  h-14 animate-pulse bg-black/30"></div>
          </div>
        </div>
      )}
    </div>
  );
};
