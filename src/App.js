import Container from "react-bootstrap/esm/Container";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import ModalAddNew from './components/ModelAddNew'
import { useState } from "react";

function App() {

  const [isShow, setIsShow] = useState(false)

  const handleClose = () => {
    setIsShow(false)
  }

  const handleAddNew = () => {
    setIsShow(true)
  }

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span>
            <b>List of users</b>
          </span>
          <button onClick={handleAddNew} className="btn btn-success">Add new user</button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNew show={isShow} handleClose={handleClose}/>
    </div>
  );
}

export default App;
