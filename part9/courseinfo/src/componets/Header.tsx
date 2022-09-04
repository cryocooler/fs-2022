
interface headerProps {
    header: string
}

export const Header = ( {header}: headerProps ) => {

    return (
        <div>
            <h1>{header}</h1>
        </div>
    )

}