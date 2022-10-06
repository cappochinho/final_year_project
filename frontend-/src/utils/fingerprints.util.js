import axios_instance from './axios.utils';

const getFingerprintList = async () => {
  return await axios_instance.get('fingerprints/');
};

const getFingerprintData = async (id) => {
  return await axios_instance.get(`fingerprints/${id}/`);
};

const addFingerprint = async (data) => {
  return await axios_instance.post('fingerprints/', data);
};

const updateFingerprint = async (data) => {
  return await axios_instance.patch(`fingerprints/${data.id}/`, data);
};

const getLatestFingerprint = async () => {
  return await axios_instance.get(`fingerprints/latest/`);
}

const FingerprintService = {
  getFingerprintList,
  getFingerprintData,
  addFingerprint,
  updateFingerprint,
  getLatestFingerprint
};

export default FingerprintService;
