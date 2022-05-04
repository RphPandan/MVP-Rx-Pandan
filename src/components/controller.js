/* eslint-disable camelcase */

const axios = require('axios');

const endpoints = {
  GetDrugsRxNorm: 'https://rxnav.nlm.nih.gov/REST/drugs.json?',
  GetSpellingRxNorm: 'https://rxnav.nlm.nih.gov/REST/Prescribe/spellingsuggestions.json?',
  GetDrugsOpenFDA: 'https://api.fda.gov/drug/ndc.json?',
  SubmitRx: 'http://localhost:2022/Rx/Submit',
  test: 'http://localhost:2022/test',
};
const test = () => axios.get(endpoints.test);

const getDrugsByName = (name) => axios.get(endpoints.GetDrugs, { params: { name } });
const getSpellingSuggestion = (name) => axios.get(endpoints.GetSpelling, { params: { name } });

const getDrugsOpenFDA = (name, exact = false, limit = 50, skip = 0) => {
  const search = exact ? `generic_name.exact:"${name}"+OR+brand_name.exact:"${name}"&limit=${limit}&skip=${limit * skip}&sort="asc"`
    : `generic_name:"${name}"+OR+brand_name:"${name}"&limit=${limit}&skip=${limit * skip}`;
  return axios.get(`${endpoints.GetDrugsOpenFDA}search=${search}`);
};

const submitRxToList = (rx) => axios.post(endpoints.SubmitRx, rx);

const filterAndModifyDrugList = (arrayOfDrugs, setDosageForms) => {
  const hash = {};
  const dosageFormHash = {};
  const format = (active_ingredients) => {
    const ingredients = [];
    const dosage = [];
    active_ingredients.forEach((ingredient) => {
      ingredients.push(ingredient.name);
      let { strength } = ingredient;
      const index1 = strength.lastIndexOf('/1');
      if (index1 === strength.length - 2) {
        strength = strength.slice(0, index1);
      }
      dosage.push(strength);
    });
    const result = `${ingredients.join('/')} - ${dosage.join('/')}`;
    return result;
  };
    // active_ingredients
    //   .map((ingredient) => (`${ingredient.name} | ${ingredient.strength}`))
    //   .join(' || ')

  const newListOfDrugs = arrayOfDrugs.filter((drug) => {
    const {
      product_ndc, active_ingredients, dosage_form,
    } = drug;
    if (!dosageFormHash[dosage_form]) {
      dosageFormHash[dosage_form] = 1;
    } else {
      dosageFormHash[dosage_form] += 1;
    }

    if (Array.isArray(active_ingredients)) {
      if (active_ingredients.length > 0) {
        const formattedIngredients = format(active_ingredients);
        if (!(hash[formattedIngredients])) {
          hash[formattedIngredients] = formattedIngredients;
          if (!(hash[product_ndc])) {
            hash[product_ndc] = product_ndc;
            return true;
          }
        }
      }
    }
    return false;
  });

  // console.log(newListOfDrugs, 'this is newList of drugs');

  newListOfDrugs.map((drug) => {
    const { active_ingredients } = drug;
    const formatted = drug;
    formatted.active_ingredients = `${format(active_ingredients)} ${drug.dosage_form}`;
    return formatted;
  });
  setDosageForms(Object.keys(dosageFormHash).map((key) => {
    const object = { count: dosageFormHash[key], dosageForm: key };
    return object;
  }).sort((a, b) => b.count - a.count));
  return newListOfDrugs;
};

module.exports = {
  getDrugsByName,
  getSpellingSuggestion,
  getDrugsOpenFDA,
  filterAndModifyDrugList,
  submitRxToList,
  test,
};
