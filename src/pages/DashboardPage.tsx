
let workType ={
    comp: "ComputerScience",
    mat: "MatthewWatching",
    health: "Healthcare",
    anim: "AnimalSceince",
    cook: "Cullinary"
}
 class volunteerData{
    public locationName = "";
    public description = "";
    public types = [workType.comp, workType.mat];
}
 let data:volunteerData[] = [];
 let cd = new volunteerData();
 cd.locationName = "Anirvinyas house";
 cd.description = "WATCH HIM FROM HIS HOUSE";
data.push(cd);
 cd = new volunteerData();
 cd.locationName = "Shrishs Basement";
 cd.description = "Help Shrish monitor the children locked in his basement";
 cd.types = [workType.health, workType.anim];
 data.push(cd);
function Dashboard(){
    return (
         <main className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((volunteer) => (
                    <article
                        key={volunteer.locationName} className="rounded-lg bg-white p-5 shadow-md" >
                        <h2 className="mb-3 text-xl font-bold text-gray-900">{volunteer.locationName}
                        </h2>
                        <p className="text-gray-600">{volunteer.description}</p>
                        <div className="mt-4">
                            <h3 className="mb-2 text-sm font-semibold text-gray-700">Work types</h3>
                            <div className="flex flex-wrap gap-2">
                                {volunteer.types.map((type) => (
                                    <span key={type}className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"> 
                                    {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
    
}


export default Dashboard; 
