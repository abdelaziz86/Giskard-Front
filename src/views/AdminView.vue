<template>
    <div class="container">
        <h1 class="firstText">
            <Icon icon="fluent-emoji:saluting-face" />
            Welcome back ! here are your availabilities.
        </h1>
        <div class="row">
            <div class="col-md-4" v-for="availability in availabilities" :key="availability.id">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Day: {{ extractDate(availability.start) }}</h5>
                        <p class="card-text">Start Time: {{ extractTime(availability.start) }}</p>
                        <p class="card-text">End Time: {{ extractTime(availability.end) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
    data() {
        return {
            availabilities: [],
        };
    },
    mounted() {
        this.fetchAvailabilities();
    },
    methods: {
        fetchAvailabilities() {
            fetch('http://localhost:8189/availability')
                .then((response) => response.json())
                .then((data) => {
                    this.availabilities = data;
                })
                .catch((error) => {
                    console.error('Error fetching availabilities:', error);
                });
        },


        extractDate(dateTimeString) {
            const date = new Date(dateTimeString);
            return date.toLocaleDateString();  
        },

        
        extractTime(dateTimeString) {
            const date = new Date(dateTimeString);
            return date.toLocaleTimeString(); 
        },

        
    },
    components: {
        Icon,
    },
};
</script>

<style scoped>
.firstText {
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>
