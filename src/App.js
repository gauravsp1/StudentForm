import NavBar from "./NavBar";
import { Route, Switch } from "react-router"
import StudentDetails from "./StudentDetails";
import StudentForm from "./StudentForm";
import { useState } from 'react';


function App() {

  const [list, setList] = useState([])

  function handleSubmit(student) {
    
    let id=Math.floor( Math.random()*10000 +1)
    student.id=id

    if(student.check===true){
      student.check="Subscribe"
    }
    else{
      student.check="Unsubscribe"
    }

    student.fullname=`${student.firstname} ${student.midname} ${student.lastname}`

    setList((PreviousValue) => {
      return [...PreviousValue, student]
    }
    )
    alert("Submitted Successfully")
    console.log(list);
  }

  function onDelete(id) {
    setList((PreviousValue) => {
      return PreviousValue.filter(
        (items, index) => {
          return index !== id
        }
      )
    })
    alert("Record Deleted")
  }

  return (
    <>
      <NavBar />
      
      <Switch>
        <Route exact path="/" component={() => <StudentForm handleSubmit={handleSubmit} />} />
        <Route exact path="/StudentDetails" component={() => <StudentDetails detail={list} onDelete={onDelete} />} />
      </Switch>
      

    </>
  );
}

export default App;
