import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredAndSortedStudents,
  setFilter,
  setSortBy,
  fetchStudents,
} from "../features/students/studentsSlice";

import { useEffect } from "react";
export default function Classes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const students = useSelector(selectFilteredAndSortedStudents);

  return (
    <>
      <main className="container">
        <h1>Class View</h1>
        <label htmlFor="genderFilterSelect">Filter by Gender: </label>
        <select id="genderFilterSelect" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <br />
        <label htmlFor="sortBySelect">Sort by: </label>
        <select id="sortBySelect" onChange={handleSortChange}>
          <option value="Name">Name</option>
          <option value="Marks">Marks</option>
          <option value="Attendance">Attendance</option>
        </select>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - {student.gender} - Marks: {student.marks} -
              Attendance: {student.attendance}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
