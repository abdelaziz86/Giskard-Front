<template>
    <div class="container">
        <h2 class="firstText">
            <Icon icon="fluent-emoji:saluting-face" />
            Welcome back ! here are your availabilities.

            <RouterLink to="/addAvailability">
                <button type="button" class="btn btn-success buttonDelete" >
                    Add <Icon icon="bi:plus-circle-fill" />
                </button>
            </RouterLink>
            
        </h2>
        <div class="row">
            <div class="col-md-4" v-for="availability in availabilities" :key="availability.id">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Day: {{ extractDate(availability.start) }}
                        
                        <button type="button" class="btn btn-danger buttonDelete" @click="deleteAvailabilityConfirmed(availability)"  data-target="#deleteConfirmationModal">
                            <Icon icon="bi:trash-fill" :horizontalFlip="true" />
                        </button>


                        </h5>
                        <p class="card-text">Start Time: {{ extractTime(availability.start) }}</p>
                        <p class="card-text">End Time: {{ extractTime(availability.end) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>



     <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm Deletion</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this availability?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" @click="deleteAvailabilityConfirmed">Delete</button>
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
    color : rgb(34, 158, 34) ;
}

.buttonDelete {
    float : right ; 
    font-size : 15px; 
}
</style>
