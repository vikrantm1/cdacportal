import axios from "axios";
import React from "react";

export default function Uploadmongo() {
  const fun = async () => {
    let file = document.getElementById("file").files[0];
    console.log(file);
    let formdata = new FormData();
    formdata.append("videorec", file);
    let resp = await axios.post("http://localhost:8080/mongo", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    document.getElementById("idd").innerHTML = resp.data;
  };

  return (
    <div>
      <input id="file" type="file" />
      <button type="button" onClick={fun}>
        submit
      </button>
      <div id="idd"></div>
    </div>
  );
}
