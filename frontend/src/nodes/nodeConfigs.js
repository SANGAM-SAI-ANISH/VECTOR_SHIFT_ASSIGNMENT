

export const inputConfig = {
  label: 'Input',
  icon: '📥',
  accentColor: '#10b981',
  handles: [
    { type: 'source', position: 'Right', id: 'value' },
  ],
  fields: [
    {
      kind: 'text',
      label: 'Name',
      key: 'inputName',
      defaultValue: 'input_1',
    },
    {
      kind: 'select',
      label: 'Type',
      key: 'inputType',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
  ],
};

export const outputConfig = {
  label: 'Output',
  icon: '📤',
  accentColor: '#f59e0b',
  handles: [
    { type: 'target', position: 'Left', id: 'value' },
  ],
  fields: [
    {
      kind: 'text',
      label: 'Name',
      key: 'outputName',
      defaultValue: 'output_1',
    },
    {
      kind: 'select',
      label: 'Type',
      key: 'outputType',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' },
      ],
    },
  ],
};

export const llmConfig = {
  label: 'LLM',
  icon: '🤖',
  accentColor: '#8b5cf6',
  handles: [
    { type: 'target', position: 'Left', id: 'system', style: { top: '33%' } },
    { type: 'target', position: 'Left', id: 'prompt', style: { top: '66%' } },
    { type: 'source', position: 'Right', id: 'response' },
  ],
  fields: [
    {
      kind: 'info',
      key: 'description',
      text: 'This is a LLM. Connects system prompt and user prompt to generate a response.',
    },
  ],
};

export const textConfig = {
  label: 'Text',
  icon: '📝',
  accentColor: '#6366f1',
  handles: [
    { type: 'source', position: 'Right', id: 'output' },
  ],
  fields: [
    {
      kind: 'text',
      label: 'Text',
      key: 'text',
      defaultValue: '{{input}}',
    },
  ],
};

export const filterConfig = {
  label: 'Filter',
  icon: '🔍',
  accentColor: '#06b6d4',
  handles: [
    { type: 'target', position: 'Left', id: 'input' },
    { type: 'source', position: 'Right', id: 'passed' },
    { type: 'source', position: 'Right', id: 'rejected', style: { top: '75%' } },
  ],
  fields: [
    {
      kind: 'select',
      label: 'Condition',
      key: 'condition',
      defaultValue: 'contains',
      options: [
        { value: 'contains', label: 'Contains' },
        { value: 'equals', label: 'Equals' },
        { value: 'regex', label: 'Regex Match' },
        { value: 'startsWith', label: 'Starts With' },
      ],
    },
    {
      kind: 'text',
      label: 'Pattern',
      key: 'pattern',
      defaultValue: '',
    },
  ],
};

export const apiRequestConfig = {
  label: 'API Request',
  icon: '🌐',
  accentColor: '#ec4899',
  handles: [
    { type: 'target', position: 'Left', id: 'trigger' },
    { type: 'source', position: 'Right', id: 'response' },
  ],
  fields: [
    {
      kind: 'select',
      label: 'Method',
      key: 'method',
      defaultValue: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
      ],
    },
    {
      kind: 'text',
      label: 'URL',
      key: 'url',
      defaultValue: 'https://api.example.com/data',
    },
    {
      kind: 'textarea',
      label: 'Headers (JSON)',
      key: 'headers',
      defaultValue: '{\n  "Content-Type": "application/json"\n}',
      rows: 3,
    },
  ],
};

export const timerConfig = {
  label: 'Timer',
  icon: '⏱️',
  accentColor: '#f97316',
  handles: [
    { type: 'target', position: 'Left', id: 'start' },
    { type: 'source', position: 'Right', id: 'done' },
  ],
  fields: [
    {
      kind: 'slider',
      label: 'Delay',
      key: 'delay',
      defaultValue: 5,
      min: 0,
      max: 60,
      step: 1,
      unit: 's',
    },
    {
      kind: 'checkbox',
      label: 'Repeat',
      key: 'repeat',
      defaultValue: false,
    },
  ],
};

export const mergeConfig = {
  label: 'Merge',
  icon: '🔀',
  accentColor: '#14b8a6',
  handles: [
    { type: 'target', position: 'Left', id: 'inputA', style: { top: '33%' } },
    { type: 'target', position: 'Left', id: 'inputB', style: { top: '66%' } },
    { type: 'source', position: 'Right', id: 'merged' },
  ],
  fields: [
    {
      kind: 'select',
      label: 'Strategy',
      key: 'strategy',
      defaultValue: 'concat',
      options: [
        { value: 'concat', label: 'Concatenate' },
        { value: 'zip', label: 'Zip' },
        { value: 'interleave', label: 'Interleave' },
      ],
    },
  ],
};

export const noteConfig = {
  label: 'Note',
  icon: '📌',
  accentColor: '#eab308',
  handles: [],               
  fields: [
    {
      kind: 'textarea',
      label: 'Notes',
      key: 'content',
      defaultValue: 'Add your notes here…',
      rows: 4,
    },
  ],
};

export const nodeConfigRegistry = {
  customInput: inputConfig,
  llm: llmConfig,
  customOutput: outputConfig,
  text: textConfig,
  filter: filterConfig,
  apiRequest: apiRequestConfig,
  timer: timerConfig,
  merge: mergeConfig,
  note: noteConfig,
};
