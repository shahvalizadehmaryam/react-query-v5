import { useMutation, useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  // const queryKey = ["all-todos"];
  // const queryFn = () => {
  //   return fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
  //     res.json()
  //   );
  // };
  // const { data, isPending, isLoading } = useQuery({ queryKey, queryFn });
  // console.log({ data, isPending, isLoading });
  const mutationFn = (data) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  };
  const { mutate, isPending } = useMutation({ mutationFn });
  console.log(isPending);
  const clickHandler = () => {
    const data = {
      title: "foo",
      body: "bar",
      userId: 1,
    };
    mutate(data, {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    });
  };

  return (
    <>
      <h3>home page</h3>
      <button onClick={clickHandler}>send</button>
    </>
  );
}

export default App;
