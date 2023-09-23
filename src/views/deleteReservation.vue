<template>
    <div class="container mt-5" style="height : 500px">
        <h1>Are you sure you want to delete this reservation?</h1>

        <!-- Display reservation details if available -->
        <div v-if="reservation">
            <p>
                <Icon icon="clarity:date-line" />
                Date: {{ extractDate(reservation.start) }}
            </p>
            <p>
                <Icon icon="ri:time-line" />
                Start Time: {{ extractTime(reservation.start) }}
            </p>
            <p>
                <Icon icon="ri:time-fill" />
                End Time: {{ extractTime(reservation.end) }}
            </p>
            <p>
                <span style="font-weight: 800;">
                    Title : 
                </span> {{ reservation.title }}
            </p> 
        </div>

        <!-- Client email input form -->
        <form @submit.prevent="deleteReservation">
            <div class="mb-3">
                <label for="clientEmail" class="form-label">Enter your email to confirm : </label>
                <input type="email" class="form-control" id="clientEmail" v-model="clientEmail" required />
            </div>
            <button type="submit" class="btn btn-danger">Delete Reservation</button>
        </form>

        <!-- Display delete confirmation or error message -->
        <div v-if="message" class="mt-3 alert" :class="messageType">
            {{ message }}
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
    data() {
        return {
            reservationId: this.$route.query.reservationId,
            reservation: null,
            clientEmail: "",
            message: null,
            messageType: null,
        };
    },
    async created() {
        // Fetch reservation details based on reservationId
        try {
            const response = await fetch(`http://localhost:8189/reservations/${this.reservationId}`);
            if (response.ok) {
                this.reservation = await response.json();
            } else {
                console.error("Failed to fetch reservation details.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    },
    methods: {
        extractTime(dateTimeString) {
            const date = new Date(dateTimeString);
            return date.toLocaleTimeString();
        },
        extractDate(dateTimeString) {
            const date = new Date(dateTimeString);
            return date.toLocaleDateString();
        },
        async deleteReservation() {
            try {
                const response = await fetch(
                    `http://localhost:8189/reservations/${this.reservationId}?email=${this.clientEmail}`,
                    {
                        method: "DELETE",
                    }
                );

                if (response.ok) {
                    this.$router.push('/reservations?success=true');    
                    this.message = "Reservation deleted successfully";
                    this.messageType = "alert-success";
                } else if (response.status === 404) {
                    this.message = "Reservation not found.";
                    this.messageType = "alert-danger";
                } else if (response.status === 403) {
                    this.message = "Invalid email address. Reservation not deleted.";
                    this.messageType = "alert-danger";
                } else {
                    this.message = "Incorrect email.";
                    this.messageType = "alert-danger";
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    },
    components: {
        Icon,
    },
};
</script>

<style scoped></style>
