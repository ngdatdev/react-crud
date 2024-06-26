import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalUpdateUser = (props) => {
  const { show, handleClose, dataUserUpdate, handleUpdateUseFromModal } = props;
  const [info, setInfo] = useState({
    name: "",
    job: "",
  });


  useEffect(() => {
    if(show) {
      setInfo({
        name: dataUserUpdate.first_name,
        job: 'IT'
      })
    }
   
  }, [dataUserUpdate])



  const handleSubmit = async () => {
    const res = await putUpdateUser(info.name, info.job);
    if (res?.updatedAt) {
      setInfo({
        name: "",
        job: "",
      });
      handleUpdateUseFromModal({first_name: res.name, id: dataUserUpdate.id})
      toast.success('user is created success')
    } else {
      toast.error('user is created fail')
    }
    handleClose();
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
        <Modal.Title>Update User</Modal.Title>
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

export default ModalUpdateUser;
