// import React from 'react';
import { styled } from 'styled-components';

const ProgressBar = ({ total, current, type, isStriped }: { total: number, current: number, type: 'success' | 'warning' | 'primary' | 'danger' | 'orange' | 'purple', isStriped?: boolean }) => {
    return (
        <StyledProgressBar>
            <div className={`${type} ${isStriped ? 'striped' : ''}`} style={{ width: `${100 * current / (total || 1)}%` }}></div>
        </StyledProgressBar>
    )
}

const StyledProgressBar = styled.div`
    background: var(--light-back);
    height: 8px;
    overflow: hidden;
    border-radius: 0.25rem;
    margin: 1em 0;
    display: block;
    > div {
        height: 8px;
        &.primary {
            background-color: var(--primary);
        }
        &.success {
            background-color: var(--success);
        }
        &.secondary {
            background-color: var(--success);
        }
        &.warning {
            background-color: var(--warning);
        }
        &.danger {
            background-color: var(--danger);
        }
        &.striped {
            background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
            background-size: 1rem 1rem;
        }
    }
`;

export default ProgressBar