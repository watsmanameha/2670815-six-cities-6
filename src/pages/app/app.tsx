import MainScreen from '../main-screen/main-screen';

type AppProps = {
  offersCount: number;
};

// App – корневой компонент приложения. Пока рендерит только главную страницу.
export default function App({ offersCount }: AppProps): JSX.Element {
  return <MainScreen offersCount={offersCount} />;
}
