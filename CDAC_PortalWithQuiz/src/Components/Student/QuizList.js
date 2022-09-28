import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Cards from "./Cards";
import StudentDashboard from "./StudentDashboard";
export default function QuizList() {
  return (
    <>
      <StudentDashboard />
    </>
  );
}

export function Quiz() {
  return <StudentDashboard />;
}
export function Profileinfo() {
  return <StudentDashboard />;
}
export function NoticeB() {
  return <StudentDashboard />;
}
export function StudyMaterial() {
  return <StudentDashboard />;
}
export function RecordingsView() {
  return <StudentDashboard />;
}
export function QuizEnd() {
  return <StudentDashboard />;
}
