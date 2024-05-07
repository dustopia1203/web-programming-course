import { useLabel } from "../../label";

function HomePage() {
  const { setState } = useLabel();
  setState("Home page");
  return (
    <>
      <h1>Photo app home page.</h1>
    </>
  );
}

export default HomePage;
