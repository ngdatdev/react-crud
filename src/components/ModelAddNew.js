import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalAddNew = (props) => {
  const [info, setInfo] = useState({
    name: '',
    job: ''
  })

  const { show, handleClose } = props;
  const handleSubmit = () => {
    console.log(info);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo((values) => ({
      ...values,
      [name]: value
    }))
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input 
          value={info.name}
           type="text" 
           className="form-control"
           name="name"
           onChange={handleChange}
           />
        </div>
        <div className="form-group">
          <label className="form-label">Job</label>
          <input
           value={info.job}
           type="text"
           name="job"
           className="form-control" 
           onChange={handleChange}
           />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNew;
