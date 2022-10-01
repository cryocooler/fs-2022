import { CoursePart } from "../types"

interface CoursePartsProp {
    courses: CoursePart[]
}


export const Total = ({courses}: CoursePartsProp) => {
    return (
        <div>
           Number of exercises: {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
}