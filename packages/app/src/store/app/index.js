import state from "./state";
import * as getters from "./getters";
import { default as mutations } from "./mutations";
import { default as actions } from "./actions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
