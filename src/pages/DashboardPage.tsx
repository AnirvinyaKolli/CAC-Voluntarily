import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useUserData } from "../context/UserDataContext";
import { profilePictures } from "../assets/ProfilePictures";
import EllipseLoader from "../components/EllipsesLoading";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  const { userData, loading: userDataLoading } = useUserData();
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    if (user) {
      const cUser = user;
      async function getData() {
        const eventsSnap = await getDocs(
          collection(db, "users", cUser.uid, "events"),
        );
        setEvents(
          eventsSnap.docs.map((d) => ({
            //Someone make an a type for this
            id: d.id,
            title: d.data().title,
            date: d.data().date,
            hours: d.data().hours,
            status: d.data().status,
          })),
        );
      }
      getData();
    }
  }, [user]);

  if (loading || userDataLoading) return <EllipseLoader></EllipseLoader>;
  if (!userData)
    return (
      <p className="flex h-screen items-center justify-center gap-2 text-gray-500 text-xl">
        Please sign in to view your dashboard.
      </p>
    );

  const renderCards = () => {
    const filtered = events.filter((o: any) => o.status === activeTab);
    if (filtered.length === 0)
      return <p className="text-[#020079]">You have no {activeTab} events</p>;
    return filtered.map((opportunity: any) => (
      <div
        key={opportunity.id}
        className="min-h-52 rounded-2xl border border-gray-200 bg-gray-100 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-7 lg:min-h-56"
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
    ));
  };

  const completeTextColor =
    activeTab === "completed"
      ? "text-[#020079]"
      : "text-gray-400 hover:text-[#020079]";

  const upcomingTextColor =
    activeTab === "upcoming"
      ? "text-[#020079]"
      : "text-gray-400 hover:text-[#020079]";

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12 xl:px-24">
      <div className="mx-auto w-full max-w-7xl">
        <section className="flex items-center gap-6 sm:gap-8">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
            <span className="text-4xl text-[#020079] sm:text-5xl">
              <img src={profilePictures[userData.pfpChoice]} alt="" />
            </span>
          </div>

          {/*User info*/}
          <div>
            <h1 className="text-2xl font-bold text-[#020079] sm:text-3xl lg:text-4xl">
              {userData.displayName}
              {/*Pulling from database so help me? */}
            </h1>

            <div className="mt-2 space-y-1.5 text-sm sm:text-base lg:text-lg">
              <p className="text-gray-500">
                <span className="font-medium text-[#020079]">
                  Total Hours:{" "}
                </span>
                {userData.totalHours + " hours"}
                {/*I dont know how to pull user info. Anirvinya help meeeee*/}
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
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#020079]" />
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
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#020079]" />
                )}
                {/*underline section for the active tab*/}
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className=" mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {/*Going through the array of opportunities*/}
            {renderCards()}
          </div>
        </section>
      </div>
    </main>
  );
}
