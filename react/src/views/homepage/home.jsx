import Aboutus from "./components/Aboutus";
import Getstarted from "./components/Getstarted";
import HomeSection from "./components/homesection";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HomeSection/>
      <Aboutus/>
      <Getstarted/>
      <Footer/>
    </>
  )
}
