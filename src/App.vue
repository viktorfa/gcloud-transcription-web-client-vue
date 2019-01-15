<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Google Speech transkribering</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <AudioTranscript/>
    </v-content>
  </v-app>
</template>

<script>
import AudioTranscript from './components/AudioTranscript'

export default {
  name: 'App',
  components: {
    AudioTranscript
  },
  data () {
    return {
      //
    }
  }
}
</script>
