import React, { useState, useEffect } from 'react';
import ProjectsGrid from '../components/Projects/ProjectsGrid';
// transition
import { transition } from '../assets/js/main.js';

// DEPRECATED
// NOT RELEVANT SINCE PROJECTS PAGES HAD TO BE SEPARATED TO GET ANIME TRANSITION WORK

export default function ProjectsPage(props) {
  useEffect(transition, []);

  // state for storing the filter keyword, with an initial value of null, which means no filter is applied
  const [currentFilter, setCurrentFilter] = useState(null);

  return (
    <ProjectsGrid
      data={props.data}
      column={props.column}
      currentFilter={currentFilter}
      setCurrentFilter={setCurrentFilter}
    />
  );
}
