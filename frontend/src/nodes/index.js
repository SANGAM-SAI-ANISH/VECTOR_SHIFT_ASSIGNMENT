

import { createNode } from './BaseNode';
import { nodeConfigRegistry } from './nodeConfigs';
import { TextNode } from './textNode';

const nodeComponents = {};
const nodeTypes = {};

Object.entries(nodeConfigRegistry).forEach(([typeKey, config]) => {

  if (typeKey === 'text') {
    nodeComponents[typeKey] = TextNode;
    nodeTypes[typeKey] = TextNode;
  } else {
    const Component = createNode(config);
    nodeComponents[typeKey] = Component;
    nodeTypes[typeKey] = Component;
  }
});

export const InputNode       = nodeComponents.customInput;
export const LLMNode         = nodeComponents.llm;
export const OutputNode      = nodeComponents.customOutput;
export { TextNode };
export const FilterNode      = nodeComponents.filter;
export const ApiRequestNode  = nodeComponents.apiRequest;
export const TimerNode       = nodeComponents.timer;
export const MergeNode       = nodeComponents.merge;
export const NoteNode        = nodeComponents.note;

export { nodeTypes };
