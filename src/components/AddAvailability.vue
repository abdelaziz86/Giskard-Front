<template>
    <div class="container mt-5">
        <h1>Create Availability</h1>
        <form @submit.prevent="submitAvailability">
            <div class="mb-3">
                <label for="start" class="form-label">Start Date and Time</label>
                <input type="datetime-local" class="form-control" id="start" v-model="availability.start" />
            </div>
            <div class="mb-3">
                <label for="end" class="form-label">End Date and Time</label>
                <input type="datetime-local" class="form-control" id="end" v-model="availability.end" />
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            availability: {
                start: "",
                end: ""
            }
        };
    },
    methods: {
        async submitAvailability() {
            try {
                const response = await fetch("http://localhost:8189/availability", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.availability)
                });

                if (response.ok) {
                    // Handle success, e.g., show a success message
                    console.log("Availability created successfully.");
                } else {
                    // Handle error, e.g., show an error message
                    console.error("Failed to create availability.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
};
</script>

<style scoped></style>
