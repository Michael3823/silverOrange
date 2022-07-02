import React, { useEffect, useState } from 'react';
import { Repo } from './Repo';
import './App.css';

interface IProps {
  repos: Repo[];
}

export function App() {
  const [data, setData] = useState<IProps>();
  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((response) => response.json())
      .then((datas) => setData(datas));
  }, []);
  console.log(data);
  return (
    <div className="App">
      <h1>Hello Michael</h1>
      {data?.repos.map((x, i) => {
        return (
          <>
            <div>
              <h1 key={i}>{x.name}</h1>
            </div>
          </>
        );
      })}
    </div>
  );
}
