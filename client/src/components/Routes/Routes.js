import { lazy, Suspense } from "react";
import Backdrop from "@mui/material/Backdrop";
// Application routes
import { Routes, Route } from "react-router-dom";
// components
const Home = lazy(() => import("views/Home"));
const Certifications = lazy(() => import("views/Certifications"));
const Skills = lazy(() => import("views/Skills"));
const Jobs = lazy(() => import("views/Jobs"));
const Hobbies = lazy(() => import("views/Hobbies"));
const Contacts = lazy(() => import("views/Contacts"));
const Met = lazy(() => import("views/Hobbies/Art/Met"));
const Nasa = lazy(() => import("views/Hobbies/Nasa"));
const Rijks = lazy(() => import("views/Hobbies/Art/Rijks"));

// routes
const MyRoutes = () => (
  <Suspense fallback={<Backdrop open />}>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/certifications" element={<Certifications />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/hobbies" element={<Hobbies />} />
      <Route path="/met" element={<Met />} />
      <Route path="/nasa" element={<Nasa />} />
      <Route path="/rijks" element={<Rijks />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </Suspense>
);

export default MyRoutes;
