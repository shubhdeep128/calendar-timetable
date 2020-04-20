import React, { useState } from "react";

function App() {
  const [isRed, setRed] = useState(false);
  const [count, setCount] = useState(0);

  // const [user, setUser] = useState({
  //   name: "ed",
  //   age: 25,
  //   posts: ["my first post", "my second post"],
  // });
  const increment = () => {
    setCount(count + 1);
    setRed(!isRed);
  };

  return (
    <div>
      <h1 className={isRed ? "red" : ""}>Change Color</h1>
      <button onClick={increment}>Increment</button>
      <h2>{count}</h2>
    </div>
  );
}

export default App;
