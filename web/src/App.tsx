import React, { useEffect, useState } from 'react';
import { Repo } from './Repo';
import './App.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
  repos: Repo[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = (props: any) => {
  const [data, setData] = useState<IProps>();
  const [filter, setFilter] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((response) => response.json())
      .then((datas) => setData(datas));
  }, []);
  const history = useNavigate();
  const goNextPage = (website: string) => {
    history('/recent', { state: { website } });
  };
  const languages = Array.from(new Set(data?.repos.map((x) => x.language)));
  console.log(languages);
  return (
    <div className="App">
      <h1>Welcome!</h1>
      <h2>set filter</h2>
      <button onClick={() => setFilter('')}>Show All</button>
      {languages.map((x) => {
        return (
          <>
            <button onClick={() => setFilter(x)}>{x}</button>
          </>
        );
      })}
      {data?.repos
        // eslint-disable-next-line array-callback-return
        .filter((repo) => {
          if (filter === '') {
            return repo;
          } else if (
            repo.language.toLowerCase().includes(filter.toLowerCase())
          ) {
            return repo;
          }
        })
        .sort(
          (a, b) =>
            new Date(b.created_at).setHours(0, 0, 0, 0) -
            new Date(a.created_at).setHours(0, 0, 0, 0)
        )
        .map((x, i) => {
          return (
            <>
              <div>
                <h3 key={i}>{x.name}</h3>
                <button
                  onClick={() =>
                    goNextPage(
                      'https://api.github.com/repos/silverorange/' +
                        x.name +
                        '/commits'
                    )
                  }
                >
                  Check Most recent commit
                </button>
                <p>
                  {x.description
                    ? 'Description: ' + x.description
                    : 'No Description'}
                </p>
                <p>Language: {x.language}</p>
                <p>Forks Count: {x.forks_count}</p>
                <p>Date: {x.created_at}</p>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default App;
