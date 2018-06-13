<template>
  <ul class="breadcrumbs">
    <li>
      <nuxt-link :to="$vahi.path('/')">
        <v-icon color="primary">home</v-icon>
      </nuxt-link>
    </li>
    <li><v-icon small>chevron_right</v-icon></li>
    <template v-for="(c, index) in crumbs">
      <li :key="'title-'+index">
        <nuxt-link :to="c.to" :key="'link-'+index" v-if="typeof c.to !== 'undefined'">
          {{ c.title }}
        </nuxt-link>
        <span v-else>{{ c.title }}</span>
      </li>
      <li :key="'spacer-'+index">
        <v-icon :key="'chevron-'+index" small>chevron_right</v-icon></li>
    </template>
    <li class="current"><slot></slot></li>
  </ul>
</template>

<script>
export default {
  name: 'VahiBreadcrumbs',
  props: {
    mdCrumbs: {
      type: Array,
      default: () => { return [] }
    },
    crumbs: {
      type: Array,
      default: () => { return [] }
    }
  }
}
</script>

<style scoped>
a { text-decoration: none }
</style>
