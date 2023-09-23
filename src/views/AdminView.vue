<template>
    <div class="container">
        <div class="container">
        <!-- ... Your existing content ... -->
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
                <div class="card cardItem">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Icon icon="clarity:date-line" />
                            Day: {{ extractDate(availability.start) }}
                        
                        <button type="button" class="btn btn-danger buttonDelete" @click="deleteAvailabilityConfirmed(availability)"  data-target="#deleteConfirmationModal">
                            <Icon icon="bi:trash-fill" :horizontalFlip="true" />
                        </button>


                        </h5>
                        <p class="card-text" style="margin-top : 30px">
                            <Icon icon="ri:time-line" />
                            Start  {{ extractTime(availability.start) }}
                        </p>

                        <p class="card-text">
                            <Icon icon="ri:time-fill" />
                            End  {{ extractTime(availability.end) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
 
      
 

</template>


<script>
import { Icon } from '@iconify/vue'; 
export default {
    props: {
        success: Boolean, // Define the "success" prop
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
                // Convert the start attributes to Date objects for comparison
                const dateA = new Date(a.start);
                const dateB = new Date(b.start);

                // Compare the dates and return the result
                return dateA - dateB;
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

 
        openDeleteConfirmation(availability) {
            this.availabilityToDelete = availability;
            $('#deleteConfirmationModal').modal('show');
        },

        deleteAvailabilityConfirmed(availability) {
            console.log("test");  
            console.log("test2"); 
            // Call the API to delete the availability by its ID
            const availabilityId = availability.id;
            fetch(`http://localhost:8189/availability/${availabilityId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.status === 204) {
                        // Successful deletion, remove the availability from the list
                        const index = this.availabilities.findIndex(
                            (availability) => availability.id === availabilityId
                        );
                        if (index !== -1) {
                            this.availabilities.splice(index, 1);
                        }
                        this.showDeleteConfirmation = false; // Close the modal
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
    },
};
</script>

<style scoped>
.firstText {
    margin-top: 30px;
    margin-bottom: 30px;
    color : rgb(27, 153, 211) ;
}

.buttonDelete {
    float : right ; 
    font-size : 15px;
    margin-bottom: 20px ; 
}

.cardItem{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-bottom: 30px;
}

.msgSuccess {
    margin-top : 20px; 
    color: rgb(4, 190, 4);
    font-size : 20px;
}
</style>
