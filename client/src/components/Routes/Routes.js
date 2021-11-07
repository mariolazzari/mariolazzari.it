import { lazy, Suspense } from "react";
import Backdrop from "@material-ui/core/Backdrop";
// Application routes
import { Routes, Route } from "react-router-dom";
// components
const Home = lazy(() => import("../../views/Home"));
const Certifications = lazy(() => import("../../views/Certifications"));
const Skills = lazy(() => import("../../views/Skills"));
const Jobs = lazy(() => import("../../views/Jobs"));
const Hobbies = lazy(() => import("../../views/Hobbies"));
const Contacts = lazy(() => import("../../views/Contacts"));
const Nasa = lazy(() => import("../../views/Nasa"));

// routes
const MyRoutes = () => (
  <Suspense fallback={<Backdrop open />}>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/certifications" element={<Certifications />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/hobbies" element={<Hobbies />} />
      <Route path="/nasa" element={<Nasa />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </Suspense>
);

export default MyRoutes;
