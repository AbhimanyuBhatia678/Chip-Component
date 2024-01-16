import type { NextPage } from 'next';
import ChipsComponent from '../../components/ChipsComponent';
import React from 'react';
const Home: NextPage = () => {
  const items = [
    { name: 'Joe Barnes', email: 'joe@example.com' ,avatar:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'},
    { name: 'Monika James', email: 'monika@example.com', avatar:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' },
    { name: 'Sahil Sharma', email: 'sahil@example.com', avatar:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' },
    { name: 'Jonathan james', email: 'jonathan@example.com', avatar:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' },
    { name: 'Emma Jones', email: 'emma@example.com', avatar:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' },
    { name: 'Nick Giannopoulos', email: 'nick@example.com',avatar:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' },
    { name: 'Arjun Singh', email:'arjun@example.com', avatar:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'},
    { name: 'Liam Williams', email: 'liam@example.com', avatar:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' },
  ];

  return (
    <div className="container mx-auto mt-10">
      <ChipsComponent items={items} />
    </div>
  );
};

export default Home;