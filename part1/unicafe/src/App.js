import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total <= 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  const average = (good - bad) / (good + neutral + bad) || 0; // Avoids NaN as default value
  const positive = (good / total) * 100 || 0;
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>
              <Title text="Statistics" />
            </th>
          </tr>
          <tr>
            <Statistic text="good: " value={good}></Statistic>
          </tr>
          <tr>
            <Statistic text="neutral: " value={neutral}></Statistic>
          </tr>
          <tr>
            <Statistic text="bad: " value={bad}></Statistic>
          </tr>
          <tr>
            <Statistic text="all: " value={total}></Statistic>
          </tr>
          <tr>
            <Statistic text="average: " value={average}></Statistic>
          </tr>
          <tr>
            <Statistic text="positive: " value={`${positive} %`}></Statistic>
          </tr>
        </tbody>
      </table>
    </>
  );
};
const Statistic = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
