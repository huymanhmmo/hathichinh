import Hero from "@/components/sections/Hero";
import ServiceGrid from "@/components/sections/ServiceGrid";
import AboutDoctor from "@/components/sections/AboutDoctor";
import TreatmentProcess from "@/components/sections/TreatmentProcess";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import ClinicLocations from "@/components/sections/ClinicLocations";
import LatestBlog from "@/components/sections/LatestBlog";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABooking from "@/components/sections/CTABooking";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <AboutDoctor />
      <TreatmentProcess />
      <Stats />
      <Testimonials />
      <ClinicLocations />
      <LatestBlog />
      <FAQAccordion />
      <CTABooking />
    </>
  );
}
