import { useEffect, useState, useRef } from 'react';
import './styles.css';

function App() {
  const [location, setLocation] = useState(null);
  const [networkInfo, setNetworkInfo] = useState({});
  const [weather, setWeather] = useState(null);
  const [open, setOpen] = useState(false);

  const locRef = useRef(null);
  const weatherRef = useRef(null);
  const netRef = useRef(null);
  const aboutRef = useRef(null);

  // 🌐 Geolocation + Weather + Address
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });

          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
            .then((res) => res.json())
            .then((data) => setWeather(data.current_weather));

          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then((res) => res.json())
            .then((data) => {
              if (data.address) {
                setLocation((prev) => ({
                  ...prev,
                  display_name: data.display_name,
                }));
              }
            });
        },
        () => setLocation({ error: 'Location access denied!' })
      );
    } else {
      setLocation({ error: 'Geolocation not supported' });
    }
  }, []);

  // 🌐 Network Info
  useEffect(() => {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      setNetworkInfo({
        type: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
      });
    }
  }, []);

  // 👁️ Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    });

    const elements = document.querySelectorAll('.observe');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setOpen(false); // close nav on mobile
  };

  return (
    <div>
      <header className="navbar">
        <div className="navbar-container">
          <h2 className="logo">Smart Travel</h2>
          <div className="hamburger" onClick={() => setOpen(!open)}>☰</div>
          <nav className={`nav-links ${open ? 'open' : ''}`}>
            <button onClick={() => scrollTo(locRef)}>Location</button>
            <button onClick={() => scrollTo(weatherRef)}>Weather</button>
            <button onClick={() => scrollTo(netRef)}>Network</button>
            <button onClick={() => scrollTo(aboutRef)}>About</button>
          </nav>
        </div>
      </header>

      <header className="title-header">
        <h1>Smart Travel Assistant</h1>
        <p>Empowering travel with live Web APIs 🚀</p>
      </header>

      <main>
        <section ref={locRef} className="card observe">
          <h2>📍 Your Location</h2>
          {location ? (
            location.error ? (
              <p style={{ color: 'red' }}>{location.error}</p>
            ) : (
              <>
                <p>
                  Latitude: <strong>{location.latitude}</strong>, Longitude: <strong>{location.longitude}</strong>
                </p>
                {location.display_name && (
                  <p><em>📍 {location.display_name}</em></p>
                )}
              </>
            )
          ) : (
            <p>Fetching location...</p>
          )}
        </section>

        <section ref={weatherRef} className="card observe">
          <h2>☁️ Current Weather</h2>
          {weather ? (
            <>
              <p>Temperature: <strong>{weather.temperature}</strong>°C</p>
              <p>Wind Speed: <strong>{weather.windspeed}</strong> km/h</p>
            </>
          ) : (
            <p>Fetching weather...</p>
          )}
        </section>

        <section ref={netRef} className="card observe">
          <h2>📶 Network Status</h2>
          <p>Connection Type: <strong>{networkInfo.type || 'Unknown'}</strong></p>
          <p>Speed: <strong>{networkInfo.downlink || '-'}</strong> Mb/s</p>
          <p>RTT: <strong>{networkInfo.rtt || '-'}</strong> ms</p>
        </section>

        <div ref={aboutRef} className="card observe about">
          <h2>ℹ️ About This App</h2>
          <p>This app showcases Web APIs like Geolocation, Network Info, and now Intersection Observer using React and CSS.</p>
        </div>
      </main>

      <footer className="footer">
        © 2025 Smart Travel App — Designed with 💖 by Aayush
      </footer>
    </div>
  );
}

export default App;
