import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useUserData } from "../context/UserDataContext";
import { profilePictures } from "../assets/ProfilePictures";
import EllipseLoader from "../components/EllipsesLoading";
import type { OpportunityData } from "../OpportunityData";
import type { CompletedOpportunity } from "../UserData";
import CompletionPanel from "../components/CompletionPanel";
import DashboardStatistics from "../components/DashboardStatistics";
import { arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from "firebase/firestore";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  const { userData, loading: userDataLoading } = useUserData();
  const [completedEvents, setCompletedEvents] = useState<OpportunityData[]>([]);
  const [signedupEvents, setSignedupEvents] = useState<OpportunityData[]>([]);
  const [completingEventId, setCompletingEventId] = useState<string | null>(null);
  const [completionError, setCompletionError] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<OpportunityData | null>(null);
  const [unregisteringEventId, setUnregisteringEventId] = useState<string | null>(null);

  const markAsCompleted = async (completedAt: Date, hours: number) => {
    const eventId = selectedEvent?.id;
    if (!user || completingEventId) return;
    if (!eventId) return;
    setCompletingEventId(eventId);
    setCompletionError(false);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        opportunitiesSignedUp: arrayRemove(eventId),
        opportunitiesCompleted: arrayUnion({ opportunityId: eventId, completedAt, hours }),
        totalHours: increment(hours),
      });
      setSelectedEvent(null);
    } catch (error) {
      setCompletionError(true);
    } finally {
      setCompletingEventId(null);
    }
  };

  const unregisterFromEvent = async (eventId: string) => {
    if (!user || unregisteringEventId || completingEventId) return;
    setUnregisteringEventId(eventId);
    setCompletionError(false);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        opportunitiesSignedUp: arrayRemove(eventId),
      });
    } catch {
      setCompletionError(true);
    } finally {
      setUnregisteringEventId(null);
    }
  };


  useEffect(() => {
    //Change the type OpportunityData to a new one specifically for the dashboard. 
    async function fetchOpportunities(ids: string[] = []): Promise<OpportunityData[]> {
      const snaps = await Promise.all(
        ids.map((id) => getDoc(doc(db, "opportunities", id)))
      );
      return snaps
        .filter((s) => s.exists())
        .map((s) => {
          const d = s.data()!;
          return {
            id: s.id,
            locationName: d.locationName ?? d.name ?? "",
            description: d.description ?? "",
            types: d.types ?? (d.type ? [d.type] : []),
            location: d.location ?? "",
            daysAvailable: d.daysAvailable ?? "",
            ageRange: d.ageRange ?? "",
            compatibilityScore: 0,
          };
        });
    }
    async function fetchCompletedOpportunities(ops: CompletedOpportunity[] = []): Promise<OpportunityData[]> {
      const ids = ops.map((op) => op.opportunityId);
    const snaps = await Promise.all(
        ids.map((id) => getDoc(doc(db, "opportunities", id)))
      );
      return snaps
        .filter((s) => s.exists())
        .map((s) => {
          const d = s.data()!;
          return {
            id: s.id,
            locationName: d.locationName ?? d.name ?? "",
            description: d.description ?? "",
            types: d.types ?? (d.type ? [d.type] : []),
            location: d.location ?? "",
            daysAvailable: d.daysAvailable ?? "",
            ageRange: d.ageRange ?? "",
            compatibilityScore: 0,
          };
        });
    }
    if (!userData) return;
    fetchCompletedOpportunities(userData.opportunitiesCompleted).then(setCompletedEvents);
    fetchOpportunities(userData.opportunitiesSignedUp).then(setSignedupEvents);
  }, [userData]);
  
  if (loading || userDataLoading) {
    return <EllipseLoader></EllipseLoader>;
  }

  if (!userData)
    return (
      <p className="flex h-screen items-center justify-center gap-2 text-gray-500 text-xl">
        Please sign in to view your dashboard.
      </p>
    );

  const renderCards = () => {
    const events = activeTab === "completed" ? completedEvents : signedupEvents;
    if (events.length === 0)
      return <p className="text-[#020079]">You have no {activeTab} events</p>;

    return events.map((opportunity: OpportunityData) => (
      <div
        key={opportunity.id}
        className="min-h-52 rounded-2xl border border-gray-200 bg-gray-100 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-7 lg:min-h-56"
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
              {opportunity.locationName}
            </h2>
            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              {opportunity.daysAvailable}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-gray-600 sm:text-base">
              {opportunity.location}
            </span>
            {activeTab === "upcoming" && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(opportunity)}
                  disabled={completingEventId !== null || unregisteringEventId !== null}
                  className="rounded-lg bg-[#020079] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0021f3] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {completingEventId === opportunity.id ? "Saving..." : "Mark completed"}
                </button>
                <button
                  type="button"
                  onClick={() => unregisterFromEvent(opportunity.id)}
                  disabled={unregisteringEventId !== null || completingEventId !== null}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {unregisteringEventId === opportunity.id ? "Unregistering..." : "Unregister"}
                </button>
              </div>
            )}
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
          {completionError && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              Could not update this event. Please try again.
            </p>
          )}
        </section>
        <DashboardStatistics
          totalHours={userData.totalHours}
          completedEvents={completedEvents.length}
          upcomingEvents={signedupEvents.length}
          completionRecords={userData.opportunitiesCompleted ?? []}
        />
      </div>
      {selectedEvent && (
        <CompletionPanel
          eventName={selectedEvent.locationName}
          saving={completingEventId !== null}
          onCancel={() => setSelectedEvent(null)}
          onSubmit={markAsCompleted}
        />
      )}
    </main>
  );
}
