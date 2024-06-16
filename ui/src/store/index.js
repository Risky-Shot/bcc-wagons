import { createStore } from "vuex";

export default createStore({
  state: {
    currencyType: 2,
    myWagons: null,
    wagons: null,
    shopName: null,
    activeWagon: null,

    comps: null,
    compCashPrice: 0,
    compGoldPrice: 0,
    showCompPrice: false,
    allowSave: false,
  },
  getters: {},
  mutations: {
    SET_MY_WAGONS(state, payload) {
      state.myWagons = payload;
    },
    SET_WAGONS(state, payload) {
      state.wagons = payload;
    },
    SET_SHOP_NAME(state, payload) {
      state.shopName = payload;
    },
    SET_ACTIVE_WAGON(state, payload) {
      state.activeWagon = payload;
    },
    SET_CURRENCY_TYPE(state, payload) {
      state.currencyType = payload;
    },

    //CUSTOMIZATION
    SET_COMPONENTS(state, payload) {
      console.log(payload);
      state.comps = payload;
    },
    SET_COMP_CASH_PRICE(state, payload) {
      state.compCashPrice = payload;
    },
    SET_COMP_GOLD_PRICE(state, payload) {
      state.compGoldPrice = payload;
    },
    SET_SHOW_COMP_PRICE(state, payload) {
      state.showCompPrice = payload;
    },
    SET_ALLOW_SAVE(state, payload) {
      state.allowSave = payload;
    },
  },
  actions: {
    setMyWagons(context, payload) {
      context.commit("SET_MY_WAGONS", payload);
    },
    setWagons(context, payload) {
      context.commit("SET_WAGONS", payload);
    },
    setShopName(context, payload) {
      context.commit("SET_SHOP_NAME", payload);
    },
    setSelectedWagon(context, payload) {
      context.commit("SET_ACTIVE_WAGON", payload);
    },
    setCurrencyType(context, payload) {
      context.commit("SET_CURRENCY_TYPE", payload);
    },

    setComponents(context, payload) {
      context.commit("SET_COMPONENTS", payload);
    },
    setCompCashPrice(context, payload) {
      context.commit("SET_COMP_CASH_PRICE", payload);
    },
    setCompGoldPrice(context, payload) {
      context.commit("SET_COMP_GOLD_PRICE", payload);
    },
    setShowCompPrice(context, payload) {
      context.commit("SET_SHOW_COMP_PRICE", payload);
    },
    setAllowSave(context, payload) {
      context.commit("SET_ALLOW_SAVE", payload);
    },
  },
  modules: {},
});
