import { useEffect, useState, useRef } from "react";
import Modal from 'react-modal';
import Axios from 'axios';
import { updateUser } from '../features/updateUser';
import { useSelector, useDispatch } from 'react-redux';


function ModalUpdate({ IsOpenParam }) {

    const dispatch = useDispatch();
    const themeColor = useSelector((state) => state.theme.value);
    const userInfo = useSelector((state) => state.updateUser.value);
    const [modalId, setmodalId] = useState(userInfo.modalId);
    const [modalIsOpen, setIsOpen] = useState(userInfo.modalIsOpen);
    const [name, setName] = useState(userInfo.name);
    const [location, setLocation] = useState(userInfo.location);

    // userInfo =  {modalId:0, modalIsOpen: false, name:"", location:""};

    const putUser = () => {

        Axios.put("/updateUser/"+modalId, {
            name: name, location: location
        }).then((response) => {
            //setListOfUsers([...listOfUsers, { name, location }]);
            alert("User Updated!");
            const updateUserInfo = { modalId: modalId, modalIsOpen: false, name: name, location: location };
            dispatch(updateUser(updateUserInfo));
        });
    };

    function refreshPage() {
        window.location.reload(false);
    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => refreshPage()}
            contentLabel="Example Modal"
        >
            <div style={{ color: themeColor }}>
                <button type="submit" className="btn btn-danger" onClick={() => refreshPage()}>close</button>
                <br></br>

                <h2>Hello, {name} at {location} </h2>
                <h2>You can update your name from here </h2>
                <br></br>

                <form>
                    <div className="row align-items-center">
                        <div className="col-sm-2 my-1">
                            <input type="text" className="form-control" placeholder={name} onChange={(event) => { setName(event.target.value); }} />
                        </div>
                        <div className="col-sm-2 my-1">
                            <input type="text" className="form-control" placeholder={location} onChange={(event) => { setLocation(event.target.value); }} />
                        </div>
                        <div className="col-sm-2 my-1">
                            <button type="submit" className="btn btn-success" onClick={() => putUser()}>Update User</button>
                        </div>
                    </div>
                </form>

                
            </div>
        </Modal>

    );
}

export default ModalUpdate;