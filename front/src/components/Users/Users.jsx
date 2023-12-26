import * as React from "react";
import axios from "axios";
import { BiTrash, BiEdit, BiCartAdd } from "react-icons/bi";
import { Usersreducer } from "./Users.reducer";
import AddUsers from "./AddUsers";
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {toast } from 'react-toastify'

export const Users = () => {
    const [open,setOpen]=React.useState(false)
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
          <div className="w-40 h-12 bg-gray-500 animate-pulse rounded-full"></div>
        )}
      </div>

      {userState.loading ? (
        <div className="relative manch">

          <div className="w-[840px] h-60 wrapperTable  overflow-y-auto  border-gray-600">
            <table className="border-collapse bg-black/50 w-full  ">
              <thead className="sticky top-0 left-0 right-0 bg-black/60 text-gray-300 shadow-sm backdrop-blur-sm border-t border-b border-gray-600 z-10">
                <tr>
                  <td className="border px-10 py-4 font-semibold border-slate-600">
                    USERNAME
                  </td>
                  <td className="border px-10 py-4 font-semibold border-slate-600">
                    EMAIL
                  </td>
                  <td className="border px-10 py-4 font-semibold border-slate-600">
                    PASSWORD
                  </td>
                  <td className="border px-10 py-4 font-semibold border-slate-600">
                    ACTIONS
                  </td>
                </tr>
              </thead>
              <tbody className="text-gray-400 ">
                {userState.ListUsers.map((list, i) => (
                  <tr key={i} className="uppercase">
                    <td className="border px-10 py-2 border-slate-600 ">
                      {list.username}
                    </td>
                    <td className="border px-10 py-2 border-slate-600 ">
                      {list.email}
                    </td>
                    <td className="border px-2  max-w-[150px] overflow-hidden py-2 border-slate-600 ">
                      <div className="overflow-hidden">{list.password}</div>
                    </td>
                    <td className="border px-10 py-2 border-slate-600 ">
                      <div className="flex gap-3 w-full h-full justify-center">
                        <IconButton onClick={() => handledelete(list._id)}>
                          <BiTrash className="text-[25px] text-pink-600" />
                        </IconButton>
                        <IconButton>
                          <BiEdit className="text-[25px] text-green-500" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-[840px] h-[300px] bg-gray-700/40 rounded-md relative p-2 space-y-4  ">
          {/* <div className="w-full flex gap-3 justify-between">
            <div className="w-[20%] rounded-full h-20 animate-pulse bg-gray-500"></div>
            <div className="w-[70%]  h-20 animate-pulse bg-gray-500"></div>
          </div> */}
          <div className="flex gap-1 w-full h-full">
            <div className="w-1/3 p-3 space-y-1  h-full animate-pulse bg-gray-500">
              <div className="w-full h-1/2 gap-1 animate-pulse bg-black/30"></div>
              <div className="w-full h-1/2 gap-1 animate-pulse bg-black/30"></div>
            </div>
            <div className="w-1/3 p-3 space-x-1 flex  h-full animate-pulse bg-gray-500">
              <div className="h-full w-1/2 gap-1 animate-pulse bg-black/30"></div>
              <div className="h-full w-1/2 gap-1 animate-pulse bg-black/30"></div>
            </div>
            <div className="w-1/3 p-3 space-y-1  h-full animate-pulse bg-gray-500">
              <div className="w-full h-1/2 gap-1 animate-pulse bg-black/30"></div>
              <div className="w-full h-1/2 gap-1 animate-pulse bg-black/30"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
