const axios = require('axios');

const endpoints = {
  GetDrugsRxNorm: 'https://rxnav.nlm.nih.gov/REST/drugs.json?',
  GetSpellingRxNorm: 'https://rxnav.nlm.nih.gov/REST/Prescribe/spellingsuggestions.json?',
  GetDrugsOpenFDA: 'https://api.fda.gov/drug/ndc.json?',
};

const getDrugsByName = (name) => axios.get(endpoints.GetDrugs, { params: { name } });
const getSpellingSuggestion = (name) => axios.get(endpoints.GetSpelling, { params: { name } });

const getDrugsOpenFDA = (name, exact = false, limit = 50, skip = 1) => {
  const search = exact ? `generic_name.exact:"${name}"+OR+brand_name.exact:"${name}"&limit=${limit}&skip=${limit * skip}`
    : `generic_name:"${name}"+OR+brand_name:"${name}"&limit=${limit}&skip=${limit * skip}`;
  console.log(search);
  return axios.get(`${endpoints.GetDrugsOpenFDA}search=${search}`);
};

module.exports = {
  getDrugsByName,
  getSpellingSuggestion,
  getDrugsOpenFDA,
};
