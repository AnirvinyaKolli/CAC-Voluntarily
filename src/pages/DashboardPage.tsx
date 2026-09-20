import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  // remeber user choice but I default to upcoming.
  const upcomingOpportunities = [
    {
      id: 1,
      title: "Volunteer Opportunity",
      date: "September 25, 2026",
      hours: "3 hours",
    },
    {
      id: 2,
      title: "Community Event",
      date: "October 2, 2026",
      hours: "2 hours",
    },
    {
      id: 3,
      title: "Food Drive",
      date: "October 10, 2026",
      hours: "4 hours",
    },
  ];

  const completedOpportunities = [
    {
      id: 4,
      title: "Completed Event",
      date: "September 10, 2026",
      hours: "3 hours",
    },
    {
      id: 5,
      title: "Community Service",
      date: "September 5, 2026",
      hours: "5 hours",
    },
  ];
  //random data bc me no know how to pull user info. I think we would prob get an array of objects(opps) and then use a for loop to assign ids but that you help me with!

  let opportunities;

  if (activeTab === "upcoming") {
    opportunities = upcomingOpportunities;
  } else {
    opportunities = completedOpportunities;
  }

  let completeTextColor =
    activeTab === "completed"
      ? "text-gray-900"
      : "text-gray-400 hover:text-gray-600";

  let upcomingTextColor =
    activeTab === "upcoming"
      ? "text-gray-900"
      : "text-gray-400 hover:text-gray-600";

  //choosing which array based on tab
  return (
    <main className="min-h-full bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12 xl:px-24">
      <div className="mx-auto w-full max-w-7xl">
        <section className="flex items-center gap-6 sm:gap-8">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
            <span className="text-4xl text-gray-400 sm:text-5xl">
              {/* Placeholder for the user img instead of having to go through the ordeal of filtering bad images
                 and having to load this images from them we can js provide like 12 different images like aniko and
                  let them pick
                <img src="" alt="" /> */}
            </span>
          </div>

          {/*User info*/}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">
              {"Your Name"}
              {/*Pulling from database so help me? */}
            </h1>

            <div className="mt-2 space-y-1.5 text-sm sm:text-base lg:text-lg">
              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Total Hours: </span>
                {"0 hours"}
                {/*I dont know how to pull user info. Anirvinya help meeeee*/}
              </p>

              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Class of </span>
                {"2028"}
                {/*Same thing here buddy */}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 sm:mt-24 lg:mt-28">
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="flex w-full max-w-xl justify-center gap-16 border-b border-gray-200 sm:gap-24">
              {/* Upcoming tab */}
              <button
                type="button"
                onClick={() => setActiveTab("upcoming")}
                className={`relative min-w-36 px-4 pb-4 text-center text-base font-medium transition sm:min-w-44 sm:text-lg ${upcomingTextColor}`}
              >
                {/*this is for deciding whether it should be grey or not*/}
                Upcoming
                {activeTab === "upcoming" && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-gray-900" />
                )}
                {/*underline section for the active tab*/}
              </button>

              {/* Completed tab */}
              <button
                type="button"
                onClick={() => setActiveTab("completed")}
                className={`relative min-w-36 px-4 pb-4 text-center text-base font-medium transition sm:min-w-44 sm:text-lg ${completeTextColor}`}
              >
                {/*this is for deciding whether it should be grey or not*/}
                Completed
                {activeTab === "completed" && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-gray-900" />
                )}
                {/*underline section for the active tab*/}
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {/*Going through the array of opportunities*/}
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="min-h-52 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-7 lg:min-h-56"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                      {opportunity.title}
                    </h2>

                    <p className="mt-3 text-sm text-gray-500 sm:text-base">
                      {opportunity.date}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 sm:text-base">
                      {opportunity.hours}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
