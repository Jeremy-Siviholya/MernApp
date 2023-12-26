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
    axios
      .post("http://localhost:7780/SaveUsers/", values)
      .then((res) => {
     toast.success(res.data);

    
        
        setOpen(false);

      })
      .catch((err) => {
         toast.error(err.message);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        className="w-screen h-screen flex justify-center items-center"
      >
        <div className="w-96 h-[440px] bg-black/40 backdrop-blur-md border rounded-md relative">
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
      </Modal>
    </div>
  );
}

export default AddUsers;
