import { useProjectsStore } from '../state/profileStore.ts';
import { useState, Activity } from 'react';

export function FiltersComponent() {
  const { setFilters,  } = useProjectsStore();
  const [isLatestEnabled, setIsLatestEnabled] = useState(false);

  const handleProjectsToggle = (enabled: boolean) => {
    setIsLatestEnabled(enabled);

    if (enabled) {
      // When on: add latest query to zustand store
      setFilters({
        latest: true,
        limit: 10,
        page: 1,
      });
    } else {
      // When off: clear all queries
      setFilters(undefined);
    }
  };

  return (
    <div className="filters-component">
      <label>
        <input
          type="checkbox"
          checked={isLatestEnabled}
          onChange={(e) => handleProjectsToggle(e.target.checked)}
        />
        Latest Projects
      </label>
      <Activity mode={isLatestEnabled ? "hidden" : "visible"}>
        <span className="date-label">
          {new Date().getTime().toLocaleString("en-US")}
        </span>
      </Activity>

      <style>{`
        .date-label { display: block; margin-top: 1rem; }
      `}</style>
    </div>
  );
}


export default FiltersComponent;
