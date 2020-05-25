import React from 'react';

const Fatal = ({ message }) => {
    return (
        <h2 className='center rojo'>
            Error de URL - { message }
        </h2>
    );
};

export default Fatal;