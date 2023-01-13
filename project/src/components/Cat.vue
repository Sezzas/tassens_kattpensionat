<script>
export default {
        name: "Cat",

        props: {
        cat: Object
        },

        data() {
            return {
                message: ""
            }
        },

        methods: {
            async deleteCat() {

                let id = this.cat._id;

                const response = await fetch("http://localhost:3000/cats/" + id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
                });

                const data = await response.json();

                location.reload();
            }
        }
    }
</script>


<template>
    
    <div class="catbox">

        <h3>{{ cat.name }}</h3>
        <p>{{ cat.gender }} | {{ cat.breed }} | {{ cat.age }} år | {{ cat.phonenumber }}<br />
        {{ cat.startdate }} - {{ cat.enddate }}</p>
        <button class="delete-btn" @click="deleteCat()">Radera</button>
        <RouterLink :to="{ name: 'update', params: {id: cat._id} }" class="update-btn">Ändra</RouterLink>

    </div>

</template>


<style scoped>
    h3 {
        margin-bottom: 0;
        margin-top: 0;
    }

    p {
        margin-top: 0;
    }

    .red-msg {
        color: rgb(192, 41, 41);
        font-weight: bold;
    }

    .catbox {
        background-color: rgb(241, 241, 241);
        border-radius: 20px;
        padding: 1.5em;
    }
</style>