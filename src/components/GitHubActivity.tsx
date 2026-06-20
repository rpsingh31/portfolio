"use client";

import dynamic from "next/dynamic";

// Empty → busiest, ramped across the site's violet → magenta → crimson spectrum.
const THEME = {
  dark: ["#10121b", "#4a3a8f", "#7b4dff", "#b94dff", "#ff3b5c"] as [
    string,
    string,
    string,
    string,
    string,
  ],
};

// Client-only: the calendar fetches its data in the browser, so server-
// rendering it produces HTML that can't match the client (hydration error).
// ssr:false renders it purely client-side; the skeleton reserves its space.
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((m) => ({ default: m.GitHubCalendar })),
  { ssr: false, loading: () => <div className="ghcal__skeleton" /> },
);

export default function GitHubActivity() {
  return (
    <div className="ghcal">
      <GitHubCalendar
        username="rpsingh31"
        colorScheme="dark"
        theme={THEME}
        blockSize={11}
        blockMargin={4}
        fontSize={13}
      />
    </div>
  );
}
