// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  return (
    <UserContext.Provider value={{ userId, setUserId ,userName,setUserName,userRole,setUserRole}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
