interface DiaryPart {
   date: string,
    weather: string,
    visibility: string,
    comment?: string
}

interface DiaryListProps {
    diaries: DiaryPart[]
}

export const DiaryList = (props: DiaryListProps) => {
    return (
        <div>
            <h1>Diary entries</h1>
            {props.diaries.map(d => (
                <div key={`${d.date}-${d.weather}`}>
                    <h2>{d.date}</h2>
                    <p>
                        visibility: {d.visibility}<br/>
                        weather: {d.weather}
                        {d.comment ? <><br/> {d.comment}</> : ""}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default DiaryList