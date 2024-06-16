<template>
    <CompMenuItem v-for="(comp, index) in comps" :label="index" :maxItems="Object.keys(comp).length" :wagonComps="comp" :key="index" />
    <CompCostDisplay :visible="showCompPrice" title="Price" />
</template>


<script>
import { mapState } from "vuex";
import CompMenuItem from "./CompMenuItem.vue";
import CompCostDisplay from "./CompCostDisplay.vue";
export default {
    name: "CompMenu",
    props: {},
    components: {
        CompMenuItem,
        CompCostDisplay
    },
    methods: {},
    computed: {
        ...mapState([
            "comps",
            "compCashPrice",
            "compGoldPrice",
            "showCompPrice",
            "allowSave",
        ]),
    },
    beforeUnmount() {
        this.$store.dispatch("setCompCashPrice", 0);
        this.$store.dispatch("setCompGoldPrice", 0);
        this.$store.dispatch("setShowCompPrice", false);
        this.$emit("toggleSave", false);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
