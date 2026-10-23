import { useState } from "react";

interface CompletionPanelProps {
  eventName: string;
  saving: boolean;
  onCancel: () => void;
  onSubmit: (completedAt: Date, hours: number) => void;
}

export default function CompletionPanel({ eventName, saving, onCancel, onSubmit }: CompletionPanelProps) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [hours, setHours] = useState("");

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(new Date(`${date}T12:00:00`), Number(hours));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) onCancel(); }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="completion-panel-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      >
        <h2 id="completion-panel-title" className="text-2xl font-bold text-[#020079]">Log completed event</h2>
        <p className="mt-2 text-sm text-gray-600">Enter the completion date and hours for {eventName}.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm font-medium text-gray-700">
            Date of completion
            <input
              type="date"
              required
              max={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#020079] focus:outline-none focus:ring-1 focus:ring-[#020079]"
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Number of hours
            <input
              type="number"
              required
              min="0.25"
              max="24"
              step="0.25"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              placeholder="e.g. 2.5"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#020079] focus:outline-none focus:ring-1 focus:ring-[#020079]"
            />
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} disabled={saving} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-lg bg-[#020079] px-4 py-2 text-sm font-medium text-white hover:bg-[#0021f3] disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? "Saving..." : "Save completion"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
