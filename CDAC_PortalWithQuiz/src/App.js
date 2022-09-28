import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentDashboard from "./Components/Student/StudentDashboard";
import FacultyDashboard from "./Components/Faculty/FacultyDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ForgotPassword from "./Components/ForgotPassword";
import Register from "./Components/Register";
import "./App.css"
import QuizList, {
  NoticeB,
  QuizEnd,
  RecordingsView,
} from "./Components/Student/QuizList";
import {
  Quiz,
  Profileinfo,
  StudyMaterial,
} from "./Components/Student/QuizList";
import CreateQuiz, {
  SendNotice,
  SendRecording,
  SendStudyMaterial,
} from "./Components/Faculty/Faculty";
import { AddQuestions, AddNotes } from "./Components/Faculty/Faculty";
import AdminPath, {
  FacultyRecords,
  StudentRecords,
} from "./Components/Admin/AdminPath";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/"></Route>
      <Route element={<StudentDashboard />} path="/Student" />
      <Route element={<FacultyDashboard />} path="/Faculty" />
      <Route element={<ForgotPassword />} path="/ForgetPassword" />
      <Route element={<AddQuestions />} path="/Faculty/AddQuestion" />
      <Route element={<CreateQuiz />} path="Faculty/CreateQuiz" />
      <Route element={<Register />} path="/Register" />
      <Route element={<QuizList />} path="/Student/QuizList" />
      <Route element={<Quiz />} path="/Student/Quiz" />
      <Route element={<Profileinfo />} path="/Student/Profile" />
      <Route element={<SendNotice />} path="/Faculty/Notice" />
      <Route element={<SendRecording />} path="/Faculty/UploadRecording" />
      <Route element={<NoticeB />} path="/Student/Notice" />
      <Route element={<StudyMaterial />} path="/Student/StudyMaterial" />
      <Route path="/Student/viewRecordings" element={<RecordingsView />} />
      <Route path="/Admin/StudentRecords" element={<StudentRecords />} />
      <Route path="Faculty/StudyMaterial" element={<SendStudyMaterial />} />
      <Route path="/Admin/FacultyRecords" element={<FacultyRecords />} />
      <Route element={<AdminDashboard />} path="/Admin" />
      <Route path="/Student/Congratulations" element={<QuizEnd />} />
    </Routes>
  );
}

export default App;
