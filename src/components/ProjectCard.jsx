import React from 'react';

function ProjectCard({
    name,
    screenshot,
    githubRepo,
    techUsed,
    writeUp,
    whatItDoes,
    whatILearned,
    role,
    challengesSolved
}) {
    return (
        <div style={{ border: '1px solid #444', padding: '20px', margin: '20px 0', borderRadius: '8px', background: '#1e1e1e', color: '#fff' }}>
            <h2>{name}</h2>
            {screenshot && <img src={screenshot} alt={name} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }} />}
            <p><strong>Role:</strong> {role}</p>
            <p><strong>Write-up:</strong> {writeUp}</p>
            <p><strong>What it does:</strong> {whatItDoes}</p>
            <p><strong>Tech Used:</strong> {Array.isArray(techUsed) ? techUsed.join(', ') : techUsed}</p>
            <p><strong>What I learned:</strong> {whatILearned}</p>
            <p><strong>Challenges solved:</strong> {challengesSolved}</p>
            <a href={githubRepo} target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb' }}>
                View GitHub Repository
            </a>
        </div>
    );
}

export default ProjectCard;