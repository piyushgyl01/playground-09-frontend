import { useState, useEffect } from "react";
import {
  addStudentAsync,
  addStudent,
} from "../features/students/studentsSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function PostStudent() {
  const dispatch = useDispatch();
  const addStatus = useSelector((state) => state.students.addStatus);

  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    grade: "",
  });

  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      const resultAction = await dispatch(addStudentAsync(formData));
      if (addStudentAsync.fulfilled.match(resultAction)) {
        const newStudent = resultAction.payload;
        dispatch(addStudent(newStudent));
        setFormData({
          name: "",
          age: 0,
          gender: "",
          grade: "",
        });
      } else {
        setSubmitError(resultAction.error.message || "Failed to add student");
      }
    } catch (error) {
      setSubmitError(error.message || "Failed to add student");
    }
  };

  useEffect(() => {
    if (addStatus === "error") {
      setSubmitError("Failed to add student");
    }
  }, [addStatus]);

  return (
    <>
      <main className="container">
        <h1>Post Student</h1>{" "}
        {addStatus === "loading" && <p>Adding student...</p>}
        {submitError && <p className="error">Error: {submitError}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <br /> <br />
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
          <br /> <br />
          <button type="submit" disabled={addStatus === "loading"}>
            {addStatus === "loading" ? "Adding..." : "Add"}
          </button>
        </form>
      </main>
    </>
  );
}
