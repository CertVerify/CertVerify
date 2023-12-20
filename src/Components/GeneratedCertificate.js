import React, { useState, useEffect } from "react";
import { ReactComponent as Name } from "../images/Name.svg";
import { ReactComponent as Certificate_Id } from "../images/Certificate_Id.svg";
import { ReactComponent as Issue_On } from "../images/Issued_On.svg";
import { ReactComponent as Line } from "../images/Line.svg";

const GeneratedCertificate = () => {
	const [data, setData] = useState([]);

	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading)
			fetch("http://localhost:5000/getCertsInsti", {
				method: "GET",
			})
				.then((data) => data.json())
				.then((dataJSON) => (dataJSON.length == 0 ? [] : dataJSON[0].certificates))
				.then((processedData) => {
					setData(processedData);
					setLoading(false);
				});
	});

	return (
		<table className="Table">
			<thead>
				<tr>
					<th className="TableName">
						<Name />
					</th>
					<th className="TableCertId">
						<Certificate_Id />
					</th>
					<th>
						<Issue_On />
					</th>
					<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.6875 2.5H11.25V1.875C11.25 0.839453 10.4105 0 9.375 0H6.875C5.83945 0 5 0.839453 5 1.875V2.5H1.5625C0.69957 2.5 0 3.19957 0 4.0625V5.3125C0 5.6577 0.279805 5.9375 0.625 5.9375H15.625C15.9702 5.9375 16.25 5.6577 16.25 5.3125V4.0625C16.25 3.19957 15.5504 2.5 14.6875 2.5ZM6.25 1.875C6.25 1.53047 6.53047 1.25 6.875 1.25H9.375C9.71953 1.25 10 1.53047 10 1.875V2.5H6.25V1.875Z"
							fill="#757897"
						/>
						<path
							d="M1.18603 7.1875C1.0745 7.1875 0.985637 7.2807 0.990949 7.39211L1.50657 18.2141C1.55423 19.2156 2.37689 20 3.37923 20H12.8706C13.873 20 14.6956 19.2156 14.7433 18.2141L15.2589 7.39211C15.2642 7.2807 15.1754 7.1875 15.0638 7.1875H1.18603ZM10.6249 8.75C10.6249 8.40469 10.9046 8.125 11.2499 8.125C11.5952 8.125 11.8749 8.40469 11.8749 8.75V16.875C11.8749 17.2203 11.5952 17.5 11.2499 17.5C10.9046 17.5 10.6249 17.2203 10.6249 16.875V8.75ZM7.49993 8.75C7.49993 8.40469 7.77962 8.125 8.12493 8.125C8.47025 8.125 8.74993 8.40469 8.74993 8.75V16.875C8.74993 17.2203 8.47025 17.5 8.12493 17.5C7.77962 17.5 7.49993 17.2203 7.49993 16.875V8.75ZM4.37493 8.75C4.37493 8.40469 4.65462 8.125 4.99993 8.125C5.34525 8.125 5.62493 8.40469 5.62493 8.75V16.875C5.62493 17.2203 5.34525 17.5 4.99993 17.5C4.65462 17.5 4.37493 17.2203 4.37493 16.875V8.75Z"
							fill="#757897"
						/>
					</svg>
				</tr>
			</thead>
			{/* <Line /> */}
			<tbody>
				{data.length == 0
					? null
					: data.map((row) => (
							<tr key={row.certificateID}>
								<td className="TableName">{row.name}</td>
								<td className="TableCertId">{row.certificateID}</td>
								<td>{row.date}</td>
								<a
									style={{ cursor: "pointer" }}
									onClick={() => {
										fetch("http://localhost:5000/deleteCertsInsti", {
											method: "POST",
											headers: {
												Accept: "application/json",
												"Content-Type": "application/json",
											},
											body: JSON.stringify({ certID: row.certificateID }),
										}).then(() => {
											setData(data.filter((elem) => elem.certificateID != row.certificateID))
											setLoading(true);
										});
									}}>
									<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M14.6875 2.5H11.25V1.875C11.25 0.839453 10.4105 0 9.375 0H6.875C5.83945 0 5 0.839453 5 1.875V2.5H1.5625C0.69957 2.5 0 3.19957 0 4.0625V5.3125C0 5.6577 0.279805 5.9375 0.625 5.9375H15.625C15.9702 5.9375 16.25 5.6577 16.25 5.3125V4.0625C16.25 3.19957 15.5504 2.5 14.6875 2.5ZM6.25 1.875C6.25 1.53047 6.53047 1.25 6.875 1.25H9.375C9.71953 1.25 10 1.53047 10 1.875V2.5H6.25V1.875Z"
											fill="#757897"
										/>
										<path
											d="M1.18603 7.1875C1.0745 7.1875 0.985637 7.2807 0.990949 7.39211L1.50657 18.2141C1.55423 19.2156 2.37689 20 3.37923 20H12.8706C13.873 20 14.6956 19.2156 14.7433 18.2141L15.2589 7.39211C15.2642 7.2807 15.1754 7.1875 15.0638 7.1875H1.18603ZM10.6249 8.75C10.6249 8.40469 10.9046 8.125 11.2499 8.125C11.5952 8.125 11.8749 8.40469 11.8749 8.75V16.875C11.8749 17.2203 11.5952 17.5 11.2499 17.5C10.9046 17.5 10.6249 17.2203 10.6249 16.875V8.75ZM7.49993 8.75C7.49993 8.40469 7.77962 8.125 8.12493 8.125C8.47025 8.125 8.74993 8.40469 8.74993 8.75V16.875C8.74993 17.2203 8.47025 17.5 8.12493 17.5C7.77962 17.5 7.49993 17.2203 7.49993 16.875V8.75ZM4.37493 8.75C4.37493 8.40469 4.65462 8.125 4.99993 8.125C5.34525 8.125 5.62493 8.40469 5.62493 8.75V16.875C5.62493 17.2203 5.34525 17.5 4.99993 17.5C4.65462 17.5 4.37493 17.2203 4.37493 16.875V8.75Z"
											fill="#757897"
										/>
									</svg>
								</a>
							</tr>
					  ))}
			</tbody>
		</table>
	);
};

export default GeneratedCertificate;
