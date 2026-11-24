import React from 'react';
import './ProjectPopup.css';

function ProjectPopup({
    name,
    screenshot,
    githubRepo,
    techUsed,
    whatItDoes,
    whatILearned,
    role,
    challengesSolved,
    onClose
}) {
    return (
        <div className="popup-overlay" onClick={onClose}>
            {/* e.stopPropagation() prevents clicks inside the box from closing the popup */}
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-btn" onClick={onClose}>✕</button>

                <h2>{name}</h2>

                {screenshot && (
                    <img src={screenshot} alt={name} className="popup-screenshot" />
                )}

<div className="popup-details">
    <p><strong>Tech Used:</strong> {techUsed.join(', ')}</p>
    <p><strong>What it does:</strong> {whatItDoes}</p>
    <p><strong>What I learned:</strong> {whatILearned}</p>
    <p><strong>Role:</strong> {role}</p>
    <p><strong>Challenges solved:</strong> {challengesSolved}</p>
</div>

                {githubRepo && (
                    <a
                        href={githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="popup-repo-link"
                    >
                        View GitHub Repository ↗
                    </a>
                )}
            </div>
        </div>
    );
}

export default ProjectPopup;