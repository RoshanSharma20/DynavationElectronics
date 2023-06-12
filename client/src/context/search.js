import { useState, useContext, createContext } from "react";

const SearchContext = createContext();//create a context api isntance

const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: []
    });
    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}


//custon hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };