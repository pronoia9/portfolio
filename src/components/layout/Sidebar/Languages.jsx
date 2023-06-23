import { Progress } from '../..';

import { dataStore } from '../../../store/dataStore';

export const Languages = () => {
  const data = dataStore((state) => state.sidebar.languages);
  return (
    <div className='art-lang-skills p-30-15'>
      {data.map((language, index) => (
        <LanguagesItem key={`sidebar-language-${index}`} {...language} index={index} />
      ))}
    </div>
  );
};

export const LanguagesItem = (props) => {
  return (
    <div className='art-lang-skills-item'>
      <Progress {...props} type='circle' />
      <h6>{props.language}</h6>
    </div>
  );
};
