import React from "react";
import Sidebar from "./Sidebar";
import { ReactComponent as GenIcon } from "../images/icongen.svg";
import { ReactComponent as DateIcon } from "../images/dategen.svg";
import { ReactComponent as MarksIcon } from "../images/marksgen.svg";
// import { ReactComponent as Check } from '../images/test.jpg'
import { useState } from "react";

function CreateCertficate() {
	const [user, setUser] = useState({
		name: "",
		dob: "",
		marks0: "",
		marks1: "",
		marks2: "",
		marks3: "",
		qr: null,
		photo: null,
		sign: null,
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if ((name == "photo" || name == "qr" || name == "sign") && e.target.files.length) {
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = () => {
				setUser((prev) => ({
					...prev,
					[name]: reader.result,
				}));
			};
		} else {
			setUser((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(name);

		const form_send = { name: user.name, dob: user.dob, marks0: user.marks0, marks1: user.marks1, marks2: user.marks2, marks3: user.marks3, qr: user.qr, photo: user.photo, sign: user.sign };
		console.log(form_send);
		const response = await fetch("http://localhost:5000/generateCertificate", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form_send),
		});
		const responseDATA = await response.json();
		console.log(responseDATA);
		console.log(user);
		displayCertificate(responseDATA.certificate);
	};

	function displayCertificate(certificateBase64) {
		const certificateContainer = document.getElementById("certificateContainer");

		// Create an img element
		const imgElement = document.createElement("img");

		// Set the source of the image to the base64 data
		imgElement.src = "data:image/png;base64," + certificateBase64;

		// Append the image element to the container
		certificateContainer.appendChild(imgElement);
	}

	return (
		<div className="Home_Admin">
			<Sidebar />
			<form className="test" onSubmit={handleSubmit}>
				<div className="GenText1 textft gentext">Create a Certificate</div>
				<div className="flexset2">
					<div className="namename">Full Name</div>
					<GenIcon />
					<input type="name" className="Nameinput" name="name" onChange={handleChange} placeholder="Enter your full Name" />
				</div>
				<div className="flexset2">
					<div className="namename">Date of Birth</div>
					<DateIcon />
					<input type="date" className="datedate" name="dob" onChange={handleChange} placeholder="dd/mm/yyyy" />
				</div>
				<div className="flexset2">
					<div className="namename">Enter Marks in Subject 1</div>
					<MarksIcon />
					<input type="tel" maxLength={3} className="marksmarks" name="marks0" onChange={handleChange} placeholder="Marks out 100" />
				</div>
				<div className="flexset2">
					<div className="namename">Enter Marks in Subject 2</div>
					<MarksIcon />
					<input type="tel" maxLength={3} className="marksmarks" name="marks1" onChange={handleChange} placeholder="Marks out 100" />
				</div>
				<div className="flexset2">
					<div className="namename">Enter Marks in Subject 3</div>
					<MarksIcon />
					<input type="tel" maxLength={3} className="marksmarks" name="marks2" onChange={handleChange} placeholder="Marks out 100" />
				</div>
				<div className="flexset2">
					<div className="namename">Enter Marks in Subject 4</div>
					<MarksIcon />
					<input type="tel" maxLength={3} className="marksmarks" name="marks3" onChange={handleChange} placeholder="Marks out 100" />
				</div>
				<div className="flexset2">
					<div className="namename">Photo</div>
					<GenIcon />
					<input type="file" name="photo" id="photo" onChange={handleChange} />
				</div>
				<div className="flexset2">
					<div className="namename">QR</div>
					<DateIcon />
					<input type="file" name="qr" id="qr" onChange={handleChange} />
				</div>
				<div className="flexset2">
					<div className="namename">Sign</div>
					<MarksIcon />
					<input type="file" name="sign" id="sign" onChange={handleChange} />
				</div>
				<div className="Buttondiv">
					<button type="Submit" className="Create"></button>
				</div>
				<div id="certificateContainer"></div>
			</form>
		</div>
	);
}

export default CreateCertficate;
