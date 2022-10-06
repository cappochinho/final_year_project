import axios_instance from './axios.utils';

const getProgrammeList = async () => {
  return await axios_instance.get('programmes/');
};

const getProgrammeData = async (id) => {
  return await axios_instance.get(`programmes/${id}`);
};

const addProgramme = async (data) => {
  return await axios_instance.post('programmes/', data);
};

const ProgrammeService = {
  getProgrammeList,
  getProgrammeData,
  addProgramme,
};

export default ProgrammeService;
