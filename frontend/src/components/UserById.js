import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { config } from "../App";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import "./UserById.css";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserById = () => {
  let { id } = useParams();
  const [userData, setUserData] = useState({});
  const [allUserData, setallUserData] = useState([]);
  const [receiverId, setReceiverId] = useState(id);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [messageStatus, setmessageStatus] = useState(-1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setMessage("");
    setmessageStatus(-1);
    setOpen(false);
  };
  const handleChange = (event) => {
    setReceiverId(event.target.value);
    console.log(event.target.value);
  };
  const onAmountChange = (event) => {
    setAmount(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    const fetchUser = async () => {
      const data = await (await fetch(`${config.endpoint}/user/${id}`)).json();
      setUserData(data);
      console.log(data);
    };
    const allUser = async () => {
      const user = await (await fetch(`${config.endpoint}/allusers`)).json();
      setallUserData(user);
      console.log(user);
    };
    allUser();
    fetchUser();
  }, [id]);

  const apiCallTransferMoney = async () => {
    var requestOptions = {
      method: "PATCH",
      redirect: "follow",
    };
    let response = {};
    let errored = false;
    try {
      response = await (
        await fetch(
          `${config.endpoint}/transaction?sendUser=${id}&getUser=${receiverId}&amount=${amount}`,
          requestOptions
        )
      ).json();
    } catch (e) {
      errored = true;
    }
    if (errored) {
      setMessage("Unable to do transaction");
      return;
    }
    if (response.code === 201) {
      setmessageStatus(1);
      setMessage(response.message);
    } else {
      setmessageStatus(0);
      setMessage(response.message);
    }
  };

  const transferMoney = async () => {
    await apiCallTransferMoney();
  };

  return (
    <>
      <div className="userbyid-container">
        <div className="userbyid-btn">
          <Link to="/allusers" className="userbyid-btns">
            <Button variant="contained">Go Back</Button>
          </Link>
          <Link to="/" className="userbyid-btns">
            <Button variant="contained">Home</Button>
          </Link>
        </div>
        {userData.user !== undefined && (
          <div className="user-card-container">
            <div className="user-card-id">Id : {userData.user.userid}</div>
            <div className="user-card-name">Name: {userData.user.name}</div>
            <div className="user-card-email">Email: {userData.user.email}</div>
            <div className="user-card-balance">
              Balance: &nbsp;
              <span className="user-card-amount">
                Rs. {userData.user.balance}
              </span>
            </div>
            <Button onClick={handleOpen} variant="contained">
              Send Money
            </Button>
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {messageStatus === 0 && <Alert severity="error">{message}</Alert>}
          {messageStatus === 1 && (
            <Alert severity="success">Vola! {message}</Alert>
          )}
          <h3>Select Receiver Id</h3>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Id</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={receiverId}
              label="Id"
              onChange={handleChange}
            >
              {allUserData.map((item) => (
                <MenuItem key={item.userid} value={item.userid}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h3>Amount</h3>
          <TextField
            fullWidth
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onAmountChange}
          />
          <br />
          <br />
          <Button
            fullWidth
            variant="contained"
            className="tran-div"
            // onClick={() => {
            //   transferMoney();
            //   handleClose();
            // }}
            onClick={transferMoney}
            // onClick={handleClose}
          >
            Transfer Money
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserById;
