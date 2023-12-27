import * as React from "react";
import { Modal, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";

function AddUsers({ open, setOpen }) {
  const [values, setvalues] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata=new FormData()
    formdata.append('file',file)
    formdata.append("picture", values.picture);
    formdata.append('username',values.username)
    formdata.append('email',values.email)
    formdata.append('password',values.password)

    axios
      .post("http://localhost:7780/SaveUsers/",formdata)
      .then((res) => {
     toast.success(res.data);
        console.log(formdata);
        setOpen(false);

      })
      .catch((err) => {
         toast.error(err.message);
      });
  };

  const [file,setFile]=React.useState()
  const handleFile=(e)=>{
    setFile(e.target.files[0])
  }



  return (
    <div>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        className="w-screen h-screen flex justify-center items-center"
      >
        <div className="w-[400px] h-[500px] bg-black/40 backdrop-blur-md border rounded-md relative">
          <div className="h-[20%] text-white text-2xl shadow-md w-full border-b flex justify-center items-center">
            <h2>ADD USERS</h2>
          </div>
          <div className="h-[80%] w-full ">
            <form
              onSubmit={handleSubmit}
              className="px-7 py-4  space-y-4 h-full relative"
            >
              <div className="bg-white px-2 py-2 rounded-md">
                <TextField
                  fullWidth
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
              <div className="bg-white px-2 py-2 rounded-md">
                <input
                  type="file"
                   onChange={handleFile}
                
                  className="file:bg-purple-600 file:outline-none
                file:border-none file:px-4 file:py-2 file:text-white
                 file:mr-4 file:rounded-md file:hover:bg-purple-800 file:duration-500"
                />
              </div>
              <div className="absolute bottom-1 left-5 py-3 rounded-md right-5 flex justify-center ">
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
      </Modal>
    </div>
  );
}

export default AddUsers;
