import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import BookingWidget from '../components/sections/BookingWidget';
import About from '../components/sections/About';
import Rooms from '../components/sections/Rooms';
import Experiences from '../components/sections/Experiences';
import Amenities from '../components/sections/Amenities';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BookingWidget />
      <About />
      <Rooms />
      <Experiences />
      <Amenities />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
