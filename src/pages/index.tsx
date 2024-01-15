import type { NextPage } from 'next';
import ChipsComponent from '../../components/ChipsComponent';

const Home: NextPage = () => {
  const items = [
    { name: 'Apple', email: 'apple@example.com' },
    { name: 'Banana', email: 'banana@example.com' },
    { name: 'Orange', email: 'orange@example.com' },
    { name: 'Mango', email: 'mango@example.com' },
    { name: 'Grapes', email: 'grapes@example.com' },
    { name: 'Nick Giannopoulos', email: 'nick@example.com' },
    { name: 'Arjun Singh', email:'arjun@example.com'},
    { name: 'Papaya', email: 'papaya@example.com' },
  ];

  return (
    <div className="container mx-auto mt-10">
      <ChipsComponent items={items} />
    </div>
  );
};

export default Home;