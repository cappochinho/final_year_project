import { useState, useEffect } from 'react';

import ProgrammeService from '../utils/programme.util';

export const useProgrammes = () => {
  const [isFetching, setFetching] = useState(false);
  const [programmes, setProgrammes] = useState(null);

  useEffect(() => {
    setFetching(true);
    ProgrammeService.getProgrammeList()
      .then((response) => {
        setProgrammes((prevData) => response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setFetching(false));
  }, []);

  return { isFetching, programmes };
};
