import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const [info, setInfo] = useState({
    name: "",
    job: "",
  });

  const { show, handleClose, handleAddUser } = props;
  const handleSubmit = async () => {
    const res = await postCreateUser(info.name, info.job);
    if (res?.id) {
      handleClose();
      setInfo({
        name: "",
        job: "",
      });
      handleAddUser({first_name: res.name, id: res.id})
      toast.success('user is created success')
    } else {
      toast.error('user is created fail')
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo((values) => ({
      ...values,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add user</Modal.Title>
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
