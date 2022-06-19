import React, { Component } from "react";
import { Link } from "react-router-dom";
import { config } from "../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default class Alluser extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
    };
  }

  performAllUserApiCall = async () => {
    let response = {};
    let errored = false;
    this.setState({
      loading: true,
    });
    try {
      response = await (await fetch(`${config.endpoint}/allusers`)).json();
    } catch (e) {
      errored = true;
    }

    this.setState({
      loading: false,
    });
    if (!errored && response) {
      console.log(response);
      this.setState({
        data: response,
      });
    }
  };

  componentDidMount() {
    this.performAllUserApiCall();
  }

  render() {
    return (
      <div style={{ padding: 70 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((item) => (
                <TableRow
                  key={item.userid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.userid}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.balance}</TableCell>
                  <TableCell>
                    <Link to={`/user/${item.userid}`}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
