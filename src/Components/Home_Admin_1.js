import React from "react";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import GeneratedCertificate from "./GeneratedCertificate";

function Home_Admin_1() {
	return (
		<div className="Home_Admin">
			<Sidebar />
			<div className="test">
				<div className="PortalText1 textft">
					<div className="Admin_Text">
						Admin Portal
						<div className="PortalText2">Welcome, Rakesh! 👋 </div>
					</div>
					<div className="Admin_Button">
						<button>
							<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.5 1V12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M1 6.5H12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							</svg>&nbsp;&nbsp;
							Create
						</button>
						<button>
							<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.5 1V12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M1 6.5H12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							</svg>&nbsp;&nbsp;
							Create Certificates from Excel
						</button>
					</div>
				</div>
				<div className="PortalText3 textft">Generated Certificates</div>
				<GeneratedCertificate />
			</div>
		</div>
	);
}

export default Home_Admin_1;
