import NewsLater from "./components/NewsLater/NewsLater";
import NewsCards from "./components/NewsCards/NewsCards";
import Sustainability from "./components/Sustainability/Sustainability";
import DegreeCards from "./components/DegreeCards/DegreeCards";
import AdmissionProcessCards from "./components/AdmissionProcessCards/AdmissionProcessCards";
import EventBox from "./components/EventBox/EventBox";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div>
      <NewsLater />
      <NewsCards />
      <Sustainability />
      <DegreeCards />
      <AdmissionProcessCards />
      <EventBox />
      <Footer />
    </div>
  );
}

export default App;
