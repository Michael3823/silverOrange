import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Recent = () => {
  const location = useLocation();
  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    await fetch(location.state.website)
      .then((response) => response.json())
      .then((datas) => setData(datas[0]));
  }, [location.state.website]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div>
      <h1>Most Recent Commit</h1>
      <NavLink to="/" activeClassName="active">
        Go Back
      </NavLink>
      <p>Date: {data?.commit.author.date}</p>
      <p>Name: {data?.commit.author.name}</p>
      <p>Date: {data?.commit.message}</p>
    </div>
  );
};

export default Recent;
