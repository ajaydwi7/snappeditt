import Banner from "@/components/Home/Banner/Banner";
import Benefits from "@/components/Home/Benefits/Benefits";
import InfoSection from "@/components/Home/Informations/InfoSection";
import OurServices from "@/components/Home/Services/OurServices";
import TimelineSection from "@/components/Home/Timeline/timelineSection";
import TestimonialSection from "@/components/Home/Testimonials/Testomonials";
import Loder from "../components/GlobalContext/Loader";




function HomeView() {
  return (
    <div>
      <main>
        <section className="hero-section">
          <Banner></Banner>
        </section>
        <section className="benefits-section"></section>
        {/* <section className="filters-section">
          <Filters></Filters>
        </section> */}
        <section>
          <Benefits></Benefits>
        </section>
        <section className="info-section">
          <InfoSection></InfoSection>
        </section>
        <section className="services-section">
          <OurServices></OurServices>
        </section>
        <section className="timeline-section">
          <TimelineSection></TimelineSection>
        </section>
        <section className="testomonials-section">
          <TestimonialSection></TestimonialSection>
        </section>

      </main>
    </div>
  );
}

export default HomeView;
