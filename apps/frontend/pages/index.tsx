import { useUser } from '../features/user';

export function Index() {
  const { user } = useUser();
  return (
    <>
      <h1>Home</h1>
      {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : <p>Not logged in</p>}
    </>
  );
}

export default Index;
