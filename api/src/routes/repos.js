/* eslint-disable no-console */
import { Router } from 'express';
import axios from 'axios';
export const repos = Router();

repos.get('/', async (req, res) => {
  res.header('Cache-Control');

  res.status(200);

  const url = 'https://api.github.com/users/silverorange/repos';
  const options = {
    method: 'GET',
  };

  axios
    .get(url, options)
    .then((result) => {
      console.log(result);
      res.send({
        //filters to check if for == false
        // eslint-disable-next-line array-callback-return
        repos: result.data.filter((repo) => {
          if (repo.fork === false) {
            return repo;
          }
        }),
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
