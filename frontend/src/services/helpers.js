const doAction = onCall => data => {
  onCall(data);
  return data;
};
