import {type OpportunityData} from "../OpportunityData";

interface OpportunityCardProps {
    opportunity: OpportunityData;
}

function OpportunityCard({opportunity}: OpportunityCardProps) {
    return(
        <article
            key={opportunity.locationName}
            className="rounded-lg bg-white p-5 shadow-md"
        >
            <h2 className="mb-3 text-xl font-bold text-gray-900">
                {opportunity.locationName}
            </h2>
            <p className="whitespace-pre-line text-gray-600">
                {opportunity.description}
            </p>
            <div className="mt-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Work types</h3>
                <div className="flex flex-wrap gap-2">
                    {opportunity.types.map((type: string) => (
                    <span
                        key={type}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                        {type}
                    </span>
                    ))}
                </div>
            </div>
        </article>
    ); 
}
export default OpportunityCard;