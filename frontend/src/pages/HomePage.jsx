import React from 'react';
import Header from '../components/home/Header.jsx';
import Hero from '../components/home/Hero.jsx';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        {/* You can add more sections like Features, Pricing, etc. here later */}
      </main>
    </div>
  );
};

export default HomePage;