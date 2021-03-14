import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};
const Anecdote = ({ text }) => {
  return <p>{text}</p>;
};
const Votes = ({ text }) => {
  return <p>has {text} votes</p>;
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const nextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  const addVote = () => {
    const copy = [...votes]; // Store temporarily
    copy[selected] += 1;
    setVotes(copy); // Set copy as new State array
  };
  return (
    <div>
      <Anecdote text={anecdotes[selected]} />
      <Votes text={votes[selected]} />
      <Button handleClick={addVote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
    </div>
  );
};

export default App;
