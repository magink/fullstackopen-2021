import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad) || 0; // Avoids NaN as default value
  const positive = (good / total) * 100 || 0;
  return (
    <>
      <Statistic text="good: " value={good}></Statistic>
      <Statistic text="neutral: " value={neutral}></Statistic>
      <Statistic text="bad: " value={bad}></Statistic>
      <Statistic text="all: " value={total}></Statistic>
      <Statistic text="average: " value={average}></Statistic>
      <Statistic text="positive: " value={positive}></Statistic>
    </>
  );
};
const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
