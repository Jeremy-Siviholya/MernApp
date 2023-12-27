import * as React from "react";
import {  TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser  ()  {

  
  const [values, setvalues] = React.useState({
    username: "",
    email: "",
    password: "",
  });
const {id}=useParams()

  const getIdUser=()=>{
    axios.get("http://localhost:7780/getUsers/"+id).then(res=>{
      setvalues({
        ...values,
          username:res.data.username,
          email:res.data.email,
          password:res.data.password
      })

    }).catch(err=>{})
  }

  React.useEffect(()=>{
    getIdUser()
  },[])

  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

     const formdata = new FormData();
     formdata.append("image", file);
     formdata.append("username", values.username);
     formdata.append("email", values.email);
     formdata.append("password", values.password);
    axios
      .patch("http://localhost:7780/updateUser/" + id, formdata)
      .then((res) => {
        navigate('/')
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleClose=(e)=>{
    e.stopPropagation()
    e.preventDefault()
  navigate('/')

  }

  const handleAwait=(e)=>{
    e.stopPropagation()
    navigate("/updateUser/"+id);
  }

    const [file, setFile] = React.useState();
    const handleFile = (e) => {
      setFile(e.target.files[0]);
    };

  return (
    <div>
      <div
        onClick={handleClose}
        className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-black/60 z-50 flex justify-center items-center"
      >
        <div
          onClick={handleAwait}
          className="w-[400px] h-[500px] bg-white/90 backdrop-blur-md border rounded-md relative"
        >
          <div className="h-[15%] text-gray-600 text-3xl shadow-md w-full border-b flex justify-center items-center">
            <h2>UPDATE USERS</h2>
          </div>
          <div className="h-[85%] w-full ">
            <form
              onSubmit={handleSubmit}
              className="px-7 py-4  space-y-4 h-full relative"
            >
              <div className=" px-2 py-2 rounded-md">
                <TextField
                  fullWidth
                  value={values.username}
                  onChange={(e) =>
                    setvalues({ ...values, username: e.target.value })
                  }
                  label="username"
                  variant="outlined"
                />
              </div>
              <div className=" px-2 py-2 rounded-md">
                <TextField
                  fullWidth
                  value={values.email}
                  onChange={(e) =>
                    setvalues({ ...values, email: e.target.value })
                  }
                  type="email"
                  label="email"
                  variant="outlined"
                />
              </div>
              <div className=" px-2 py-2 rounded-md">
                <TextField
                  fullWidth
                  onChange={(e) =>
                    setvalues({ ...values, password: e.target.value })
                  }
                  type="password"
                  label="password"
                  variant="outlined"
                />
              </div>
              <div className="bg-gray-300 px-2 py-2 rounded-md">
                <input
                  type="file"
                  onChange={handleFile}
                  className="file:bg-purple-600 file:outline-none
                file:border-none file:px-4 file:py-2 file:text-white
                 file:mr-4 file:rounded-full file:hover:bg-purple-800 file:duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-5 py-3 rounded-md right-5 flex justify-center ">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="info"
                  endIcon={<SendIcon />}
                >
                  SUBMIT
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


