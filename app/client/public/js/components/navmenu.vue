<template>
    <nav class="main-nav" v-if="connected">
        <ul v-if="connected">
            <li><a @click="hideNavBar" href="/#/">Accueil</a></li>
            <li v-if="gameJoined"><a @click="hideNavBar" href="/#/game" >Jeu</a></li>
            <li v-if="gameJoined"><a @click="hideNavBar" href="/#/stats">Statistique</a></li>
            <li v-if="gameJoined"><a @click="hideNavBar" href="/#/trophies">Trophée</a></li>
        </ul>
        <login-form></login-form>
    </nav>
</template>

<script>
    import LoginForm from './LoginForm.vue'
    import store from '../stores/store'
    import Vuex from 'vuex'

    export default {
        name: "NavMenu",
        store: store,
        components: { LoginForm },
        computed: {
            ...Vuex.mapGetters([
                'connected',
                'gameJoined'
            ])
        },
        methods: {
            hideNavBar () {
                var size = window.matchMedia("(max-width: 991px)")
                if (size.matches) document.getElementById("hamburger-checkbox").checked = false;
            }
        },
    }
</script>

<style lang="scss">
    .main-nav {
        width: 100vw;
        height: 5rem;
        display: flex;
        justify-content: flex-end;
        background-color: rgb(32, 32, 32);
        position: fixed;
        top: 0;
        left: 0;
        box-shadow: 0 13px 20px -27px #fff;
        z-index: 2000;

        ul {
            margin-left: 3rem;
            display: flex;
            justify-content: space-between;
            list-style: none;
            height: 100%;

            li {
                text-transform: uppercase;
                display: flex;
                align-items: center;

                a {
                    text-decoration: none;
                    color: white;
                    font-weight: bold;
                    transition: 0.2s;
                    font-size: 1.3rem;
                    padding: 1rem;

                    &:hover {
                        color: #FFCD00;
                    }
                }
            }
        }

        @media (max-width: 991px) {
            background-color: rgb(32, 32, 32);
            position: absolute;
            left: 0rem;
            top: 5rem;
            width: 100%;
            height: calc(100vh - 5rem);
            transition: 0.5s;
            opacity: 0;
            visibility: hidden;
            flex-direction: column;

            ul {
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                width: 100%;
                min-width: unset;
                margin: 0;

                li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    height: 6rem;
                    width: 100%;

                    a {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        font-size: 2.2rem;

                        &:hover {
                            color: #FFCD00;
                        }
                    }
                }
            }
        }
    }
</style>