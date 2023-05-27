import React from "react";
import "../styles/App.css";

export default function Layout({ children }) {
	return (
		<div className="h-screen text-white">
			<main className="mt-2">
				{children}
			</main>
		</div>
	);
}