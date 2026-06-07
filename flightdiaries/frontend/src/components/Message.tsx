interface MessageProps {
    message: string,
    type: string
}

export const Message = (props: MessageProps) => {
    if (!props.message) return null;

    const color = props.type === "error"
        ? "red"
        : props.type === "success"
            ? "green"
            : "black"

    return (
        <div>
            <p style={{ color, whiteSpace: "pre-wrap" }}>{props.message}</p>
        </div>
    )
}

export default Message