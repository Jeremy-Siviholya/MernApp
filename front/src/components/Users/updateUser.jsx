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
    axios
      .patch("http://localhost:7780/updateUser/" + id, values)
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

  return (
    <div>
      <div
        onClick={handleClose}
        className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-black/60 z-50 flex justify-center items-center"
      >
        <div
          onClick={handleAwait}
          className="w-96 h-[440px] bg-black/40 backdrop-blur-md border rounded-md relative"
        >
          <div className="h-[20%] text-white text-2xl shadow-md w-full border-b flex justify-center items-center">
            <h2>UPDATE USERS</h2>
          </div>
          <div className="h-[80%] w-full ">
            <form
              onSubmit={handleSubmit}
              className="px-7 py-4  space-y-4 h-full relative"
            >
              <div className="bg-white px-2 py-2 rounded-md">
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
              <div className="bg-white px-2 py-2 rounded-md">
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
              <div className="bg-white px-2 py-2 rounded-md">
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
              <div className="absolute bottom-5 left-5 py-3 rounded-md right-5 flex justify-center ">
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


