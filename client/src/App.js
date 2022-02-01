import './App.css';
import { useEffect, useState, useRef } from "react";
import Axios from 'axios';
import ModalUpdate from './modal/ModalUpdate';
import ChangeColor from './components/ChangeColor';
import { updateUser } from './features/updateUser';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const themeColor = useSelector((state) => state.theme.value);
  const userInfo = useSelector((state) => state.updateUser.value);
  // userInfo =  {modalId:0, modalIsOpen: false, name:"", location:""};
  const dispatch = useDispatch();

  const [listOfUsers, setListOfUsers] = useState([]);
  const [_id, set_id] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    Axios.get("/getUsers").then((response) => {
      setListOfUsers(response.data);
    })
  }, []);

  const createUser = () => {
    Axios.post("/createUser", {
      name: name, location: location
    }).then((response) => {
      setListOfUsers([...listOfUsers, { _id, name, location }]);
      alert("You are added!");
      inputRef.current.value = "";
    });
  };

  const updateUserBtn = (_id, user) => {
    const updateUserInfo = { modalId: _id, modalIsOpen: true, name: user.name, location: user.location };
    dispatch(updateUser(updateUserInfo));
  }


  const deleteUserBtn = (_id, user) => {
    Axios.delete("/deleteUser/" + _id).then((response) => {
      alert("User deleted!");
      window.location.reload(false);
    });
  }

  //function uses listOfUsers state
  let i = 0;
  const map_table_rows = listOfUsers.map((user) => {
    i++;
    return (
      <tr>
        <th scope="row">{i}</th>
        <td>{user.name}</td>
        <td>{user.location}</td>
        <td><button type="submit" id={user._id} onClick={(event) => { updateUserBtn(event.target.id, user) }}>Update User</button></td>
        <td><button type="submit" id={user._id} onClick={(event) => { deleteUserBtn(event.target.id, user) }}>Delete User</button></td>
      </tr>
    )
  });

  return (
    <div className="App">
      {userInfo.modalIsOpen && <ModalUpdate/>}

      <ChangeColor />
      
      <div class="container-sm border">
        <br></br>

        <form>
          <div className="row align-items-center">
            <div className="col-sm-2 my-1">
              <input type="text" className="form-control" placeholder="Name..." ref={inputRef} onChange={(event) => { setName(event.target.value); }} />
            </div>
            <div className="col-sm-3 my-1">
              <input type="text" className="form-control" placeholder="Location..." ref={inputRef} onChange={(event) => { setLocation(event.target.value); }} />
            </div>
            <div className="col-sm-2 my-1">
              <button type="submit" className="btn btn-success" onClick={createUser}>Create User</button>
            </div>
          </div>
        </form>

        <br></br>
        <table className="table table-striped" style={{ color: themeColor }}>
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
    </div>
  );
}

export default App;
