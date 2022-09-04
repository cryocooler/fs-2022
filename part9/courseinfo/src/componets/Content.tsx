
interface Course {
    name: string,
    exerciseCount: number
}

interface Courses {
    courses: Course[]
}

export const Content = ({ courses }: Courses): JSX.Element => {

    return (
        <div>
            {courses.map(c => (<div key = {c.name}>{c.name} {c.exerciseCount}</div>
            ))}
        </div>
        
    )

}