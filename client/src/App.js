import './App.css';
import { useEffect, useState } from "react";
import Axios from 'axios';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    Axios.get("/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  }, []);

  const createUser = () => {
    Axios.post("/createUser", {
      name: name, location: location
    }).then((response) => {
      setListOfUsers([...listOfUsers, { name, location}]);
      alert("USER CREATED!");
    });
  };

  //function uses listOfUsers state
  let i = 0;
  const map_table_rows = listOfUsers.map((user) => {
    i++;
    return (
      <tr>
        <th scope="row">{i}</th>
        <td>{user.name}</td>
        <td>{user.location}</td>
        <td>EDIT</td>
        <td>Delete</td>
      </tr>
    )
  });

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Name..." onChange={(event) => { setName(event.target.value); }} />
        <input type="text" placeholder="Location..." onChange={(event) => { setLocation(event.target.value); }} />
        <button onClick={createUser}>Create User</button>
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">EDIT</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>

          {map_table_rows}

        </tbody>
      </table>

    </div>
  );
}

export default App;
