import React from 'react';

function ProjectCard({ name, screenshot, techUsed, onSelectProject }) {
    return (
        <div 
            onClick={onSelectProject}
            style={{
                border: '1px solid #444',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '15px',
                background: '#111',
                color: '#fff',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#06b6d4')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#444')}
        >
            {screenshot && (
                <img 
                    src={screenshot} 
                    alt={name} 
                    style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px' }} 
                />
            )}
            <h3>{name}</h3>
            <p><strong>Tech Used:</strong> {techUsed}</p>
            <span style={{ color: '#06b6d4', fontSize: '0.9rem' }}>Click card to view full details →</span>
        </div>
    );
}

export default ProjectCard;