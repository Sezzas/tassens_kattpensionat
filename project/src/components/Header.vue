<script>
export default {
        name: "Header"
    }
</script>


<template>
    <RouterLink :to="{ name: 'home' }"><header>
        <h1>Tassens Kattpensionat</h1>
    </header></RouterLink>
</template>


<style scoped>
a {
    text-decoration: none;
}
</style>