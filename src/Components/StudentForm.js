import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '22ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function StudentForm(props) {

    //States

    const classes = useStyles();
    const [student, setStudent] = useState({
        firstname: "",
        midname: "",
        lastname: "",
        fullname:"",
        address: "",
        email: "",
        date: "",
        classlevel: "",
        phone: "",
        gender: "",
        hobbies: "",
        check: true
    })

    //Functions
    function handleChange(e) {
        const { name, value } = e.target
        setStudent((PreviousValue) => {
            return {
                ...PreviousValue,
                [name]: value
            }
        })
    }


    return (
        <div className="StudentForm">
            <h2>Student Form</h2>

            <form className={classes.root} Validate autoComplete="on">

                <div className="Container">
                    <TextField id="First_Name" label="First Name" name="firstname" value={student.firstname} onChange={(e) => { handleChange(e) }} />
                    <TextField id="First_Name" label="Middle Name" name="midname" value={student.midname} onChange={(e) => { handleChange(e) }} />
                    <TextField id="Last_Name" label="Last Name" name="lastname" value={student.lastname} onChange={(e) => { handleChange(e) }} />
                </div>

                <div className="Container">
                    <TextField
                        id="Address"
                        label="Address"
                        multiline
                        variant="outlined"
                        name="address"
                        value={student.address}
                        onChange={(e) => { handleChange(e) }} />
                    <TextField id="Mail" label="E-Mail" name="email" value={student.email} onChange={(e) => { handleChange(e) }} />
                    <TextField
                        id="Date"
                        label="Birthday"
                        type="date"
                        name="date"
                        value={student.date}
                        onChange={(e) => { handleChange(e) }}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </div>

                <div className="Container">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="Class_Level">Class</InputLabel>
                        <Select value={student.classlevel} name="classlevel" onChange={(e) => { handleChange(e) }}>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField required id="standard-required" label="Phone No." name="phone" value={student.phone} onChange={(e) => { handleChange(e) }} />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={student.gender} onChange={(e) => { handleChange(e) }}>
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                </div>

                <div className="Container">
                    <TextField
                        id="Hobbies"
                        label="Hobbies"
                        multiline
                        variant="outlined"
                        value={student.hobbies}
                        name="hobbies"
                        onChange={(e) => { handleChange(e) }} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="check"
                                color="Primary"
                                checked={student.check}
                                onChange={() => {
                                    setStudent((PreviousValue) => {
                                        return {
                                            ...PreviousValue,
                                            check: !student.check
                                        }
                                    }
                                    )
                                }
                                }

                            />
                        }
                        label="Subscribe to our Newsletter" />


                    <Button onClick={() => { props.handleSubmit(student) }} className="Submit" variant="contained" color="primary">
                        Submit
      </Button>
                </div>
            </form>
        </div>
    )
}

export default StudentForm
