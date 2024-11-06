import React from 'react';

const InputSection = ({ title, description, setTitle, setDescription, handleKeyPress }) => (
    <div className="input-section">
        <input
            type="text"
            name="title-field"
            className="title input-element"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <input
            type="text"
            name="description-field"
            className="description input-element"
            placeholder="About..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
        />
    </div>
);

export default InputSection;
