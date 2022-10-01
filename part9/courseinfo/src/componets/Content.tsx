import { CoursePart } from "../types"
import { Part } from "./Part"

interface CoursePartsProp {
    courses: CoursePart[]
}

export const Content = ( {courses}: CoursePartsProp ) => {

    return (
        <div>
            {courses.map(c => (<Part key = {c.name} course = {c}/>
            ))}
        </div>
        
    )

}