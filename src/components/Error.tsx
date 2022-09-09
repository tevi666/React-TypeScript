import React from 'react';

interface ErrMsgProps {
    error: string
}

const Error = ({error}: ErrMsgProps) => {
    return (
        <div>
            <p className="text-center text-red-500">{error}</p>
        </div>
    );
};

export default Error;