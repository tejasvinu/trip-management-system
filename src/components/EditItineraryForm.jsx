import { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EditItineraryForm = ({ itinerary, onSave, onCancel }) => {
  const [paragraphs, setParagraphs] = useState(() => {
    const initial = Array.isArray(itinerary) ? itinerary[0]?.paragraphs : itinerary?.paragraphs;
    return initial?.map(text => ({ id: crypto.randomUUID(), text })) || [];
  });

  const textareaRefs = useRef({});

  useEffect(() => {
    // Adjust height of all textareas on mount
    Object.values(textareaRefs.current).forEach(adjustTextareaHeight);
  }, []);

  const adjustTextareaHeight = (element) => {
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const paragraphTexts = paragraphs.map(p => p.text);
    if (Array.isArray(itinerary)) {
      onSave('itinerary', null, {
        _id: itinerary[0]?._id,
        paragraphs: paragraphTexts
      });
    } else {
      onSave('itinerary', null, {
        _id: itinerary?._id,
        paragraphs: paragraphTexts
      });
    }
  };

  const handleParagraphChange = (id, value) => {
    setParagraphs(prev => prev.map(p => 
      p.id === id ? { ...p, text: value } : p
    ));
    adjustTextareaHeight(textareaRefs.current[id]);
  };

  const addParagraph = () => {
    setParagraphs(prev => [...prev, { id: crypto.randomUUID(), text: '' }]);
  };

  const removeParagraph = (id) => {
    setParagraphs(prev => prev.filter(p => p.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(paragraphs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setParagraphs(items);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="paragraphs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <Draggable key={paragraph.id} draggableId={paragraph.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`group relative transition-shadow ${
                        snapshot.isDragging ? 'shadow-lg' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div
                          {...provided.dragHandleProps}
                          className="w-6 flex items-center justify-center cursor-move opacity-50 hover:opacity-100"
                        >
                          ⋮⋮
                        </div>
                        <div className="flex-1">
                          <textarea
                            ref={el => {
                              textareaRefs.current[paragraph.id] = el;
                              if (el) adjustTextareaHeight(el);
                            }}
                            value={paragraph.text}
                            onChange={(e) => handleParagraphChange(paragraph.id, e.target.value)}
                            placeholder="Enter paragraph text here..."
                            className="w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none resize-none"
                            rows="1"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {paragraph.text.length} characters
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeParagraph(paragraph.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors self-start"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={addParagraph}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Paragraph
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditItineraryForm;
