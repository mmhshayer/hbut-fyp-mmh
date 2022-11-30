import { useUser } from '../features/user';

export function Index() {
  const { user, companies, currentCompany } = useUser();
  return (
    <>
      <h1>Home</h1>
      {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : <p>Not logged in</p>}
      {companies ? (
        <pre>{JSON.stringify(companies, null, 2)}</pre>
      ) : (
        <p>No Companies</p>
      )}
      {currentCompany ? (
        <pre>{JSON.stringify(currentCompany, null, 2)}</pre>
      ) : (
        <p>No Current Company</p>
      )}
    </>
  );
}

export default Index;
