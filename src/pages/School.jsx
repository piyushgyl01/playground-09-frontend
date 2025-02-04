import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSchoolStats } from '../features/school/schoolSlice';
import { fetchStudents } from '../features/students/studentsSlice';


export default function School() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  
  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;
      const averageAttendance = (students.reduce((sum, student) => sum + student.attendance, 0) / totalStudents).toFixed(2);
      const averageMarks = (students.reduce((sum, student) => sum + student.marks, 0) / totalStudents).toFixed(2);
      const topStudent = students.reduce((top, student) => 
        student.marks > (top?.marks || 0) ? student : top, null);

      dispatch(updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent
      }));
    }
  }, [students, dispatch]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const schoolStats = useSelector(state => state.school);

  return (
    <div className="container">
      <h1>School View</h1>
      <p>Total Students: {schoolStats.totalStudents}</p>
      <p>Average Attendance: {schoolStats.averageAttendance}%</p>
      <p>Average Marks: {schoolStats.averageMarks}</p>
      <p>Top Student: {schoolStats.topStudent?.name || "-"}</p>
    </div>
  );
}
