<template>
    <footer class="footer" style="margin-top : 60px ; "> 
             
            <div class="footer-text" style="margin-bottom: 18px;">
                &copy; {{ currentYear }} Abdelaziz Makhlouf. All rights reserved.
            </div> 
    </footer>
</template>

<script>
export default {
    data() {
        return {
            currentYear: new Date().getFullYear(),
        };
    },
};
</script>

<style scoped>
.footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    text-align: center;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.footer-logo img {
    max-width: 100px;
    margin-right: 10px;
}

.footer-links {
    margin-top: 10px;
    display: flex;
    gap: 20px;
}

.router-link {
    text-decoration: none;
    color: #fff;
    font-weight: 500;
}

.footer-text {
    margin-top: 20px;
    font-size: 14px;
}
</style>
