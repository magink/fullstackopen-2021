import React from "react";
import ReactDOM from "react-dom";

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
const Courses = ({ header, courses }) => {
  return (
    <>
      <h1>{header}</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Courses header="Web Development Curriculum" courses={courses} />;
};
ReactDOM.render(<App />, document.getElementById("root"));
