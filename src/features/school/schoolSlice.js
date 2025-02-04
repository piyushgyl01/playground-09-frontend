import { createSlice } from "@reduxjs/toolkit";

// School Stats Slice
export const schoolSlice = createSlice({
  name: "school",
  // Initial state values
  initialState: {
    totalStudents: 0, // Total number of students
    averageAttendance: 0, // Average attendance across all students
    averageMarks: 0, // Average marks across all students
    topStudent: null, // Student with highest marks
  },
  // Action to update all school stats at once
  reducers: {
    updateSchoolStats: (state, action) => {
      const { totalStudents, averageAttendance, averageMarks, topStudent } =
        action.payload;
      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
      state.averageMarks = averageMarks;
      state.topStudent = topStudent;
    },
  },
});

export const { updateSchoolStats } = schoolSlice.actions;
export default schoolSlice.reducer;
