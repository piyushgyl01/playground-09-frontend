import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://playground-09-backend.vercel.app/students"
    );
    return response.data;
  }
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (formData) => {
    const response = await axios.post(
      "https://playground-09-backend.vercel.app/students",
      formData
    );
    return response.data;
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    try {
      await axios.delete(
        `https://playground-09-backend.vercel.app/students/${id}`
      );
      // Return just the id since server response might be causing issues
      return { id };
    } catch (error) {
      // Log error details
      console.error("Delete Error:", error.response?.data || error.message);
      throw error;
    }
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `https://playground-09-backend.vercel.app/students/${id}`,
        formData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Update Error:", error);
    }
  }
);

export const selectFilteredAndSortedStudents = state => {
  let students = [...state.students.students];
  
  // Filter
  if (state.students.filter !== "All") {
    students = students.filter(student => student.gender === state.students.filter);
  }
 
  // Sort
  switch (state.students.sortBy) {
    case "Name":
      students.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Marks":
      students.sort((a, b) => b.marks - a.marks);
      break;
    case "Attendance":
      students.sort((a, b) => b.attendance - a.attendance);
      break;
  }
 
  return students;
 };
 

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    addStatus: "idle",
    updateStatus: "idle",
    filter: "All",
    sortBy: "Name",
  },
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const updatedStudent = action.payload;
      const index = state.students.findIndex(
        (student) => student._id === updatedStudent._id
      );
      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cases
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // Add cases
      .addCase(addStudentAsync.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.addStatus = "success";
      })
      .addCase(addStudentAsync.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      })
      // Delete cases
      .addCase(deleteStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.students = state.students.filter(
          (student) => student._id !== action.payload.id
        );
      })
      .addCase(deleteStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // Update cases
      .addCase(updateStudentAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.updateStatus = "success";
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const { addStudent, updateStudent, setFilter, setSortBy } = studentsSlice.actions;

export default studentsSlice.reducer;
