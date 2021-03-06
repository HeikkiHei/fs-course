import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  const rnd = Math.round(Math.random() * 5);
  return <button onClick={() => props.handleClick(rnd)}>{props.text}</button>;
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint16Array(6));

  const voteCurrent = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    console.log(votes);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        <i>{anecdotes[selected]}</i>
      </p>
      <p>This anecdote has {votes[selected]} votes.</p>
      <Button handleClick={voteCurrent} text={"Vote!"} />
      <Button handleClick={setSelected} text={"Another anecdote!"} />
      <h2>Top anecdote</h2>
      <p>
        <i>
          {
            anecdotes[
              votes.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0)
            ]
          }
        </i>
        <br />
        With {Math.max.apply(null, votes)} votes.
      </p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App />, document.getElementById("root"));
