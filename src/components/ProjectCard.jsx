import React from 'react';

function ProjectCard({ name, techUsed, whatItDoes, githubRepo }) {
    return (
        <div className="project-card" style={{ border: '1px solid #444', padding: '20px', borderRadius: '8px', marginBottom: '15px', background: '#111', color: '#fff' }}>
            <h3>{name}</h3>
            <p><strong>Tech Used:</strong> {techUsed}</p>
            <p>{whatItDoes}</p>
            
            {/* Clickable GitHub Repository Link */}
            {githubRepo && (
                <a 
                    href={githubRepo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 'bold' }}
                >
                    View GitHub Repository ↗
                </a>
            )}
        </div>
    );
}

export default ProjectCard;