<template>
    <div class="container mt-5">
        <h2 class="createText"> 
            <Icon icon="mdi:create-new-folder-outline" />
            Create Availability 
                
            <RouterLink to="/" class="backButton">
                <button type="button" class="btn btn-dark" style="float :right" >
                    Back 
                    <Icon style="" icon="mdi:arrow-left" /> 
                </button>
            </RouterLink>
        </h2> 
        <form @submit.prevent="submitAvailability">
            <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control" id="date" v-model="date" required="true" />
            </div>
            <div class="mb-3">
                <label for="startTime" class="form-label">Start Time</label>
                <input type="time" class="form-control" id="startTime" v-model="startTime" />
            </div>
            <div class="mb-3">
                <label for="endTime" class="form-label">End Time</label>
                <input type="time" class="form-control" id="endTime" v-model="endTime" />
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </form>

        <!-- Bootstrap alert for date validation -->
        <div v-if="showDateValidationError" class="alert alert-danger mt-3">
            Start date must be before end date.
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    components: {
        Icon,
    },
    data() {
        return {
            date: "",
            startTime: "",
            endTime: "",
            showDateValidationError: false,
        };
    },
    methods: {
        async submitAvailability() {
            // Parse date, start time, and end time as Date objects
            const startDate = new Date(this.date);
            const start = new Date(`${this.date}T${this.startTime}:00`);
            const end = new Date(`${this.date}T${this.endTime}:00`);

            if (start < end) {
                const availability = {
                    start: start.toISOString(),
                    end: end.toISOString(),
                };

                const response = await fetch("http://localhost:8189/availability", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(availability),
                });

                if (response.ok) {
                    this.$router.push('/?success=true');
                    // Handle success, e.g., show a success message
                    console.log("Availability created successfully.");
                } else {
                    // Handle error, e.g., show an error message
                    console.error("Failed to create availability.");
                }
            } else {
                // Show date validation error if start date is not before end date
                this.showDateValidationError = true;
            }
        },
    },
};


</script>

<style scoped>
.createText {
    margin-bottom: 30px;
    color : rgb(0, 134, 65) ;

}

.backButton {
    float : right;
    text-decoration: none ;
    color : white; 
    font-weight: 800px; 
    font-size: 16px; 
}
</style>
