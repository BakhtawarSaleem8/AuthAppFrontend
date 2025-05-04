import React, { createContext, useContext, useState , PropsWithChildren , useEffect} from 'react';

interface UserContextProps {
  user: { name: string; role: number , id:string} | null;
  setUser: (user: { name: string; role: number, id:string} | null) => void,
  clearUser : ()=>void
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }:React.PropsWithChildren) => {
  const savedUser = localStorage.getItem("user")
  console.log(savedUser , "savedUser")
  const [user, setUser] = useState<{name : string , role :  number , id: string , token? : string} | null>(savedUser ? (JSON.parse(savedUser)) : null);

  // Sync role with localStorage
  useEffect(() => {
    console.log(user , "userrr")
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Clear role on logout (if needed)
  const clearUser = () => {
    localStorage.removeItem("role");
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, setUser , clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
