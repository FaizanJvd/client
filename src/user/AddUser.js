import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    cell: "",
    age: null,
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFields({ ...fields, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, cell, age } = fields;
    const res = await fetch("http://localhost:4000/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        cell,
        age,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    }
    if (res.status === 201) {
      toast.success(data.message);
      setFields({ name: "", email: "", cell: "", age: null });
    }
  };

  return (
    <div className="container w-100">
      <section
        style={{ border: "solid #0231C9", marginTop: "7em", marginLeft: "22em",width:"80%" }}
      >
        <form onSubmit={postData}>
          <div className="d-flex flex-column p-5 ">
            <h3 className="text-center">ADD USER</h3>
            <div>
              <div className="d-flex form-floating mt-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  name="name"
                  required
                  value={fields.name}
                  onChange={handleInput}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div>
                <div className="d-flex form-floating mt-3">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    required
                    value={fields.email}
                    onChange={handleInput}
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div>
                  <div className="d-flex form-floating mt-3">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Cell"
                      name="cell"
                      required
                      pattern="[0-9]{10}"
                      value={fields.cell}
                      onChange={handleInput}
                    />
                    <label htmlFor="floatingInput">Cell</label>
                  </div>
                </div>
                <div>
                  <div className="d-flex form-floating mt-3">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="age"
                      name="age"
                      required
                      min={18}
                      max={60}
                      value={fields.age}
                      onChange={handleInput}
                    />
                    <label htmlFor="floatingInput">Age</label>
                  </div>
                </div>
                <div style={{marginLeft:"12em"}}>
                  <input type="submit" className="btn btn-primary mt-3" value="Add" style={{width:"100px"}}/>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
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

export default AddUser;
