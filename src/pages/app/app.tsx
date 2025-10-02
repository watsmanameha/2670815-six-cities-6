import type { FC } from 'react';
import MainScreen from '../main-screen/main-screen';

type AppProps = {
  offersCount: number;
};

// App – корневой компонент приложения. Пока рендерит только главную страницу.
const App: FC<AppProps> = ({ offersCount }) => <MainScreen offersCount={offersCount} />;

export default App;
