import { ThemeProvider } from 'styled-components';
import GlobalStyles from './frontend/styles/GlobalStyles';
import { dark } from './frontend/styles/Themes';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRef, useEffect, useState } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Home from './frontend/sections/Home';
import { AnimatePresence } from 'framer-motion';
import About from './frontend/sections/About';
import What from './frontend/sections/What';
import TryIt from './frontend/sections/TryIt';
import ResultPage from './frontend/sections/ResultPage';
import Footer from './frontend/components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function ScrollWrapper({ children }) {
  const location = useLocation();
  const containerRef = useRef(null);
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (scroll) {
      scroll.update();
      setTimeout(() => scroll.scrollTo(0, 0, { duration: 0 }), 100);
    }
  }, [location.pathname, scroll]);

  return (
    <LocomotiveScrollProvider
      options={{ smooth: true }}
      watch={[location.pathname]}
      containerRef={containerRef}
      onUpdate={(scrollInstance) => setScroll(scrollInstance)}
    >
      <main data-scroll-container ref={containerRef}>
        {children}
      </main>
    </LocomotiveScrollProvider>
  );
}

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <Router>
          <ScrollWrapper>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <section data-scroll-section id="home">
                      <Home />
                    </section>
                    <section data-scroll-section id="who-we-are">
                      <About />
                    </section>
                    <section data-scroll-section id="what-we-do">
                      <What />
                    </section>
                    <section data-scroll-section id="try-it">
                      <TryIt />
                    </section>
                    <section data-scroll-section id="footer">
                      <Footer />
                    </section>
                  </>
                }
              />
              <Route
                path="/result"
                element={
                  <>
                    <section data-scroll-section id="result">
                      <ResultPage />
                    </section>
                    <section data-scroll-section id="footer">
                      <Footer />
                    </section>
                  </>
                }
              />
            </Routes>
          </ScrollWrapper>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;