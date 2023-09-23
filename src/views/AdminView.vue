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
            <Icon icon="fluent-emoji:saluting-face" />
            Welcome back ! here are your availabilities.

            <RouterLink to="/addAvailability">
                <button type="button" class="btn btn-success buttonDelete"  >
                    Availability <Icon icon="bi:plus-circle-fill" />
                </button>
            </RouterLink>
            
        </h2>
        <div class="row">
            <div class="col-md-4" v-for="availability in availabilities" :key="availability.id">

                <availability-card :admin="true" :availability="availability" @delete-availability="deleteAvailabilityConfirmed" />
                 
            </div>
        </div>
    </div>
 
      
 

</template>


<script>
import { Icon } from '@iconify/vue';
import AvailabilityCard from '../components/AvailabilityCard.vue'; 

export default {
    props: {
        success: Boolean, 
    }, 
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
 

 
        openDeleteConfirmation(availability) {
            this.availabilityToDelete = availability;
            $('#deleteConfirmationModal').modal('show');
        },

        deleteAvailabilityConfirmed(availability) {
            const availabilityId = availability.id;
            fetch(`http://localhost:8189/availability/${availabilityId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.status === 204) { 
                        const index = this.availabilities.findIndex(
                            (availability) => availability.id === availabilityId
                        );
                        if (index !== -1) {
                            this.availabilities.splice(index, 1);
                        }
                        this.showDeleteConfirmation = false;  
                    } else {
                        console.error('Failed to delete availability. Status:', response.status);
                    }
                })
                .catch((error) => {
                    console.error('Error deleting availability:', error);
                });
            
        },

        
    },
    components: {
        Icon,
        AvailabilityCard
    },
};
</script>

<style scoped>
.firstText {
    margin-top: 40px;
    margin-bottom: 50px;
    color : rgb(0, 134, 65) ;
}


.msgSuccess {
    margin-top : 20px; 
    color: rgb(4, 190, 4);
    font-size : 20px;
}
</style>
