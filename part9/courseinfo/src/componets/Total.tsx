import { Course, Courses } from "../types"



export const Total = ({courses}: Courses) => {
    return (
        <div>
           Number of exercises: {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
}