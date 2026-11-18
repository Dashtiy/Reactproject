import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

function Projects() {
    const [showProjects, setShowProjects] = useState(false);

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
                    <ProjectCard 
                        name="Dash Carrier & Code Portfolio"
                        techUsed="HTML5, CSS3, Bootstrap 5, JavaScript, Vanta.js 3D WebGL"
                        whatItDoes="A cyber-HUD personal developer site documenting the transition from heavy transport logistics to front-end engineering, featuring interactive 3D grids and telemetry status bars."
                        githubRepo="https://github.com/dashtiy/thisisme"
                    />
                </div>
            )}
        </div>
    );
}

export default Projects;