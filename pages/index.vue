<template>
  <section class="container">
    <div>
      <app-logo/>
      <div>
        表示する行
        <input type="number" v-model="showNumber">
      </div>
      <ul>
        <li v-for="node in viewer.repositories.nodes" :key="node.id">
          <a :href="node.url">
            {{ node.name }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import getReposGql from '~/apollo/gql/getRepos.gql'

export default {
  components: {
    AppLogo
  },
  data() {
    return {
      viewer: {
        repositories: {
          nodes: []
        }
      },
      showNumber: 3
    }
  },
  apollo: {
    viewer: {
      query: getReposGql,
      variables() {
        return {
          number_of_repos: Number(this.showNumber)
        }
      }
    }
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

