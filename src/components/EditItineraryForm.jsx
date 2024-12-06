import React, { useState } from 'react';
import Tooltip from './Tooltip';

const EditItineraryForm = ({ itinerary, onSave, onCancel }) => {
  const [paragraphs, setParagraphs] = useState([...itinerary.paragraphs]);

  const handleChange = (index, value) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index] = value;
    setParagraphs(updatedParagraphs);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const removeParagraph = (index) => {
    const updatedParagraphs = paragraphs.filter((_, i) => i !== index);
    setParagraphs(updatedParagraphs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('itinerary', null, { paragraphs });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form bg-gray-50 p-4 rounded shadow">
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="form-group mb-4">
          <label className="block text-sm font-medium mb-1">Paragraph {index + 1}:</label>
          <textarea
            value={paragraph}
            onChange={(e) => handleChange(index, e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          <Tooltip content="Remove Paragraph">
            <button
              type="button"
              onClick={() => removeParagraph(index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </Tooltip>
        </div>
      ))}
      <Tooltip content="Add New Paragraph">
        <button
          type="button"
          onClick={addParagraph}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Paragraph
        </button>
      </Tooltip>
      <div className="form-actions flex justify-end space-x-2">
        <Tooltip content="Save Itinerary">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </Tooltip>
        <Tooltip content="Cancel Editing">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </Tooltip>
      </div>
    </form>
  );
};

export default EditItineraryForm;
