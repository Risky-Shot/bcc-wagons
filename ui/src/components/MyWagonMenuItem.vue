<template>
  <div class="container">
    <div class="panel">
      <div class="panel-title" @click="[SelectWagon(), Expand()]">
        <h6 class="grey-text plus">
          <i
            class="fas fa-chevron-left center active-horse mr"
            v-if="isActive"
          ></i>
          {{ label }}
          <i
            class="fas fa-chevron-right center active-horse ml"
            v-if="isActive"
          ></i>
        </h6>
      </div>
    </div>
    <div v-if="isOpen" class="mb">
      <div></div>
      <div class="panel-myhorse item">
        <button class="item-myhorse" @click="RenameWagon()">Rename</button>
        <button class="item-myhorse" @click="SpawnWagon()">Spawn</button>
        <button class="item-myhorse" @click="toggleModal">Sell</button>
      </div>
      <div class=""></div>
    </div>
  </div>
  <ConfirmationModal :visible="showModal" title="Confirm" @close="toggleModal">
    <p style="text-align: center">Are you sure you want to sell?</p>
    <div class="divider-menu-top" style="margin-top: 1rem"></div>
    <div class="flex cta-wrapper">
      <button @click="SellWagon" class="modal-btn flex flex-auto">
        <img src="img/money.png" />Sell
      </button>
      <button @click="toggleModal" class="modal-btn flex flex-auto">
        Cancel
      </button>
    </div>
    <div class="divider-menu-bottom"></div>
  </ConfirmationModal>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";
import ConfirmationModal from "./ConfirmationModal.vue";

export default {
  name: "MyWagonMenuItem",
  props: {
    label: String,
    index: Number,
    model: String,
    components: Object,
    selected: Number,
    wagon: Object,
  },
  data() {
    return {
      showModal: false,
    };
  },
  emits: ["iExpanded"],
  computed: {
    ...mapState(["activeWagon"]),
    isOpen() {
      return this.index == this.selected;
    },
    isActive() {
      return this.activeWagon && this.index == this.activeWagon["id"];
    },
  },
  methods: {
    Expand() {
      if (!this.isOpen) {
        this.$emit("iExpanded", this.index);
      }
    },
    SelectWagon() {
      if (!this.isOpen) {
        this.$store.dispatch("setSelectedWagon", this.wagon);
        api
          .post("SelectWagon", {
            WagonId: this.index,
          })
          .catch((e) => {
            console.log(e.message);
          });

        api
          .post("LoadMyWagon", {
            WagonId: this.index,
            WagonModel: this.model,
            WagonComp: JSON.stringify(this.components),
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    },
    RenameWagon() {
      api
        .post("RenameWagon", {
          WagonId: this.index,
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    SellWagon() {
      api
        .post("SellWagon", {
          WagonId: this.index,
          WagonModel: this.model,
          WagonName: this.label,
        })
        .catch((e) => {
          console.log(e.message);
        });
      this.showModal = false;
    },
    SpawnWagon() {
      api
        .post("SpawnInfo", {
          WagonId: this.index,
          WagonModel: this.model,
          WagonName: this.label,
          WagonComp: JSON.stringify(this.components),
        })
        .catch((e) => {
          console.log(e.message);
        });

      api
        .post("CloseMenu", {
          MenuAction: "Close",
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
  components: {
    ConfirmationModal,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 96%;
  margin: auto;
  overflow: hidden;
}
.mb {
  margin-bottom: 0.25rem;
}
.panel {
  padding: 0px !important;
  margin: 3px 10px !important;
  border-radius: 0px;
  width: calc(100% - 20px) !important;
  background-color: transparent;
  overflow: hidden;
  background: url("/public/img/input.png");
  background-size: 100% 100%;
}

.panel-title {
  background-size: 100% 100%;
  padding: 10px 10px !important;
  font-size: 1.5em;
  font-weight: 400;
  text-align: center;
}

.panel-title .grey-text {
  color: #9e9e9e;
  margin: 0;
  margin-top: 5px;
  margin-bottom: 5px;
}

.panel-myhorse.item {
  width: calc(100% - 60px) !important;
  background-image: url("/public/img/input.png"), url("/public/img/input.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: auto;
}

.item {
  display: flex;
  justify-content: left;
  padding: 3px 3px !important;
}

.item-myhorse {
  /*height: 3vh;*/
  border: 0px #fff solid;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 3px !important;
  width: 50%;
  margin: auto;
  color: #9e9e9e;
  text-align: center;
}

.item-myhorse:hover {
  background: url("/public/img/buttonv.png");
  background-size: 90% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: #f0f0f0 !important;
}

.grey-text.plus:hover {
  color: #f0f0f0;
}

.active-horse {
  color: #d89a2e;
  font-size: 12px;
}

.mr {
  margin-right: 5px;
}

.ml {
  margin-left: 5px;
}
.flex {
  display: flex;
}
.flex-auto {
  flex: 1 1 auto;
}
.modal-btn {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #f0f0f0;
  user-select: none;
  text-align: left;
  width: 75px;
  letter-spacing: 0.5px;
  -webkit-transition: background-color 0.2s ease-out;
  transition: background-color 0.2s ease-out;
  border: 0px #fff solid;
}
.modal-btn:hover {
  background: url("/public/img/buttonv.png");
  background-size: 90% 100%;
  background-repeat: no-repeat;
  background-position: right;
  border-radius: 0px;
}
.cta-wrapper {
  background: url("/public/img/input.png");
  background-position: center;
  background-size: 100% 100%;
  height: 4vh;
}

.divider-menu-top,
.divider-menu-bottom {
  width: 90%;
  height: 4px;
  margin: auto auto;
  background-image: url("/public/img/divider_line.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  opacity: 0.6;
}

.divider-menu-top {
  margin-bottom: 10px;
}

.divider-menu-bottom {
  margin-top: 10px;
}
</style>
