import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    totalStudents: 0,
    averageAttendance: 0,
    averageMarks: 0,
    topStudent: null
  },
  reducers: {
    updateSchoolStats: (state, action) => {
      const { totalStudents, averageAttendance, averageMarks, topStudent } = action.payload;
      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
      state.averageMarks = averageMarks;
      state.topStudent = topStudent;
    }
  }
});

export const { updateSchoolStats } = schoolSlice.actions;
export default schoolSlice.reducer;