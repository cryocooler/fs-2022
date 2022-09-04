import { Header } from "./componets/Header";
import { Content } from "./componets/Content";
import { Total } from "./componets/Total";

const App = () => {
  const courseName = "Half Stack application development";
   
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
  interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    description: string;
  }
  
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
  interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    description: string;
    exerciseSubmissionLink: string;
  }
  
  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;
  
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ]

  return (
    <div>
      <Header header = {courseName}/>
      <Content courses = {courseParts}/>
      <Total courses = {courseParts}/>
      
    
    </div>
  );
};

export default App;