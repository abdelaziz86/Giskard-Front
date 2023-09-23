<template>
    Delete Reservation {{ this.reservationId }}
</template>

<script>
export default {
    data() {
        return {
            reservationId : this.$route.query.reservationId
        };
    },

}
</script>

<style scoped>
</style>