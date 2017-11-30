import React from 'react';
import Heading from './Heading';
import DrillAndOptionsContainer from './DrillAndOptionsContainer';

export function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Heading text="German Vocabulary Practice" />
      <div style={{marginTop: 100}}>
        <DrillAndOptionsContainer />
      </div>
      <footer style={{height: 100, clear: "both"}}></footer>
    </div>
  );
}
