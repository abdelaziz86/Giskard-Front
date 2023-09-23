<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    
    <header>
        <nav class="container">
            <div >
                <img 
                    style="width : 200px ; height : auto"
                    src="https://uploads-ssl.webflow.com/601d6f7d0b9c984f07bf10bc/62983fa8ef716259c397a57d_logo.svg">
            </div>
            <ul class="nav-routes routeStyle" >
                <RouterLink to="/">Admin</RouterLink>
                <RouterLink to="/client">Client</RouterLink>
                <RouterLink to="/reservations">My Reservations</RouterLink>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
header {
    background-color: #45674a;

    nav {
        display: flex;
        align-items: center;
        padding: 25px 16px;

        .branding {
            display: flex;
            align-items: center;
            gap: 8px;

            img {
                max-width: 50px;
            }

            h1 {
                font-size: 24px;
            }
        }

        .nav-routes {
            display: flex;
            flex: 1;
            justify-content: flex-end;
            gap: 12px;
            list-style: none;

            a {
                text-decoration: none;
                color: inherit;
            }
        }

        .routeStyle{
            padding-top : 15px;
            color : white ; 
        }
    }
}


</style>