import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectPopup from './ProjectPopup';

import webPortfolioImg from '../assets/webPortfolio.png';
import formsCardImg from '../assets/formscard.png';
import aiRoboticImg from '../assets/airobotic.png';

// 1. MASTER LIST: All 3 projects live here
const projectsData = [
    {
        id: 1,
        name: 'Dash Carrier & Code Portfolio',
        screenshot: webPortfolioImg,
        githubRepo: 'https://github.com/dashtiy/thisisme',
        techUsed: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'Vanta.js'],
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
        techUsed: ['HTML5', 'CSS3', 'JavaScript'],
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
        techUsed: ['React', 'CSS3', 'Component Architecture'],
        whatItDoes: 'A modular visual showcase exploring futuristic UI layouts and reusable React card components.',
        whatILearned: 'Structuring reusable React components with props and managing UI state cleanly.',
        role: 'Solo Developer',
        challengesSolved: 'Designing flexible card containers that adapt to different image aspect ratios and text lengths.'
    }
];

function Projects() {
    const [showProjects, setShowProjects] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // 2. THE GATEKEEPER: Keeps only projects matching the search input
    const filteredProjects = projectsData.filter((project) => {
        const query = searchTerm.trim().toLowerCase();
        const matchesName = project.name.toLowerCase().includes(query);
        const matchesTech = project.techUsed.some((tech) =>
            tech.toLowerCase().includes(query)
        );
        return matchesName || matchesTech;
    });

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

                    {/* 3. THE BUILDER: Renders only the projects that survived the filter */}
                    {filteredProjects.length === 0 ? (
                        <p style={{ color: '#9ca3af' }}>No projects found matching "{searchTerm}".</p>
                    ) : (
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
                    )}
                </div>
            )}

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