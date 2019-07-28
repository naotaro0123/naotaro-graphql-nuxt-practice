<template>
  <section class="container">
    <div>
      <app-logo/>
      <div>
        <div>
          <span>表示するリポジトリ数</span>
          <input type="number" v-model.number="showNumber" style="width:40px">
        </div>
        <div v-if="$apollo.loading">Loading...</div>
        <table v-else border="1">
          <tr>
            <th>Repository Name</th>
            <th>Star Status</th>
          </tr>
          <tr v-for="repo in repos" :key="repo.id">
            <td>
              <a :href="repo.url">
                {{ repo.name }}
              </a>
            </td>
            <td>
              <span v-if="!repo.viewerHasStarred">
                <button type="button" @click="addStar(repo.id)">
                  add star
                </button>
              </span>
              <span v-if="repo.viewerHasStarred">
                <button type="button" @click="removeStar(repo.id)">
                  remove star
                </button>
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import getReposGql from '~/apollo/gql/getRepos.gql'
import addStarGql from '~/apollo/gql/addStar.gql'
import removeStarGql from '~/apollo/gql/removeStar.gql'

const DEFALT_SHOW_NUMBER = 3

export default {
  components: {
    AppLogo
  },
  data() {
    return {
      repos: [],
      showNumber: DEFALT_SHOW_NUMBER
    }
  },
  apollo: {
    repos: {
      query: getReposGql,
      variables() {
        return {
          number_of_repos: this.showNumber
        }
      },
      update: data => {
        return data.viewer.repositories.nodes
      }
    }
  },
  methods: {
    async addStar(starId) {
      const {data, error} = await this.$apollo.mutate({
        mutation: addStarGql,
        variables: {
          id: starId
        },
        refetchQueries: [{
          query: getReposGql,
          variables: {
            number_of_repos: DEFALT_SHOW_NUMBER
          }
        }]
      })

      if (error) {
        console.error(error)
      } else {
        console.log(data)
      }
    },
    async removeStar(starId) {
      const {data, error} = await this.$apollo.mutate({
        mutation: removeStarGql,
        variables: {
          id: starId
        },
        refetchQueries: [{
          query: getReposGql,
          variables: {
            number_of_repos: DEFALT_SHOW_NUMBER
          }
        }]
      })

      if (error) {
        console.error(error)
      } else {
        console.log(data)
      }
    },
  }
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

