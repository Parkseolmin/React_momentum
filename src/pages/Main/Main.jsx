import Loading from 'components/Loading/Loading';
import Navbar from 'components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useBackgroundImage } from 'hooks/useBackgroundImage';
import { TodosProvider } from 'context/TodosContext';
import { DarkModeProvider } from 'context/DarkModeContext';
import { Helmet } from 'react-helmet-async';

export default function Main() {
  const { isLoading, error, backgroundImageUrl } = useBackgroundImage();

  if (isLoading) return <Loading />;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <main
      className='mainBackground'
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Helmet>
        <title>Momentum</title>
        <link rel='canonical' href='https://react-momentum-one.vercel.app/' />
      </Helmet>
      <Navbar />
      <DarkModeProvider>
        <TodosProvider>
          <section className='sectionBackground'>
            <Outlet />
          </section>
        </TodosProvider>
      </DarkModeProvider>
    </main>
  );
}
