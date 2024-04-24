import React from "react";
import { Routes, Route } from "react-router-dom";

import MainNav from "./HomePage/NaviBar/MainNav";
import Albums from "./Gallery/Albums";
import GalleryAlbum from "./Gallery/GalleryAlbum";

export default function Gallery() {
  const scrollToTarget = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <MainNav scrollToTarget={scrollToTarget} />

      <Routes>
        <Route exact path="/" element={<Albums />}></Route>
        <Route exact path="/album/:id" element={<GalleryAlbum />}></Route>
      </Routes>
    </div>
  );
}
