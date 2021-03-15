import React from "react";

const CourseName = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course: { parts } }) => {
  const reducer = (total, number) => total + number.exercises;
  const sum = parts.reduce(reducer, 0);
  return <p style={{ fontWeight: "bold" }}>Total of exercises {sum}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <CourseName course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
