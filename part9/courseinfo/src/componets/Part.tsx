import { CoursePart } from "../types";

interface CourseProp {
    course: CoursePart
}

export const Part = ({course}: CourseProp) => {

    const exhaustiveType = (type: never): never => {
        throw new Error(`Error ${type} is not valid`)
      }

      switch(course.type) {
        case "normal":
            return (<div><b>{course.name} {course.exerciseCount}</b>
            <br></br>
            <i>{course.description}</i>
             </div>
            )
        case "submission":
            return (<div>
                <b>{course.name} {course.exerciseCount}</b>
                <br></br>
                <i>{course.description}</i>
                <br></br>
                submit to {course.exerciseSubmissionLink}
            </div>)
        case "groupProject":
            return (
                <div>
                    <b>{course.name} {course.exerciseCount}</b>
                    <i>{course.description}</i>
                    <br></br>
                    project exercises {course.groupProjectCount}
                </div>
            )
        case "special":
            return (
                <div>
                    <b>{course.name} {course.exerciseCount}</b>
                    <br></br>
                    <i>{course.description}</i>
                    <br></br>
                    required skills: {course.requirements.map(c => c + ", ")}
                </div>
            )
        default:
            return exhaustiveType(course)
      }
    
    //   switch(course.type) {
    //     case "normal":
        
    //     returnEl = <p>{course.name} {course.type} {course.exerciseCount} {course.description}</p>
    //     break;
    //     case "submission":
            
    //     returnEl =    <p>{course.name} {course.type} {course.exerciseCount}{course.description} 
    //             {course.exerciseSubmissionLink}</p>
    //         break;
    //     case "groupProject":
            
    //         returnEl = <p>{course.name} {course.type} {course.exerciseCount} {course.groupProjectCount}</p>
    //         break;
    //     default:
    //         exhaustiveType(course)
           



}