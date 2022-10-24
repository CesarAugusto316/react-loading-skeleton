import { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';


const Card = (props) => {
  const [imageLoad, setImageLoad] = useState(false);

  const { isLoading } = props;
  return (
    <div className='card'>
      <figure>
        {!imageLoad &&
          <Skeleton
            circle
            height="100%"
            containerClassName="avatar-skeleton"
          />
        }
        <img
          onLoad={() => setImageLoad(true)}
          src={props.avatar}
          alt="avatar"
        />
      </figure>

      <h2>{isLoading ? <Skeleton /> : 'Fullstack Developer'}</h2>
      <p>{isLoading ? <Skeleton /> : props.first_name}</p>
      <p>{isLoading ? <Skeleton /> : props.last_name}</p>
      <p>{isLoading ? <Skeleton /> : props.email}</p>
    </div>
  );
};

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    getRandomUser()
      .then(data => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Card {...user} isLoading={isLoading} />
    </div>
  );
};

async function getRandomUser() {
  try {
    const { data } = await axios.get('https://random-data-api.com/api/v2/users');
    return data;
  } catch (err) {
    return err;
  }
}
