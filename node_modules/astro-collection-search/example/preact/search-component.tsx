
import { type CollectionSearchResult, Search } from 'astro-collection-search';
import { useState, useEffect } from 'preact/hooks';

import "../search-component.css";

export function SearchComponent({headings=[], contents=[]}) {

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      const text = sessionStorage.getItem('query') || '';
      setQuery(text);
      const json = sessionStorage.getItem('results');
      if (json) {
        try {
          const results = JSON.parse(json);
          setList(results);
        }
        catch (err) {
          console.error(err);
        }
      }
    }
  }, []);

  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');

  const CreateLink = (result: CollectionSearchResult) => {
    return ('/' + result.collection + '/' + result.file.replace(/\.mdx{0,1}$/, '')).toLowerCase();
  };

  const HandleInput = async (event: KeyboardEvent): Promise<undefined> => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      const value = target.value.trim();
      setQuery(target.value);
      sessionStorage.setItem('query', value);
      if (value) {
        const results = await Search(value);
        sessionStorage.setItem('results', JSON.stringify(results));
        setList(results);
      }
      else {
        sessionStorage.setItem('results', JSON.stringify([]));
        setList(undefined);
      }
    }
  };

  return (
    <div>

      <p className="note">
        Note: links in search results may not work. That's because we index
        collections, not pages, and we don't necessarily know how your pages
        are organized. We're just guessing that links are <code>collection/filename</code>. 
        If they're not, you probably need to change the <code>CreateLink</code> method in the search component.
      </p>

      <input placeholder="Search" value={query} onInput={HandleInput} />
      <div>

        {(list?.length === 0) && 
          <div>
            Your search returned no results.
          </div>
        }

        {list?.map(result => 

          <div className="search-result">
            <h1 class="title"><a href={CreateLink(result)}>{result.frontmatter.title || 'No title'}</a></h1>

            {result.frontmatter.description && 
              <h2 className="description">{result.frontmatter.description}</h2>
            }
            
            <details class="details">
              <summary>Search result details</summary>

              <div class="grid">
                <h3 class="details-header">Collection info</h3>
                <div class="row">
                  <span>Collection</span><span>{result.collection}</span>
                </div>
                <div class="row">
                  <span>File</span><span>{result.file}</span>
                </div>

                <h3 class="details-header">Frontmatter</h3>
                {Object.entries(result.frontmatter).map(([key, value]) => 
                  <div class="row">
                    <span>{key}</span>
                    <span>{value}</span>
                  </div>
                )}

                <h3 class="details-header">Metadata</h3>
                <div class="row">
                  <span>Score</span><span>{result.score}</span>
                </div>
              </div>

            </details>
          </div>
        )}

      </div>  
    </div>
  );

}
