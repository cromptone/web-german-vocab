import React from 'react';
import Heading from './Heading';
import DrillAndOptionsContainer from './DrillAndOptionsContainer';

export function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Heading text="German Vocabulary Practice" />
      <DrillAndOptionsContainer />
    </div>
  );
}
