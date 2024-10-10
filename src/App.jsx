import { useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  const queryKey = ["all-todos"];
  const queryFn = () => {
    return fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
      res.json()
    );
  };
  const { data, isPending } = useQuery({ queryKey, queryFn });
  console.log(data, isPending);

  return (
    <>
      <h3>home page</h3>
    </>
  );
}

export default App;
