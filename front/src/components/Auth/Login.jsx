import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { BiSend } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:7780/user/Login", values)
    .then((res) => {
      navigate('/')
    })
    .catch(err=>{
      toast.warning(err.response.data);
    })
  };
  return (
    <div className="w-screen h-screen bg-white/70 backdrop-blur-md z-50 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="w-[400px] h-[500px] relative  bg-white shadow-2xl overflow-hidden rounded-md border">
        <div className="h-[15%] flex justify-center items-center relative border-b">
          <h2 className="text-2xl text-gray-600">LOGIN</h2>
        </div>
        <form className="h-[85%] w-full ">
          <div className="h-full flex py-24 ">
            <div className="space-y-7 px-10">
              <TextField
                fullWidth
                type="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                variant="outlined"
                label="email"
              />
              <TextField
                fullWidth
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                variant="outlined"
                label="Password"
                type="password"
              />
            </div>
          </div>
          <div className="absolute bottom-5 w-full flex justify-center">
            <Button
              endIcon={<BiSend />}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
