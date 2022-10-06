import axios_instance from './axios.utils';

const getExamAttendanceList = async () => {
  return await axios_instance.get('attendances/exams/');
};

const getExamAttendanceData = async (id) => {
  return await axios_instance.get(`attendances/exams/${id}/`);
};

const addExamAttendance = async (data) => {
  return await axios_instance.post('attendances/exams/', data);
};

const updateExamAttendance = async (data) => {
  return await axios_instance.patch(`attendances/exams/${data.id}/`, data);
};

const ExamAttendanceService = {
  getExamAttendanceList,
  getExamAttendanceData,
  addExamAttendance,
  updateExamAttendance,
};

export default ExamAttendanceService;
