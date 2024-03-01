import React, { useState, useEffect } from "react";
import { addJobid, deleteJobid, getJobid } from "./Services/Api";
import { MdDelete } from "react-icons/md";
const ManageOnieJob = () => {
  const [jobid, setJobid] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  useEffect(() => {
    fetchJobId();
  }, []);
  const fetchJobId = () => {
    getJobid()
      .then((response) => {
        setJobid(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAdd = (event) => {
    event.preventDefault();
    const data = {
      jobid: selectedJob,
    };
    if (data.jobid === "") {
      alert("Please Enter New JobID");
      return false;
    }
    addJobid(data).then((response) => {
      if (response.data === "addsuccessfully") {
        alert("New Job Id Added SuccessFully");
        window.location.reload();
      }
    });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteJobid(id).then((response) => {
        if (response.data === "deletedsuccess") {
          alert("Deleted SuccessFully");
          window.location.reload();
        }
      });
    }
  };
  return (
    <div className="id1" style={{ paddingTop: "100px" }}>
      <h2 className="text-center">Manage ONiESoft Job ID</h2>
      <br />
      <table className="table table-striped table-bordered">
        <thead></thead>
        <tbody>
          {jobid.map((jobid) => (
            <React.Fragment key={jobid.id}>
              <tr>
                <th>ID</th>
                <td>{jobid.id}</td>
                <th>Job ID</th>
                <td>{jobid.jobid}</td>
                <th>Delete</th>
                <td>
                  {" "}
                  <button onClick={() => handleDelete(jobid.id)}>
                    <MdDelete
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "red",
                      }}
                    />
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <th>Enter New Job ID</th>
            <td>
              <input
                type="text"
                name="jobid"
                className="form-control"
                placeholder="Enter New JobID"
                value={selectedJob}
                onChange={(event) => setSelectedJob(event.target.value)}
              />
            </td>
            <td colSpan={4}>
              <button className="btn btn-primary" onClick={handleAdd}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <center>
        <a href="javascript:history.go(-1)">Go Back</a>
      </center>
    </div>
  );
};
export default ManageOnieJob;
