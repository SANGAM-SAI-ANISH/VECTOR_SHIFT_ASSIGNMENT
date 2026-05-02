

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="pipeline-toolbar__logo">
                <div className="pipeline-toolbar__logo-icon">⚡</div>
                <div>
                    <div className="pipeline-toolbar__logo-text">VectorShift</div>
                    <div className="pipeline-toolbar__logo-sub">Pipeline Builder</div>
                </div>
            </div>
            <div className="pipeline-toolbar__nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='apiRequest' label='API Request' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='note' label='Note' />
            </div>
        </div>
    );
};
