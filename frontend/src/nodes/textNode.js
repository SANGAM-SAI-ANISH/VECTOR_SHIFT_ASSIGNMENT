

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './BaseNode.css';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let match;
  while ((match = VAR_REGEX.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text ?? '{{input}}');
  const updateNodeField = useStore((s) => s.updateNodeField);
  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  const variables = useMemo(() => extractVariables(text), [text]);

  const [dimensions, setDimensions] = useState({ width: 240, height: 72 });

  const recalcSize = useCallback(() => {
    if (measureRef.current) {
      const el = measureRef.current;

      const newWidth = Math.max(240, Math.min(480, el.scrollWidth + 32));
      const newHeight = Math.max(72, Math.min(300, el.scrollHeight + 20));
      setDimensions({ width: newWidth, height: newHeight });
    }
  }, []);

  useEffect(() => {
    recalcSize();
  }, [text, recalcSize]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const accentColor = '#6366f1';

  const varHandlePositions = variables.map((v, i) => ({
    name: v,
    top: ((i + 1) / (variables.length + 1)) * 100,
  }));

  return (
    <div
      className="base-node"
      style={{ minWidth: dimensions.width, transition: 'min-width 0.2s ease' }}
    >
      {}
      <div
        className="base-node__header"
        style={{
          background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
          borderBottom: `2px solid ${accentColor}35`,
          color: accentColor,
        }}
      >
        <span className="base-node__icon">📝</span>
        <span className="base-node__label">Text</span>
      </div>

      {}
      <div className="base-node__body">
        <div className="base-node__field">
          <span className="base-node__field-label">Text</span>
          <textarea
            ref={textareaRef}
            className="base-node__textarea"
            value={text}
            onChange={handleTextChange}
            style={{
              minHeight: dimensions.height,
              transition: 'min-height 0.2s ease',
              fontFamily: "'Menlo', 'Consolas', monospace",
              fontSize: '12px',
            }}
          />
        </div>
      </div>

      {}
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          height: 'auto',
          width: 'auto',
          whiteSpace: 'pre-wrap',
          fontFamily: "'Menlo', 'Consolas', monospace",
          fontSize: '12px',
          padding: '7px 10px',
          maxWidth: '448px',
        }}
      >
        {text}
      </div>

      {}
      {varHandlePositions.map((vh) => (
        <div key={vh.name} style={{ position: 'relative' }}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${vh.name}`}
            style={{
              background: accentColor,
              top: `${vh.top}%`,
            }}
          />
          <span
            className="base-node__var-label"
            style={{ top: `calc(${vh.top}% - 8px)` }}
          >
            {vh.name}
          </span>
        </div>
      ))}

      {}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ background: accentColor }}
      />
    </div>
  );
};
