<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <header class="header">
        <nav class="container">
            <img style="width: 200px !important; height: auto !important;"
                src="https://uploads-ssl.webflow.com/601d6f7d0b9c984f07bf10bc/62983fa8ef716259c397a57d_logo.svg">
            <ul class="nav-routes" style="list-style: none; display: flex;">
                <RouterLink to="/" exact active-class="active-route" class="routeStyle">
                    Admin
                </RouterLink>
                <RouterLink to="/client" exact active-class="active-route" class="routeStyle">
                    Client
                </RouterLink>
                <RouterLink to="/reservations" exact active-class="active-route" class="routeStyle">
                    My Reservations
                </RouterLink>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    // background: linear-gradient(to bottom, rgba(69, 103, 74, 0.9) 0%, rgba(138, 214, 151, 0.5) 100%);

    background: linear-gradient(217deg, rgba(120, 228, 164, 0.8), rgba(255, 0, 0, 0) 70.71%),
        linear-gradient(127deg, rgba(106, 255, 151, 0.8), rgba(0, 255, 0, 0) 90.71%),
        linear-gradient(336deg, rgba(113, 252, 183, 0.8), rgba(0, 0, 255, 0) 90.71%);
        
    nav {
        display: flex;
        align-items: center;
        padding: 25px 16px;

        div {
            img {
                max-width: 50px;
            }
        }

        .nav-routes {
            display: flex;
            flex: 1;
            justify-content: flex-end;
            gap: 12px;
        }

        .routeStyle {
            text-decoration: none;
            color: black;
            position: relative;
            padding-top: 10px;
            padding-left: 10px;

            &.active-route {
                &:after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -2px;
                    border-bottom: 2px solid black;
                }
            }
        }
    }
}
</style>
