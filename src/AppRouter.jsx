import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/routes/LoadingScreen";
import Layout from "./components/Layout";

const HomePage = lazy(() => import("./components/routes/HomePage"));
const EvaluateTeam = lazy(() => import("./components/routes/EvaluateTeam"));

export default function AppRouter() {

    return (
        <Router>
            <Suspense fallback={<LoadingScreen />}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/evaluate-team" element={<EvaluateTeam />}/>
                        <Route path="/loading" element={<LoadingScreen />} />
                    </Routes>
                </Layout>
            </Suspense>
        </Router>
    );
}