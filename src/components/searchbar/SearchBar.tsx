import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setCurSubreddit, setSearchTerm } from '../../features/reddit/redditSlice';
import './SearchBar.css';
import logoUrl from '../../images/reddit-logo.webp';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch<any>();
    const searchTerm = useSelector((state: any) => state.reddit?.searchTerm);
    //const logoUrl = "https://static.vecteezy.com/system/resources/previews/018/930/474/non_2x/reddit-logo-reddit-icon-transparent-free-png.png";
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //dispatch(setSearchTerm(query));
        dispatch(setCurSubreddit(query));
        //dispatch(fetchPosts(query));
        //setQuery('');
    };
      
    useEffect(() => {
        setQuery(searchTerm);
    }, [searchTerm]);

    return (
        <header>
            <div className="logo">
                <img src={logoUrl} alt="Reddit Logo" />
                <h1>Reddit Search</h1>
            </div>
            <div className="search-bar">
                <form className="search=form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search Reddit..."
                        aria-label="Search Reddit"
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        </header>  
      );
  };
  
  export default SearchBar;