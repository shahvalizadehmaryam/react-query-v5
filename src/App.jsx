import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

function App() {
  const queryClient = useQueryClient();
  const queryKey = ["all-posts"];
  const queryFn = () => {
    return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    );
  };
  const { data, isPending, isLoading } = useQuery({ queryKey, queryFn });
  console.log({ data, isPending, isLoading });
  const mutationFn = (data) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  };
  const { mutate } = useMutation({ mutationFn });
  const clickHandler = () => {
    const data = {
      title: "foo",
      body: "bar",
      userId: 1,
    };
    mutate(data, {
      onSuccess: (data) =>
        queryClient.invalidateQueries({ queryKey: ["all-posts"] }),
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
