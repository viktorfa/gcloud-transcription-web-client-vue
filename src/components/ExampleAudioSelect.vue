<template>
  <v-select :items="items" v-model="selectedAudio" label="Velg et lydklipp"></v-select>
</template>

<script>
export default {
  name: "ExampleAudioSelect",
  computed: {
    items() {
      return this.$store.state.exampleAudioOptions.map(({ name, id }) => ({
        text: name,
        value: id
      }));
    },
    selectedAudio: {
      get() {
        const { id, name } = this.$store.state.selectedAudio;
        return { value: id, text: name };
      },
      set(newValue) {
        this.$store.dispatch("SET_EXAMPLE_AUDIO", { index: newValue });
      }
    }
  }
};
</script>

<style>
</style>
