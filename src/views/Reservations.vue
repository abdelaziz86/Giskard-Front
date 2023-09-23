<template>
    <div class="container mt-5">
        <h1>Reservations</h1>
        <div v-if="reservations.length === 0" class="alert alert-info">
            No reservations available.
        </div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Title</th> 
                        <th scope="col">Edit</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="reservation in reservations" :key="reservation.id">
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

        addReservation(reservation) {
            // Programmatically navigate to /addreservation and pass the availability object as a query parameter
            this.$router.push({
                path: '/deleteReservation',
                query: { reservationId : reservation.id },
            });
        },
    },
    components: {
        Icon,
    },
};
</script>

<style scoped></style>
