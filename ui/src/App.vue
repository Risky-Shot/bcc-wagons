<template>
  <div id="content" v-if="visible || devmode">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      devmode: false,
      visible: false,

      debugData: {
        location : "VALENTINE",
        currencyType : 0,
        shopData: [
          { "name": "Buggies", "types": { "buggy02": { "goldPrice": 10, "cashPrice": 200, "label": "Buggy 2", "invLimit": 50 }, "buggy03": { "goldPrice": 12, "cashPrice": 250, "label": "Buggy 3", "invLimit": 50 }, "buggy01": { "goldPrice": 7, "cashPrice": 150, "label": "Buggy 1", "invLimit": 50 } } }, { "name": "Coaches", "types": { "coach3": { "goldPrice": 19, "cashPrice": 400, "label": "Coach 3", "invLimit": 100 }, "coach6": { "goldPrice": 14, "cashPrice": 300, "label": "Coach 6", "invLimit": 100 }, "coach5": { "goldPrice": 17, "cashPrice": 350, "label": "Coach 5", "invLimit": 100 }, "coach4": { "goldPrice": 14, "cashPrice": 300, "label": "Coach 4", "invLimit": 100 } } }, { "name": "Carts", "types": { "cart01": { "goldPrice": 22, "cashPrice": 450, "label": "Cart 1", "invLimit": 200 }, "cart02": { "goldPrice": 5, "cashPrice": 100, "label": "Cart 2", "invLimit": 200 }, "cart04": { "goldPrice": 26, "cashPrice": 550, "label": "Cart 4", "invLimit": 200 }, "huntercart01": { "goldPrice": 31, "cashPrice": 650, "label": "Hunter Cart", "invLimit": 200 }, "cart07": { "goldPrice": 19, "cashPrice": 400, "label": "Cart 7", "invLimit": 200 }, "cart06": { "goldPrice": 31, "cashPrice": 650, "label": "Cart 6", "invLimit": 200 }, "cart03": { "goldPrice": 22, "cashPrice": 450, "label": "Cart 3", "invLimit": 200 }, "cart08": { "goldPrice": 19, "cashPrice": 400, "label": "Cart 8", "invLimit": 200 } } }, { "name": "Wagons", "types": { "wagon02x": { "goldPrice": 60, "cashPrice": 1250, "label": "Wagon 2", "invLimit": 400 }, "supplywagon": { "goldPrice": 46, "cashPrice": 950, "label": "Supply Wagon", "invLimit": 400 }, "wagon05x": { "goldPrice": 51, "cashPrice": 1050, "label": "Wagon 5", "invLimit": 400 }, "chuckwagon000x": { "goldPrice": 73, "cashPrice": 1500, "label": "Chuck Wagon 1", "invLimit": 400 }, "wagon04x": { "goldPrice": 60, "cashPrice": 1250, "label": "Wagon 4", "invLimit": 400 }, "wagontraveller01x": { "goldPrice": 94, "cashPrice": 1950, "label": "Travel Wagon", "invLimit": 400 }, "wagon06x": { "goldPrice": 60, "cashPrice": 1250, "label": "Wagon 6", "invLimit": 400 }, "wagon03x": { "goldPrice": 51, "cashPrice": 1050, "label": "Wagon 3", "invLimit": 400 }, "chuckwagon002x": { "goldPrice": 73, "cashPrice": 1500, "label": "Chuck Wagon 2", "invLimit": 400 } } }
        ],
        myWagonsData : [
          {
            "id" : 1,
            "identifier" : "asdasdas",
            "charid" : 1,
            "selected" : 0,
            "name" : "Wagon 1",
            "model" : "coach6",
            "components": [0,0,0,0,0]
          },
          {
            "id": 2,
            "identifier": "asdasdas",
            "charid": 1,
            "selected": 1,
            "name": "Wagon 2",
            "model": "coach6",
            "components": [0,0,0,0,0]
          }
        ],
        customData: { "Propsets": [{ "goldPrice": 1, "cashPrice": 20, "hash": "0x127E0412" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x19C5E80C" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x20D4A0BF" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x269583CA" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x2A6D33E8" }], "Liveries": [{ "goldPrice": 1, "cashPrice": 20, "hash": "0x127E0412" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x19C5E80C" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x20D4A0BF" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x2286EE30" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x269583CA" }, { "goldPrice": 1, "cashPrice": 20, "hash": "0x2A6D33E8" }] },
      }
    }
  },
  mounted() {
    window.addEventListener("message", this.onMessage);

    if(this.devmode) {
      this.$store.dispatch("setWagons", this.debugData.shopData);
      this.$store.dispatch("setShopName", this.debugData.location);
      this.$store.dispatch("setCurrencyType", this.debugData.currencyType);
      this.$store.dispatch("setMyWagons", this.debugData.myWagonsData);
    }
  },
  unmounted() {
    window.removeEventListener("message", this.onMessage);
  },
  methods: {
    onMessage(event) {
      switch (event.data.action) {
        case "show":
          this.visible = true;
          this.$store.dispatch("setWagons", event.data.shopData);
          this.$store.dispatch("setShopName", event.data.location);
          this.$store.dispatch("setCurrencyType", event.data.currencyType);
          break;
        case "updateMyWagons":
          this.$store.dispatch("setMyWagons", event.data.myWagonsData);
          break;
        case "updateComps":
          this.$store.dispatch("setComponents",event.data.compData);
          break;
        case "hide":
          this.visible = false;
          this.$store.dispatch("setMyWagons", null);
          this.$store.dispatch("setWagons", null);
          this.$store.dispatch("setShopName", null);
          this.$store.dispatch("setComponents", null);
          this.$store.dispatch("setSelectedWagon", null);
          this.$store.dispatch("setCompCashPrice", 0);
          this.$store.dispatch("setCompGoldPrice", 0);
          this.$store.dispatch("setShowCompPrice", false);
          this.$store.dispatch("setAllowSave", false);
          this.$store.dispatch("setCurrencyType", 2);

          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss">
#content {
  overflow: hidden;
}
</style>
