import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./TableUsers.scss";
import _, { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Papa from "papaparse";

const data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
];
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserUpdate, setDataUserUpdate] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keyword, setKeyword] = useState("");

  const [dataImport, setDataImport] = useState([]);
  const [file, setFile] = useState();
  const fileInputRef = useRef(null);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res) {
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (e) => {
    getUsers(e.selected + 1);
  };
  
  const handleClose = () => {
    setIsShowModalAdd(false);
    setIsShowModalUpdate(false);
    setIsShowModalDelete(false);
  };

  const handleAddNew = () => {
    setIsShowModalAdd(true);
  };
  const handleUpdateUser = (user) => {
    setDataUserUpdate(user);
    setIsShowModalUpdate(true);
  };

  const handleAddUser = (user) => {
    setListUsers((prev) => [...prev, user]);
  };

  const handleDeleteUser = (user) => {
    setDataUserDelete(user);
    setIsShowModalDelete(true);
  };

  const handleUpdateUseFromModal = (user) => {
    let index = listUsers.findIndex((u) => u.id === user.id);
    let tempUsers = [].concat(listUsers);
    tempUsers[index].first_name = user.first_name;
    setListUsers(tempUsers);
  };

  const handleDeleteUseFromModal = (user) => {
    let index = listUsers.findIndex((u) => u.id === user.id);
    let tempUsers = [].concat(listUsers);
    tempUsers.splice(index, 1);
    setListUsers(tempUsers);
  };

  const handleSort = (sortby, sortfield) => {
    setSortBy(sortby);
    setSortField(sortfield);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortfield], [sortby]);
    setListUsers(cloneListUser);
  };

  const handleSearch = debounce((e) => {
    const keyword = e.target.value;
    if (keyword) {
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = cloneListUser.filter((u) => u.email.includes(keyword));
      setListUsers(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 300);

  const getUserCsv = (event, done) => {
    let result = [];
    result.push(["ID", "Email", "First Name", "Last Name"]);
    if (listUsers && listUsers.length > 0) {
      listUsers.forEach((u) => {
        let arr = [];
        arr[0] = u.id;
        arr[1] = u.email;
        arr[2] = u.first_name;
        arr[3] = u.last_name;
        result.push(arr);
      });
    }
    setDataImport(result);
    done();
  };

  // const handleExportFile = (e) => {
  //   if (e.target?.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const text = e.target.result;
  //       console.log(1);
  //       processCSV(text);
  //     };

  //     reader.readAsText(e.target.files[0]);
  //   } else {
  //     toast.error('File is not exist')
  //   }
  // };

  // const processCSV = (text) => {
  //   console.log(text);
  // };
  const handleChangeFile = (e) => {
    alert("You want to submit this file ", e.target?.files[0]?.name);
    handleExportfile(e);
  };
  const handleExportfile = (e) => {
    if (e.target?.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv files!");
      }

      Papa.parse(file, {
        complete: function (results) {
          let rawData = results.data;
          if (rawData && rawData[0] && rawData[0].length !== 4) {
            toast.error("The content is not suitable format");
            return;
          }
          if (
            rawData[0][1] !== "email" ||
            rawData[0][2] !== "first_name" ||
            rawData[0][3] !== "last_name"
          ) {
            toast.error("Format header is not correct");
          } else {
            let result = [];
            rawData.forEach((u, i) => {
              if (i > 0 && u.length === 4) {
                let obj = {};
                obj.id = u[0];
                obj.email = u[1];
                obj.first_name = u[2];
                obj.last_name = u[3];
                result.push(obj);
              }
            });
            setListUsers([]);
            setTimeout(() => setListUsers(result), 1000);
            if (fileInputRef.current) {
              fileInputRef.current.value = null;
            }
          }
        },
      });
    } else {
      toast.error("File is not found");
    }
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List of users</b>
        </span>
        <div className="group-btns">
          <label htmlFor="export" className="btn btn-warning">
            <i className="fa-solid fa-file-export"></i> Export
          </label>
          <input
            id="export"
            type="file"
            hidden
            onChange={handleChangeFile}
            ref={fileInputRef}
          />
          <CSVLink
            data={dataImport}
            filename={"user.csv"}
            className="btn btn-primary"
            asyncOnClick={true}
            onClick={getUserCsv}
          >
            <i className="fa-solid fa-file-import"></i> Import
          </CSVLink>
          <button onClick={handleAddNew} className="btn btn-success">
            <i className="fa-solid fa-circle-plus"></i> Add User
          </button>
        </div>
      </div>
      <div className="col-4 my-2">
        <input
          className="form-control"
          placeholder="Search user by email"
          // value={keyword}
          onChange={handleSearch}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="header-sort">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="header-sort">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item, index) => {
            return (
              <tr key={`user-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td className="m-3">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleUpdateUser(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDeleteUser(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNew
        handleAddUser={handleAddUser}
        show={isShowModalAdd}
        handleClose={handleClose}
      />

      <ModalUpdateUser
        handleUpdateUseFromModal={handleUpdateUseFromModal}
        dataUserUpdate={dataUserUpdate}
        show={isShowModalUpdate}
        handleClose={handleClose}
      />

      <ModalDeleteUser
        handleDeleteUseFromModal={handleDeleteUseFromModal}
        dataUserDelete={dataUserDelete}
        show={isShowModalDelete}
        handleClose={handleClose}
      />
    </>
  );
};

export default TableUsers;
