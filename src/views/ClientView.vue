<template>
    <div class="container">
            <div class="container"> 
            <div v-if="success" class="msgSuccess"> 
                <div class="alert alert-success" role="alert">
                    <Icon icon="material-symbols:check" />
                    Availability added successfully !
                </div>
            
            </div>
          </div>

            <h2 class="firstText">
                
                Hi again ! 
            </h2>
            <div style="margin-bottom: 30px;">
                    Please book a reservation corresponding to a Abdelaziz's availability.
            </div>

            
            <div class="row">
                <div class="col-md-4" v-for="availability in availabilities" :key="availability.id">

                    <availability-card  :availability="availability" />
                 
                </div>
            </div>
        </div>
</template>


<script>
import { Icon } from '@iconify/vue';
import AvailabilityCard from '../components/AvailabilityCard.vue';
export default {
    
    data() {
        return {
            availabilities: [], 
        };
    },
    mounted() {
        this.fetchAvailabilities();
        this.$watch('availabilities', () => {
            this.sortAvailabilities();
        });
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

        sortAvailabilities() {
            this.availabilities.sort((a, b) => {
                const dateA = new Date(a.start);
                const dateB = new Date(b.start);
                return dateA - dateB;
            });
        },
    },
    components: {
        Icon,
        AvailabilityCard
    },
}
</script>


<style scoped>
    .firstText {
        margin-top: 40px;
        margin-bottom: 10px;
        color : rgb(255, 126, 6) ;
    }
</style>
