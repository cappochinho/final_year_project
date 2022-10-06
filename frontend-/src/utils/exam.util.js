import axios_instance from './axios.utils';

const getExamList = async () => {
  return await axios_instance.get('exams/');
};

const getExamData = async (id) => {
  return await axios_instance.get(`exams/${id}/`);
};

const addExam = async (data) => {
  return await axios_instance.post('exams/', data);
};

const updateExam = async (data) => {
  return await axios_instance.patch(`exams/${data.id}/`, data);
};

const ExamService = {
  getExamList,
  getExamData,
  addExam,
  updateExam,
};

export default ExamService;
