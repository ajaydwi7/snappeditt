import React from 'react';
import AboutBanner from '../components/GlobalComponents/Banner/PageBanner';
import MissionVision from '../components/AboutUs/MissionVision/MissionVision';
import missionVisionImage from "@/assets/images/missionVission.png";
import OurValues from '../components/AboutUs/Values/ourValues';
import WhyChooseUs from '../components/AboutUs/WhyChooseUs/WhyChooseUs';
import ImageGallery from '../components/AboutUs/Gallery/Gallery';

const AboutView = () => {
  return (
    <div>
      <main>
        <section className="about-banner">
          <AboutBanner></AboutBanner>
        </section>
        <section className='missonVission'>
          <MissionVision
            title='Mission & Vision'
            content="Our vision is to be the best and first choice for all the photographers/companies worldwide for their post-production requirement.
            Our Mission is to save time, money and efforts of all our partners by providing best quality, fast turnaround time and proactive customer support."
            missionVisionImage={missionVisionImage}
          />

        </section>
        <section className='our-values'>
          <OurValues></OurValues>
        </section>
        <section className='why-choose-us'>
          <WhyChooseUs></WhyChooseUs>
        </section>
        <section className='image-gallery'>
          <ImageGallery></ImageGallery>
        </section>
      </main>
    </div>
  );
};

export default AboutView;
