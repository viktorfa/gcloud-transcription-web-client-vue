<template>
  <div v-if="messages">
    <v-snackbar :value="true" v-for="(message, i) in messages" :key="i" bottom>
      {{message}}
      <v-btn color="pink" flat @click="handleCloseMessage(i)" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Messages",
  computed: {
    ...mapState(["messages"])
  },
  methods: {
    handleCloseMessage(i) {
      this.$store.commit("removeMessage", i);
    }
  }
};
</script>

<style>
</style>
