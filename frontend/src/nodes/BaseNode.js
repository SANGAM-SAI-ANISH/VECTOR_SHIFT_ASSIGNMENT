

import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './BaseNode.css';

const BaseNode = ({ id, data, config }) => {
  const { label, icon, accentColor = '#818cf8', handles = [], fields = [] } = config;

  const buildInitialState = useCallback(() => {
    const state = {};
    fields.forEach((f) => {
      state[f.key] = data?.[f.key] !== undefined ? data[f.key] : f.defaultValue;
    });
    return state;

  }, []);

  const [fieldValues, setFieldValues] = useState(buildInitialState);
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleChange = (key, value) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
    updateNodeField(id, key, value);
  };

  const renderField = (field) => {
    const val = fieldValues[field.key];

    switch (field.kind) {
      case 'text':
        return (
          <div className="base-node__field" key={field.key}>
            <span className="base-node__field-label">{field.label}</span>
            <input
              className="base-node__input"
              type="text"
              value={val ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          </div>
        );

      case 'select':
        return (
          <div className="base-node__field" key={field.key}>
            <span className="base-node__field-label">{field.label}</span>
            <select
              className="base-node__select"
              value={val ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            >
              {(field.options || []).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div className="base-node__field" key={field.key}>
            <span className="base-node__field-label">{field.label}</span>
            <textarea
              className="base-node__textarea"
              value={val ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              rows={field.rows || 3}
            />
          </div>
        );

      case 'slider':
        return (
          <div className="base-node__field" key={field.key}>
            <span className="base-node__field-label">{field.label}</span>
            <div className="base-node__slider-wrapper">
              <input
                className="base-node__slider"
                type="range"
                min={field.min ?? 0}
                max={field.max ?? 100}
                step={field.step ?? 1}
                value={val ?? field.min ?? 0}
                onChange={(e) => handleChange(field.key, Number(e.target.value))}
              />
              <span className="base-node__slider-value">
                {val ?? field.min ?? 0}{field.unit ?? ''}
              </span>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="base-node__field" key={field.key}>
            <label className="base-node__checkbox-wrapper">
              <input
                className="base-node__checkbox"
                type="checkbox"
                checked={!!val}
                onChange={(e) => handleChange(field.key, e.target.checked)}
              />
              <span className="base-node__checkbox-text">{field.label}</span>
            </label>
          </div>
        );

      case 'info':
        return (
          <div className="base-node__field" key={field.key}>
            <p className="base-node__info">{field.text}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="base-node">
      {}
      <div
        className="base-node__header"
        style={{
          background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)`,
          borderBottom: `2px solid ${accentColor}30`,
          color: accentColor,
        }}
      >
        {icon && <span className="base-node__icon">{icon}</span>}
        <span className="base-node__label">{label}</span>
      </div>

      {}
      {fields.length > 0 && (
        <div className="base-node__body">
          {fields.map(renderField)}
        </div>
      )}

      {}
      {handles.map((h, idx) => (
        <Handle
          key={h.id || `${h.type}-${idx}`}
          type={h.type}
          position={Position[h.position] || h.position}
          id={`${id}-${h.id}`}
          style={{
            background: accentColor,
            ...h.style,
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;

export const createNode = (config) => {
  const NodeComponent = (props) => <BaseNode {...props} config={config} />;
  NodeComponent.displayName = config.label.replace(/\s/g, '') + 'Node';
  return NodeComponent;
};
