import { Modal, Button } from "react-bootstrap";
import { deleteRemoveUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUseFromModal } = props;
  
    const handleSubmit = async () => {
        // api error 
        const res = await deleteRemoveUser(dataUserDelete.id)
        if(+res === 204) {
          handleDeleteUseFromModal(dataUserDelete)
          toast.success('user is created success')
        } else {
          toast.error('user cannot be delete')
        }
        handleClose()
    } 

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Are you sure to delete this user</h3>
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

export default ModalDeleteUser;
