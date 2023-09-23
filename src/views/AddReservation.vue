<template>
    <div class="container mt-5">
        <h1>
            Add Reservation
            <RouterLink to="/client" class="backButton">
                <button type="button" class="btn btn-dark" style="float: right">
                    Back
                    <Icon style="" icon="mdi:arrow-left" />
                </button>
            </RouterLink>
        </h1>
        <p>
            <Icon icon="clarity:date-line" />
                    Available at {{ extractDate(availability.start) }}
        </p>
        <p class="card-text" style="margin-top: 20px">
            <Icon icon="ri:time-line" />
             From {{ extractTime(availability.start) }}
        </p>

        <p class="card-text">
            <Icon icon="ri:time-fill" />
            To {{ extractTime(availability.end) }}
        </p>

        <hr>

        <div v-if="error" class="alert alert-danger">
            Start time must be before end time.
        </div>
        <form @submit.prevent="submitReservation">
            <div class="mb-3">
                <label for="start" class="form-label">Start Time</label>
                <input type="datetime-local"  required="true" class="form-control" id="start" v-model="reservation.start"
                    :min="availability.start" :max="availability.end" />
            </div>
            <div class="mb-3">
                <label for="end" class="form-label">End Time</label>
                <input type="datetime-local" required="true" class="form-control" id="end" v-model="reservation.end"
                    :min="availability.start" :max="availability.end" />
            </div>
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" required="true" class="form-control" id="title" v-model="reservation.title" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" required="true" class="form-control" id="email" v-model="reservation.email" />
            </div>
            <!-- <div class="mb-3">
                <label for="email" class="form-label">Note</label>
                <textarea class="form-control" v-model="note"> </textarea>
            </div> -->
            <button type="submit" class="btn btn-primary">Add Reservation</button>

            
        </form>
            <!-- <button @click="generateNote" class="btn btn-success" style="margin-right : 10px">Generate Note</button>

        {{ generatedText }} -->
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import axios from 'axios';


export default {
    data() {
        return {
            reservation: {
                start: "",
                end: "",
                title: "",
                email: "",
            },
            availability: null, // Initialize availability as null
            error: false,
            generatedText: "",
            note : ""
        };
    },
    async created() {
        // Fetch availability based on the query parameter (id)
        const availabilityId = this.$route.query.availabilityId;
        if (availabilityId) {
            try {
                const response = await fetch(`http://localhost:8189/availability/${availabilityId}`);
                if (response.ok) {
                    const data = await response.json();
                    this.availability = data;
                } else {
                    console.error("Failed to fetch availability.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    },
    methods: {
        async submitReservation() {
            if (!this.availability) {
                // Availability is not loaded yet, prevent submission
                return;
            }

            // Validate start and end times
            const startTime = new Date(this.reservation.start);
            const endTime = new Date(this.reservation.end);

            if (
                startTime >= endTime ||
                startTime < new Date(this.availability.start) ||
                endTime > new Date(this.availability.end)
            ) {
                this.error = true;
                return;
            }

            try {
                const response = await fetch("http://localhost:8189/reservations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.reservation),
                });

                if (response.ok) {
                    this.$router.push('/reservations?successAdd=true');

                } else { 
                    console.error("Failed to add reservation.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },


        async generateNote() {

            try {
                const response = await axios.post(
                    "https://api.openai.com/v1/engines/davinci-codex/completions",
                    {
                        prompt: this.note, // Use the note as the prompt
                        max_tokens: 50, // Adjust as needed
                    },
                    {
                        headers: {
                            "Authorization": "Bearer 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", // Replace with your API key
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.choices.length > 0) {
                    // Extract and store the generated text
                    this.generatedText = response.data.choices[0].text;
                }
            } catch (error) {

            }


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

<style scoped></style>
