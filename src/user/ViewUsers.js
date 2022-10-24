import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewUsers = () => {
  const [result, setResult] = useState(null);
  const [names, setNames] = useState([]);
  const [filterVal, setFilterVal] = useState(null);
  const [reRenderFlag,setrerenderFlag] = useState(true)
  useEffect(() => {
    getData();
  }, []);
  useEffect(()=>{
    getData();
  },[reRenderFlag])
  async function getData() {
    const res = await fetch("http://localhost:4000/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setResult(data);
    setNames(data.filter((item) => item.name));
  }

  async function deleteclickedFunction(u_id) {
    const res = await fetch("http://localhost:4000/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        u_id,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    } 
    if (res.status === 201) {
      toast.success(data.message);
      let flag = reRenderFlag?false:true;
      setrerenderFlag(flag)
    }
  }
  const filterData = async (e) => {
    e.preventDefault();
    if(filterVal=="Choose..."){
      toast.error("Please select a filter option");
    }
    else if (
      filterVal === null ||
      filterVal === "all" 
    ) {
      getData();
    } else {
      const res = await fetch("http://localhost:4000/filterUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: filterVal,
        }),
      });
      const data = await res.json();
      setResult(data);
    }
  };

  return (
    <div className="container-fluid">
      <div
        class="input-group"
        style={{ display: "inline-flex", justifyContent: "end" }}
      >
        <select
          class="custom-select"
          id="inputGroupSelect04"
          style={{ width: "400px" }}
          onChange={(e)=>setFilterVal(e.target.value)}
        >
          <option selected>Choose...</option>
          <option value="all">All</option>
          {names==null?"":names.map((item) => (
            <option value={item.name?item.name:""}>{item.name?item.name:""}</option>
          ))}
        </select>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" onClick={filterData}>
            search
          </button>
        </div>
      </div>
      <table
        className="table table-dark table-hover table-bordered"
        style={{ width: "1300px" }}
      >
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Cell No</th>
            <th scope="col">Age</th>
            <th scope="col">CreatedAt</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {result === null ? (
          <tr>
            <td>No Record </td>
          </tr>
        ) : (
          result.map((result) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{result._id}</th>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.cell}</td>
                  <td>{result.age}</td>
                  <td>{result.createdAt}</td>
                  <td>
                    <button type="button" class="btn btn-danger" onClick={()=>deleteclickedFunction(result._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        )}
      </table>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ViewUsers;
