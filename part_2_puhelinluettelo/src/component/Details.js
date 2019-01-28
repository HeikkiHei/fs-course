import React from "react";
import Detail from "./Detail";

const Details = ({ persons }) => (
  <div>
    {persons.map(person => (
      <Detail key={person.id} name={person.name} number={person.number} />
    ))}
  </div>
);

export default Details;
