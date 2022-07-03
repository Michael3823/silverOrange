import React, { useEffect, useState } from 'react';
import { Repo } from './Repo';
import './App.css';

interface IProps {
  repos: Repo[];
}

export function App() {
  const [data, setData] = useState<IProps>();
  const [filter, setFilter] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((response) => response.json())
      .then((datas) => setData(datas));
  }, []);
  return (
    <div className="App">
      <h1>Welcome!</h1>
      <h2>set filter</h2>
      <button onClick={() => setFilter('')}>Show All</button>
      <button onClick={() => setFilter('Typescript')}>Typescript</button>
      <button onClick={() => setFilter('PHP')}>PHP</button>

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
                <h3 key={i}>
                  <a href={x.url}> {x.name}</a>
                </h3>
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
}
