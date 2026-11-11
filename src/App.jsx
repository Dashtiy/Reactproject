import React from 'react';
import ProjectCard from './components/ProjectCard';

// Importing your actual project screenshots from the assets folder
import formImg from './assets/formscard.png';
import aiImg from './assets/airobotic.png';
import portfolioImg from './assets/webPortfolio.png';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dash's React Portfolio</h1>
      <p>Showcasing my transition into front-end development.</p>

      {/* Project 1: Portfolio */}
      <ProjectCard
        name="Multi-Page Personal Portfolio"
        screenshot={portfolioImg}
        githubRepo="https://dashtiy.github.io/thisisme/"
        techUsed={["HTML5", "CSS3", "JavaScript"]}
        writeUp="A custom multi-page portfolio tracking my coding journey and background."
        whatItDoes="Displays personal history, interactive elements, and dynamic content rendering."
        whatILearned="Structuring multi-page layouts and organizing CSS custom variables."
        role="Solo Developer"
        challengesSolved="Built dynamic card rendering and synchronized audio triggers using the Web Audio API."
      />

      {/* Project 2: AI Robotic Neural Network */}
      <ProjectCard
        name="Futuristic AI Neural Network Ground"
        screenshot={aiImg}
        githubRepo="https://github.com/Dashtiy/ai-robotic"
        techUsed={["HTML5", "CSS3", "JavaScript", "UI Architecture"]}
        writeUp="A simulated autonomous AI neural network command ground interface."
        whatItDoes="Outlines autonomous capabilities, neural core routing, logistics management, and quantum security metrics."
        whatILearned="Structuring complex technical documentation layouts and high-tech UI typography."
        role="Solo Developer"
        challengesSolved="Organized multi-tier operational architecture categories into a clean, readable dashboard format."
      />

      {/* Project 3: Galactic Registry Form */}
      <ProjectCard
        name="Galactic Registry - Planet Acquisition"
        screenshot={formImg}
        githubRepo="https://github.com/Dashtiy/form"
        techUsed={["HTML5", "CSS3", "JavaScript", "Forms"]}
        writeUp="An immersive, futuristic world-acquisition portal and registration form."
        whatItDoes="Allows travelers to input credentials and select celestial destinations to acquire galactic worlds."
        whatILearned="Advanced form structuring, input handling, and sci-fi aesthetic layout design."
        role="Solo Developer"
        challengesSolved="Designed custom-styled form containers and input groups matching an immersive space-registry theme."
      />

    </div>
  );
}

export default App;