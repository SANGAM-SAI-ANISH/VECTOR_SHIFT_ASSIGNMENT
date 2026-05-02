

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (loading) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'Failed to connect to backend');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setResult(null);
        setError(null);
    };

    return (
        <>
            <div className="submit-bar">
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    <span className="submit-btn__icon">
                        {loading ? '⏳' : '🚀'}
                    </span>
                    {loading ? 'Analyzing…' : 'Submit Pipeline'}
                </button>
            </div>

            {}
            {(result || error) && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        {error ? (
                            <>
                                <div className="modal-card__header">
                                    <div className="modal-card__icon modal-card__icon--error">⚠️</div>
                                    <div className="modal-card__title">Connection Error</div>
                                </div>
                                <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
                                    {error}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="modal-card__header">
                                    <div className="modal-card__icon modal-card__icon--success">✅</div>
                                    <div className="modal-card__title">Pipeline Analysis</div>
                                </div>

                                <div className="modal-card__stats">
                                    <div className="modal-card__stat">
                                        <span className="modal-card__stat-value">{result.num_nodes}</span>
                                        <span className="modal-card__stat-label">Nodes</span>
                                    </div>
                                    <div className="modal-card__stat">
                                        <span className="modal-card__stat-value">{result.num_edges}</span>
                                        <span className="modal-card__stat-label">Edges</span>
                                    </div>
                                    <div className="modal-card__stat">
                                        <span className="modal-card__stat-value">
                                            <span
                                                className={`modal-card__dag-badge ${
                                                    result.is_dag
                                                        ? 'modal-card__dag-badge--yes'
                                                        : 'modal-card__dag-badge--no'
                                                }`}
                                            >
                                                {result.is_dag ? '✓ Yes' : '✗ No'}
                                            </span>
                                        </span>
                                        <span className="modal-card__stat-label">Is DAG</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <button className="modal-card__close" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
