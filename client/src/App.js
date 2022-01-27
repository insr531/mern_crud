import './App.css';
import { useEffect, useState } from "react";
import Axios from 'axios';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");

  //http://localhost:3001
  useEffect(() => {
    Axios.get("/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  }, []);

  const createUser = () => {
    Axios.post("/createUser", {
      name: name, age: age, username: username
    }).then((response) => {
      setListOfUsers([...listOfUsers, { name, age, username }]);
      alert("USER CREATED!");
    });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Name: {user.age}</h1>
              <h1>Name: {user.username}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <input type="text" placeholder="Name..." onChange={(event) => { setName(event.target.value); }} />
        <input type="number" placeholder="Age..." onChange={(event) => { setAge(event.target.value); }} />
        <input type="text" placeholder="Username..." onChange={(event) => { setUsername(event.target.value); }} />
        <button onClick={createUser} >Create User</button>
      </div>
    </div>
  );
}

export default App;
