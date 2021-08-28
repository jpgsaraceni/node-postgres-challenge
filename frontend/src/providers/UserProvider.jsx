import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export const UserProvider = (props) => { 
      
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   setUser(getUser());
  // }, [user])

    return (
        <UserContext.Provider >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
