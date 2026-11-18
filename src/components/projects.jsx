import React, { useState } from 'react';
import ProjectCard from './ProjectCard'; // Import the card component you already have!

function Projects() {
    // State for the preview button challenge requirement
    const [showProjects, setShowProjects] = useState(false);

    return (
        <div style={{ padding: '20px' }}>
            <h2>My Portfolio Projects</h2>
            
            {/* The Preview Button */}
            <button 
                onClick={() => setShowProjects(!showProjects)}
                style={{ padding: '10px 20px', cursor: 'pointer', marginBottom: '20px' }}
            >
                {showProjects ? 'Hide Projects' : 'Preview Projects'}
            </button>

            {/* Conditionally show your project cards when button is clicked */}
            {showProjects && (
                <div className="projects-container">
                    <ProjectCard 
                        name="Speed Typing Game"
                        techUsed="JavaScript, DOM, CSS"
                        whatItDoes="An interactive typing game featuring a countdown timer, real-time input matching, and a game-over screen."
                    />
                    <ProjectCard 
                        name="Cyberpunk Portfolio"
                        techUsed="React, React Router, CSS"
                        whatItDoes="A multi-page portfolio built with React components and client-side routing."
                    />
                </div>
            )}
        </div>
    );
}

export default Projects;