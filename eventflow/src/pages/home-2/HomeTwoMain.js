import React from "react";
import { useLocation } from "react-router-dom";

import Banner from "./Banner";
import ScheduleTwo from "./ScheduleTwo";
import ServicesTwo from "./ServicesTwo";
import EventTwo from "./EventTwo";
import ConferenceOne from "./ConferenceOne";
import GalleryTwo from "./GalleryTwo";
import Testimonial from "./Testimonial";
import VideoOne from "./VideoOne";
import TeamMain from "../team/TeamMain";
import GlobalFootprintsGlobe from "./GlobalFootprintsGlobe";

const HomeTwoMain = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash === "#events") {
      setTimeout(() => {
        document.getElementById("events")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  }, [location]);

  return (
    <>
      <Banner />
      <ServicesTwo />

      {/* Events Section */}
      <div id="events">
        <ScheduleTwo />
      </div>

      <GlobalFootprintsGlobe />
      <EventTwo />
      <ConferenceOne />
      <GalleryTwo />
      <Testimonial />
      <VideoOne />
      <TeamMain />
    </>
  );
};

export default HomeTwoMain;