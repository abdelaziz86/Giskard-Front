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
            <hr style="margin-top: 50px; margin-bottom: 40px;">
            <H4 >
                <Icon icon="solar:star-bold-duotone" style="color : rgb(255, 200, 0) ; font-size: 30px ;" /> 
                Add a special note 
            </H4>
            <div class="mb-3">
                <label for="email" class="form-label">Tell us what do you want to write</label>
                <textarea class="form-control" v-model="note" placeholder="Prompt text..."> </textarea>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">AI Generated Note</label>
                <textarea class="form-control" v-model="generatedText" placeholder="Output..." style="height : 200px ; background-color: rgb(238, 237, 237)">
                    {{ genratedText }}
                </textarea>
            </div>

            <a @click="generateNote" class="btn btn-success" :class="{disabled : aiClicked}">Generate Note</a>
            <button type="submit" class="btn btn-primary" style="margin-left : 10px" >Add Reservation</button>
        
            
            
        </form>

        

        <br>
        <br>
        <div v-if="error" class="alert alert-danger">
            Start time must be before end time.
        </div>

        <div v-if="aiMsg==1"  class="alert alert-danger">
            Enter a prompt text to generate an output.
        </div>
        <div v-if="aiMsg == 2"  class="alert alert-success">
            <Icon icon="material-symbols:check" />
            Your output has been generated successfully.
        </div>
 
    </div>
</template>

<script>
import { Icon } from '@iconify/vue'; 
import axios from "axios";


export default {
    data() {
        return {
            reservation: {
                start: "",
                end: "",
                title: "",
                email: "",
                note : ""
            },
            availability: null, // Initialize availability as null
            error: false,
            generatedText: "",
            note: "",
            aiMsg: 0,
            aiClicked : false
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

            this.reservation.note = this.generatedText ;   

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
            if (this.note == "") {
                this.aiMsg = 1
                return; 
            }
            this.aiClicked = true;
            try { 
                const options = {
                    method: "POST",
                    url: "https://api.edenai.run/v2/text/prompt_optimization",
                    headers: {
                        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGJlZDI0NTctOTI3OC00NmQ3LWE0OGMtZjMxMTVhMjZhNTliIiwidHlwZSI6ImFwaV90b2tlbiJ9.GmMLQhwNCFpHVQIXZpG7SC8wTj0U9HTllDsODUAmlII",
                    },
                    data: {
                        show_original_response: false,
                        fallback_providers: "",
                        providers: "openai",
                        text: this.note,
                        target_provider: "openai",
                    },
                };

                axios
                    .request(options)
                    .then((response) => {
                        this.generatedText = response.data["openai"]["items"][0]["text"];
                        console.log(response.data);
                        this.aiMsg = 2
                        this.aiClicked = false
                    })
                    .catch((error) => {
                        console.error(error);
                    });

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

<style scoped>
.disabled {
  color: gray;              /* Change the text color */
  pointer-events: none;     /* Disable click events */
  text-decoration: none;    /* Remove underline */
  cursor: not-allowed;      /* Change cursor to "not-allowed" */
}
</style>
