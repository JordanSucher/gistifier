import SummaryWrapper from "../../../ui/Summaries/SummaryWrapper"

export default async function Summary({params}) {
    return (
        <SummaryWrapper id={params.id}/>
    )
}