import React, { Component } from "react";
import { config } from "../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default class AllTransactions extends Component {
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
      response = await (
        await fetch(`${config.endpoint}/alltransactions`)
      ).json();
    } catch (e) {
      errored = true;
    }

    this.setState({
      loading: false,
    });
    if (!errored && response) {
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
                <TableCell>Sender Id</TableCell>
                <TableCell>Receiver Id</TableCell>
                <TableCell>Sender Name</TableCell>
                <TableCell>Receiver Name</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.sendUserId}
                  </TableCell>
                  <TableCell>{item.getUserId}</TableCell>
                  <TableCell>{item.getUsername}</TableCell>
                  <TableCell>{item.sendUsername}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
