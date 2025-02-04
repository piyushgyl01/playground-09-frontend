import { useParams } from "react-router";
import { fetchStudents } from "../features/students/studentsSlice.js";
import { useFetch } from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  updateStudent,
  updateStudentAsync,
} from "../features/students/studentsSlice.js";
import { useNavigate } from "react-router";

export default function EditStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentID } = useParams();
  const [submitError, setSubmitError] = useState(null);
  const updateStatus = useSelector((state) => state.students.updateStatus);

  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    grade: "",
    attendance: 0,
    marks: 0,
  });

  const {
    data: students,
    status,
    error,
  } = useFetch((state) => state.students.students, fetchStudents, "students");

  const foundStudent = students.find((student) => student._id === studentID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      const resultAction = await dispatch(
        updateStudentAsync({ id: studentID, formData }) // Pass studentID here
    );
      if (updateStudentAsync.fulfilled.match(resultAction)) {
        const updated = resultAction.payload;
        dispatch(updateStudent(updated));
        navigate(`/students/${foundStudent?.name}/${foundStudent?._id}`);
      } else {
        setSubmitError(resultAction.error.message || "Failed to add student");
      }
    } catch (error) {
      setSubmitError(error.message || "Failed to add student");
    }
  };useEffect(() => {
    if (foundStudent) {
      setFormData({
        name: foundStudent.name,
        age: foundStudent.age,
        gender: foundStudent.gender,
        grade: foundStudent.grade,
        attendance: foundStudent.attendance,
        marks: foundStudent.marks,
      });
    }
  }, [foundStudent]); 

  useEffect(() => {
    if (updateStatus === "error") {
      setSubmitError("Failed to add student");
    }
  }, [updateStatus]);

  return (
    <>
      <main className="container">
        {" "}
        {updateStatus === "loading" && <p>Updating student...</p>}
        {submitError && <p className="error">Error: {submitError}</p>}
        <h4>Edit Student Details of {foundStudent?.name}</h4>{" "}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <br /> <br /> <label htmlFor="">Age: </label>
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: parseFloat(e.target.value) })
            }
          />
          <br /> <br />
          <input
            type="text"
            placeholder="Grade"
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
          />
          <br /> <br />
          <label htmlFor="gender">Gender: </label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          Female
          <br /> <br /> <label htmlFor="">Attendance: </label>
          <input
            type="number"
            placeholder="Attendance"
            value={formData.attendance}
            onChange={(e) =>
              setFormData({
                ...formData,
                attendance: parseFloat(e.target.value),
              })
            }
          />
          <br /> <br /> <label htmlFor="">Marks: </label>
          <input
            type="number"
            placeholder="Marks"
            value={formData.marks}
            onChange={(e) =>
              setFormData({ ...formData, marks: parseFloat(e.target.value) })
            }
          />
          <br /> <br />
          {/* disabled={addStatus === "loading"} */}
          <button type="submit" disabled={updateStatus === "loading"}>
            {updateStatus === "loading" ? "Updating..." : "Save"} 
          </button>
        </form>
      </main>
    </>
  );
}
