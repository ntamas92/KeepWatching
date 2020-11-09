<template>
  <div id="searchForm">
    <typeahead
      v-model="searchText"
      :data="searchResults"
      :serializer="(s) => s.title"
    >
      <template slot="suggestion" slot-scope="{ data, htmlText }">
        <div class="d-flex align-items-center">
          <img :src="data.poster_path" style="height: 80px" />

          <!-- Note: the v-html binding is used, as htmlText contains
         the suggestion text highlighted with <strong> tags -->
          <span class="ml-4" v-html="htmlText" />
        </div>
      </template>
    </typeahead>
  </div>
</template>

<script>
import axios from "axios";
import typeahead from "vue-bootstrap-typeahead";

export default {
  data() {
    return {
      searchText: "",
      searchResults: [],
    };
  },
  components: {
    typeahead,
  },
  watch: {
    searchText: function (newText) {
      this.getSuggestions(newText)
        .then((x) => (this.searchResults = x))
        .catch((error) => {
          this.searchResults = ["error, could not reach the api", error];
        });
    },
  },
  methods: {
    getSuggestions: function (searchText) {
      const uri = `http://localhost:5000/api/search/suggestions?title=${searchText}`;

      return axios.get(uri).then((x) => x.data);
    },
  },
};
</script>

<style>
</style>