<script>
import Cat from "../components/Cat.vue";
import AddCat from "../components/AddCat.vue";

export default {
    name: "Main",

    components: {
        Cat,
        AddCat
    },

    data() {
        return {
            cats: [

            ]
        }
    },

    methods: {
        async getCats() {
            
            const response = await fetch("http://localhost:3000/cats", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            this.cats = data;
        }
    },

    mounted() {
        this.getCats();
    }
}
</script>


<template>

<div id="maincontent">

    <div class="divbox">
        <h2>Registrera katt</h2>

        <AddCat @catAdded="getCats()" />
    </div>

    <div class="divbox">
        <h2 class="center-align">Registrerade katter</h2>

        <div id="cat-list">
            <!-- Loop through cats -->
            <Cat v-for="cat in cats" :cat="cat" :key="cat._id" />
        </div>
    </div>

</div>

</template>


<style scoped>

#cat-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 20px;
}

</style>