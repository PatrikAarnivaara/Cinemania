
export default {
    template: `
    <div>
        <div class="sort-films">
        <button
        v-for="(rating, i) in filmFilterAge" 
        :key="rating.age + i"
        @click="filmFilterKey = rating.age"
        >{{ rating.age }}
        </button>
        </div>

        <div class="filmcard-container">
        <div class="filmcard"  
         v-for="film of films"
         :key="film.film_id"
         @click="goToFilmInfo(film.film_id)">
        <img :src="film.image" alt="film image"><br>
        {{ film.title | to-uppercase }} <br>
        {{ film.rated | to-uppercase }} <br>
        </div>
        </div>    
    
   </div>
    `,
    data() {
        return {
            filmFilterKey: 'all',
           filmFilterAge: [
                { age: "all" },
                { age: "children" },
                { age: "adult" }],
        }
    },
    methods: {
        goToFilmInfo(film_id) {
            this.$router.push('/films/' + film_id)
        }, onButtonClick() {
            console.log('pressed')
            $(this).toggleClass( "selected" );
        } 
    },
    computed: {
        films() {
            console.log(this.filmFilterKey)
            return this[this.filmFilterKey]
        },
        all() {
            return this.$store.state.films
        },
        children() {
            return this.$store.state.films.filter((film) => film.rated === 'G'
            || film.rated === 'PG' || film.rated === 'PG-13')
        },
        adult() {
            return this.$store.state.films.filter((film) => film.rated === 'R')
        }

    }
}

/* :style='{"background-color": (clicked? "yellow" : "orange" )}' */
