import React from 'react'
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import { useState } from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
});


const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};


function StudentDetails(props) {

  const classes = useStyles();
  let list = props.detail

  const [rows, setRows] = React.useState(list)
  const [previous, setPrevious] =useState({});
  

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };


  return (
    <div className="StudentDetails">
      <h2>Student Details</h2>


      <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
               <TableCell >Sr. No.</TableCell>
               <TableCell >Student</TableCell>
              <TableCell  align="left">Class</TableCell>
              <TableCell  align="left">Gender</TableCell>
              <TableCell  align="left">BirthDate</TableCell>
              <TableCell  align="left">E-Mail</TableCell>
              <TableCell  align="left">Address</TableCell>
              <TableCell  align="left">Phone</TableCell>
              <TableCell  align="left">Hobbies</TableCell>
              <TableCell  align="left">Newsletter</TableCell>
              <TableCell  align="left">Delete</TableCell>
              <TableCell  align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={row.id}>
              <TableCell>{index+1} </TableCell>
              
              <CustomTableCell {...{ row, name: "fullname", onChange }} />
              <CustomTableCell {...{ row, name: "classlevel", onChange }} />
              <CustomTableCell {...{ row, name: "gender", onChange }} />
              <CustomTableCell {...{ row, name: "date", onChange }} />
              <CustomTableCell {...{ row, name: "email", onChange }} />
              <CustomTableCell {...{ row, name: "address", onChange }} />
              <CustomTableCell {...{ row, name: "phone", onChange }} />
              <CustomTableCell {...{ row, name: "hobbies", onChange }} />
              <CustomTableCell {...{ row, name: "check", onChange }} />
              <TableCell align="left"><Button onClick={() => { props.onDelete(index) }} variant="contained" color="secondary">Delete</Button></TableCell>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <Button
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      Save
                    </Button>
                    <Button
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      UnDo
                    </Button>
                  </>
                ) : (
                  <Button
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

    </div>
  )
}


export default StudentDetails
