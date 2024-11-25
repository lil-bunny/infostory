"use client";

import React from 'react';
// import Controller from './controller';
import FaceAnalysisApp from './vibecheck';
import GraphGenerator from './graphai';
import GenerateChartButton from './generatechart';
import ChartGenerator2 from './generatechar2';
import ChartGenerator from './generatechart';
import ChartGeneratorFinal from './finalgeneratechart';
import ChartGeneratorFinalTest from './testgeneratechart';

// Dummy data for the cards
const cardsData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Card Title ${index + 1}`,
  subtitle: `This is the subtitle for card ${index + 1}`,
  image: "https://via.placeholder.com/150", // Placeholder image
}));

export default function Cards() {
  return (
  //  <Controller></Controller>
  // <FaceAnalysisApp/>
  // <GraphGenerator/>
  // <ChartGenerator/>
  <ChartGeneratorFinal/>
  // <ChartGeneratorFinalTest/>
  );
}
