<template>
    <div class="container mt-5">
        <div v-if="success" class="mt-3 alert alert-success"  >
            <Icon icon="material-symbols:check" />
            Reservation deleted successfully
        </div>

        <h1>Reservations</h1>
        <div v-if="reservations.length === 0" class="alert alert-info">
            No reservations available.
        </div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Day</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Title</th> 
                        <th scope="col">Edit</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="reservation in reservations" :key="reservation.id">
                        <td>{{ extractDate(reservation.start) }}</td>
                        <td>{{ extractTime(reservation.start) }}</td>
                        <td>{{ extractTime(reservation.end) }}</td>
                        <td>{{ reservation.title }}</td> 
                        <td>
                            <button type="button" class="btn btn-danger buttonDelete" @click="addReservation(reservation)">
                                <Icon icon="bi:trash-fill" :horizontalFlip="true" />
                            </button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    data() {
        return {
            reservations: [],
            success: false,
        };
    },
    async created() {
        try {
            const response = await fetch("http://localhost:8189/reservations");
            if (response.ok) {
                const data = await response.json();
                this.reservations = data;
            } else {
                console.error("Failed to fetch reservations.");
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
        addReservation(reservation) {
            // Programmatically navigate to /deleteReservation and pass the availability object as a query parameter
            this.$router.push({
                path: '/deleteReservation',
                query: { reservationId: reservation.id },
            });
        },
    },
    mounted() {
        // Accessing $route should be done inside a method or a lifecycle hook
        this.success = this.$route.query.success ? true : false;
    },
    components: {
        Icon,
    },
};
</script>

<style scoped></style>
