<template>
    <div class="card cardItem">
        <div class="card-body">
            <h5 class="card-title">
                <Icon icon="clarity:date-line" />
                Day: {{ extractDate(availability.start) }}

                <button v-if="admin" type="button" class="btn btn-danger buttonDelete" @click="deleteAvailabilityConfirmed"
                    data-target="#deleteConfirmationModal">
                    <Icon icon="bi:trash-fill" :horizontalFlip="true" />
                </button>
            </h5>

            <p class="card-text" style="margin-top: 20px">
                <Icon icon="ri:time-line" />
                Start {{ extractTime(availability.start) }}
            </p>

            <p class="card-text">
                <Icon icon="ri:time-fill" />
                End {{ extractTime(availability.end) }}
            </p>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    props: {
        availability: Object, // Pass availability data as a prop
        admin : Boolean,
    },
    methods: {
        extractDate(dateTimeString) {
            const date = new Date(dateTimeString);
            return date.toLocaleDateString();
        },

        extractTime(dateTimeString) {
            const date = new Date(dateTimeString);
            return date.toLocaleTimeString();
        },

        deleteAvailabilityConfirmed() {
            // Emit an event to notify the parent component about the delete request
            this.$emit('delete-availability', this.availability);
        },
    },
    components: {
        Icon,
    },
};
</script>

<style scoped>
.cardItem {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-bottom: 20px;
    background: linear-gradient(217deg, rgba(250, 255, 252, 0.8), rgba(255, 0, 0, 0) 70.71%),
        linear-gradient(127deg, rgba(255, 255, 255, 0.8), rgba(0, 255, 0, 0) 70.71%),
        linear-gradient(336deg, rgba(249, 255, 252, 0.8), rgba(0, 0, 255, 0) 70.71%);
}
</style>
