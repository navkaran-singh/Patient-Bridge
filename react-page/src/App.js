import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>React Page Using npx create-react-app</div>
      <h2>Counter Example</h2>
      <div style={{ fontSize: "20px", margin: "20px" }}>
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </div>
      <p>
        Edit <code>App.js</code> and save to test HMR (Hot Module Replacement)
      </p>
    </div>
  );
};

export default App;
