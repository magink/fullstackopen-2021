import React from "react";

const PersonForm = ({
  addToPhonebook,
  onNameChange,
  onNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={addToPhonebook}>
        <div>
          name:{" "}
          <input
            onChange={onNameChange}
            value={newName}
            required
            // pattern="" // Too demanding for now. Too many variations.
            placeholder="Hannu Mikkola" // RIP
          />
        </div>
        <div>
          number:{" "}
          <input
            type="tel"
            onChange={onNumberChange}
            value={newNumber}
            required
            // pattern="^[0-9 -]{0,16}$" // Max 16 numbers for now, no +
            placeholder="358401234567"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
