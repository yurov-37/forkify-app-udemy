import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import serchView from './views/serchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = serchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResult(query);

    // 3) Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  serchView.addHandlerSerch(controlSearchResults);
};

init();
