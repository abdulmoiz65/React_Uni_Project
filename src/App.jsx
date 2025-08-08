import NewsLater from "./components/NewsLater/NewsLater";
import NewsCards from "./components/NewsCards/NewsCards";
import Inspire from './components/Inspire/Inspire';
import Sustainability from "./components/Sustainability/Sustainability";
import DegreeCards from "./components/DegreeCards/DegreeCards";
import AdmissionProcessCards from "./components/AdmissionProcessCards/AdmissionProcessCards";
import EventBox from "./components/EventBox/EventBox";
import WeRecommend from "./components/WeRecommend/WeRecommend";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div>
      <NewsLater />
      <NewsCards />
       <Inspire />
      <Sustainability />
      <DegreeCards />
      <AdmissionProcessCards />
      <EventBox />
      <WeRecommend />
      <Footer />
    </div>
  );
}

export default App;
