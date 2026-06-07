interface CoursePartBase {
  name: string
  exerciseCount: number
  description?: string
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string
  requirements: string[]
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

interface PartProps {
  coursePart: CoursePart
}

const Part = (props: PartProps) => {
  const { coursePart } = props
  const description = coursePart.description ? <><br/><i>{coursePart.description}</i></> : null
  
  switch(coursePart.kind) {
    case "basic":
      return <div><b>{coursePart.name} {coursePart.exerciseCount}</b>{description}</div>
    case "group": 
      return <div><b>{coursePart.name} {coursePart.exerciseCount}</b><br/>project exercises {coursePart.groupProjectCount}{description}</div>
    case "background":
      return <div><b>{coursePart.name} {coursePart.exerciseCount}</b>{description}<br/>submit to: {coursePart.backgroundMaterial}</div>
    case "special":
      return <div><b>{coursePart.name} {coursePart.exerciseCount}</b>{description}<br/>required skills: {coursePart.requirements.join(", ")}</div>
    default:
      return assertNever(coursePart)
  }
}

interface CoursePartsProps {
    courseParts: CoursePart[]
}

export const Content = (props: CoursePartsProps) => {
    return (
        <div>
            {props.courseParts.map(c => (
                <><Part key={c.name} coursePart={c} /><br/></>
            ))}
        </div>
    )
}

export default Content