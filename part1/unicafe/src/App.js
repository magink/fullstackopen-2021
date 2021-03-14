import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};
const Stats = ({ text }) => {
  return <p>{text}</p>;
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button
        text="neutral"
        handleClick={() => setNeutral(neutral + 1)}
      ></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <Title text="statistics" />
      <Stats text={`good: ${good}`} />
      <Stats text={`neutral: ${neutral}`} />
      <Stats text={`bad: ${bad}`} />
    </div>
  );
};

export default App;
