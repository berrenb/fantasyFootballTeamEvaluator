import React from "react";
import "../../styles/App.css";
import Logo from "../Logo";

export default function LoadingScreen() {
	return (
		<div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
			<Logo className="h-25 mb-4" />
			<span>Loading...</span>
			<div className="spinner-border text-primary" role="status"></div>
		</div>
	);
}