<script>
export default {

    data() {
        return {
            name: "",
            gender: "",
            breed: "",
            age: "",
            startdate: "",
            enddate: "",
            phonenumber: ""
        }
    },

    methods: {

        async getInfo() {

            let id = this.$route.params.id;

            const response = await fetch("http://localhost:3000/cats/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                    }
            });

            const data = await response.json();

            this.name = data.name;
            this.gender = data.gender;
            this.breed = data.breed;
            this.age = data.age;
            this.startdate = data.startdate;
            this.enddate = data.enddate;
            this.phonenumber = data.phonenumber;

        },

        async updateCat() {

            let id = this.$route.params.id;

            let CatBody = {
                name: this.name,
                gender: this.gender,
                breed: this.breed,
                age: this.age,
                startdate: this.startdate,
                enddate: this.enddate,
                phonenumber: this.phonenumber
            }

            const response = await fetch("http://localhost:3000/cats/" + id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(CatBody)
            });

            const data = await response.json();

            window.location.href = "/";

        }
    },

    mounted() {
        this.getInfo();
    }
}

</script>

<template>
  <main>

    <h2>Uppdatera information</h2>

    <!-- Form to update cat -->
    <form @submit.prevent="updateCat()" id="catform">
    
    <!-- Name -->
    <label for="name">Namn:</label><br />
    <input type="text" name="name" id="name" v-model="name" required><br />

    <!-- Gender -->
    <label for="gender">Kön:</label><br />
    <select name="gender" id="gender" v-model="gender" required>
        <option value="M">Hane</option>
        <option value="F">Hona</option>
    </select><br />

    <!-- Breed -->
    <label for="breed">Ras:</label><br />
    <input type="text" name="breed" id="breed" v-model="breed" required><br />

    <!-- Age -->
    <label for="age">Ålder (år):</label><br />
    <input type="number" name="age" id="age" v-model="age" required><br />

    <!-- Startdate -->
    <label for="startdate">Startdatum:</label><br />
    <input type="date" name="startdate" id="startdate" v-model="startdate" required><br />

    <!-- Enddate -->
    <label for="enddate">Slutdatum:</label><br />
    <input type="date" name="enddate" id="enddate" v-model="enddate" required><br />

    <!-- Phone number -->
    <label for="phonenumber">Ägarens telefonnummer:</label><br />
    <input type="number" name="phonenumber" id="phonenumber" v-model="phonenumber" required><br />

    <!-- Submit button -->
    <button class="submit-btn">UPPDATERA</button>

</form>

  </main>
</template>

<style scoped>
    input, select {
    margin-bottom: 5px;
    width: 300px;
    padding: 5px;
    margin-top: 2px;
    }

    .submit-btn {
        margin-top: 10px;
        padding: 1em;
        border: none;
        background-color: rgb(46, 46, 46);
        color: rgb(247, 247, 247);
        font-family: 'Roboto', sans-serif;
        transition-duration: 0.3s;
    }

    .submit-btn:hover {
        font-weight: bold;
        background-color: rgb(88, 88, 88);
    }
</style>
