const SUCCESS_STATUS = 200;
const FAILURE_STATUS = 200;

export const respond = async (response, res) => {
  return res.status(response.success ? SUCCESS_STATUS : FAILURE_STATUS).json(response.json);
};
