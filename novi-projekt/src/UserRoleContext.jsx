import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState('user'); 

    const toggleRole = () => {
        setRole(prevRole => prevRole === 'user' ? 'admin' : 'user');
    };

    return (
        <RoleContext.Provider value={{ role, setRole, toggleRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export default RoleProvider;
