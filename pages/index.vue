<template>
  <div>Home!!!</div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware(context) {
    return context.redirect({ name: 'lang-home', params: { lang: 'TW' } })
  }
}
</script>
