import MainScreen from '../main-screen/main-screen';

// App – корневой компонент приложения. Пока рендерит только главную страницу.
export default function App(): JSX.Element {
  const offersCount = 5;
  return <MainScreen offersCount={offersCount} />;
}
