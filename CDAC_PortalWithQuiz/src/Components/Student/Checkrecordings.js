// 624c32375ed5566756a63d85
import React, { useState } from "react";

export default function Checkrecordings() {
  let [id, setId] = useState("");
  let [path, setPath] = useState("");
  const viewVideo = (e) => {
    alert();
    console.log(e.target.value);
    id = e.target.value;
    path = "videoView";
    setPath(path);
    setId(id);
  };
  return (
    <div>
      <button value="624c32375ed5566756a63d85" onClick={viewVideo}>
        play video
      </button>
      <video
        src={
          `http://localhost:8080/Student/${path}?id=` +
          id +
          "&" +
          global.Date.now()
        }
        controls
        width="400"
      ></video>
    </div>
  );
}
