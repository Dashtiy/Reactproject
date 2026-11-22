import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectPopup from './ProjectPopup';

// Import your screenshots from src/assets
import webPortfolioImg from '../assets/webPortfolio.png';
import formsCardImg from '../assets/formscard.png';
import aiRoboticImg from '../assets/airobotic.png';

// Array of project objects
const projectsData = [
    {
        id: 1,
        name: 'Dash Carrier & Code Portfolio',
        screenshot: webPortfolioImg,
        githubRepo: 'https://github.com/dashtiy/thisisme',
        techUsed: 'HTML5, CSS3, Bootstrap 5, JavaScript, Vanta.js',
        whatItDoes: 'A cyber-HUD personal portfolio documenting the transition from commercial heavy transport to front-end development.',
        whatILearned: 'Integrating 3D WebGL backgrounds with Vanta.js, responsive grid layouts, and custom CSS animations.',
        role: 'Solo Developer & Designer',
        challengesSolved: 'Balancing layered background canvas animations with readable HUD typography across screen sizes.'
    },
    {
        id: 2,
        name: 'Interactive Forms & Validation UI',
        screenshot: formsCardImg,
        githubRepo: 'https://github.com/dashtiy/thisisme',
        techUsed: 'HTML5, CSS3, JavaScript',
        whatItDoes: 'A responsive user registration and input validation interface with real-time feedback states.',
        whatILearned: 'Handling form events, custom styling for form controls, and clean input validation patterns.',
        role: 'Solo Developer',
        challengesSolved: 'Preventing invalid form submissions while keeping error states clear and accessible.'
    },
    {
        id: 3,
        name: 'AI & Robotics Concept Showcase',
        screenshot: aiRoboticImg,
        githubRepo: 'https://github.com/dashtiy/thisisme',
        techUsed: 'React, CSS3, Component Architecture',
        whatItDoes: 'A modular visual showcase exploring futuristic UI layouts and reusable React card components.',
        whatILearned: 'Structuring reusable React components with props and managing UI state cleanly.',
        role: 'Solo Developer',
        challengesSolved: 'Designing flexible card containers that adapt to different image aspect ratios and text lengths.'
    }
];

function Projects() {
    // Keeps your Lesson 2 preview toggle intact
    const [showProjects, setShowProjects] = useState(false);
    // Tracks the currently clicked project object (null when popup is closed)
    const [selectedProject, setSelectedProject] = useState(null);
    // Tracks the search input value for onChange + filter
    const [searchTerm, setSearchTerm] = useState('');

    // Filter projects based on name or tech used
    const filteredProjects = projectsData.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techUsed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', color: '#fff' }}>
            <h2>Portfolio Projects</h2>

            <button
                onClick={() => setShowProjects(!showProjects)}
                style={{ padding: '10px 20px', cursor: 'pointer', marginBottom: '20px' }}
            >
                {showProjects ? 'Hide Projects' : 'Preview Projects'}
            </button>

            {showProjects && (
                <div>
                    {/* onChange input to filter the projects array */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Search by project name or tech (e.g., React, CSS)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '10px',
                                width: '100%',
                                maxWidth: '400px',
                                borderRadius: '5px',
                                border: '1px solid #06b6d4',
                                background: '#111',
                                color: '#fff'
                            }}
                        />
                    </div>

                    {/* Render filtered array using .map() */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                name={project.name}
                                screenshot={project.screenshot}
                                techUsed={project.techUsed}
                                onSelectProject={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Render popup using && and spread operator (...) when a project is selected */}
            {selectedProject && (
                <ProjectPopup
                    {...selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
}

export default Projects;