export default function Read(props) {
    return (
        <>
            <h2>Read {props.params.id}</h2>
            {props.params.id}
        </>
    )
}