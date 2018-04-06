<template>
  <div>
      <h1>Edit admin</h1>
      <p :class="n">Admin path = {{n }}, int = {{b}}</p>
      <pre>{{ $route.params }}</pre>
  </div>
</template>

<script>
export default  {
  name: 'Foo',
  props: {
    n: {
      type: String,
      default: 'not set'
    },
    b: {
      type: Number,
      default: 69
    }
  }
}
