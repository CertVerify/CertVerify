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
					}}>
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
