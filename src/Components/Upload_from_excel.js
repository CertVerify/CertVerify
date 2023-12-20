import React from "react";
import Sidebar from "./Sidebar";


function Upload_from_excel() {
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <div style={{ padding: "10%" }}>
        Upload_from_excel
        <form
          onSubmit={(e) => {
			  e.preventDefault();
			  fetch("http://localhost:5000/uploadFromExcel", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});
          }}
        >
          <input type="file" name="excel" />
          <button type="submit" name="button">
            Generate Certificates
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload_from_excel;
