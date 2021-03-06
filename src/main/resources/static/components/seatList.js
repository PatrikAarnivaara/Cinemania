export default {
  template: `
     <div id="seat-layout">
            <div class="film-screen">
              SCREEN
            </div>
        <div class="salon">
            <div class="seats"
                v-for="seat of seats"
                v-if="seat.salon_id === currentScreening.salon_id"
                v-bind:class="[(seat.status !== 'available') ? (seat.status === 'reserved') ? 'reservedSeats' : 'selectedSeats' : 'seats']"
                :key="seat.name.id"
                @click="chooseSeat(seat)"
            >
                {{ seat.row }}-{{ seat.name }}
            </div>
        </div>  
        <button id="seat-button" v-if="counter === totalTickets" @click="addBooking">BOOK</button>
        <p v-if="errorBooking">Error, could not execute booking</p>      
     </div>
    
    `,
  data() {
    return {
      currentScreening: {},
      errorBooking: false,
      counter: 0,
    };
  },

  methods: {
    chooseSeat(seat) {
      console.log(seat.status);
      console.log("Counter: " + this.counter);
      console.log("Total Tickets: " + this.totalTickets);
      console.log("List ticket types: ");
      for (let listTicketType of this.listTicketTypes) {
        console.log(listTicketType);
      }
      if (this.counter < this.totalTickets) {
        if (seat.status === "available") {
          seat.status = "selected";
          this.counter += 1;
        } else if (seat.status === "selected") {
          seat.status = "available";
          this.counter -= 1;
        }
      } else {
        if (seat.status === "selected") {
          seat.status = "available";
          this.counter -= 1;
        }
      }
    },
    async checkReservedSeats() {
      for (let seat of this.seats) {
        seat.status = "available";
      }
      for (let ticket of this.tickets) {
        if (ticket.screening_id === this.currentScreening.screening_id) {
          let seatID = ticket.seat_id;
          let oneSeat = await fetch("/rest/seats/" + seatID);
          oneSeat = await oneSeat.json();
          oneSeat.status = "reserved";
          console.log(oneSeat);
          for (let seat of this.seats) {
            if (seat.seat_id === oneSeat.seat_id) {
              seat.status = "reserved";
            }
          }
        }
      }
    },
    async addBooking() {
      let m = moment();
      let currentTime = m.format("YYYY-MM-DD HH:mm:ss");
      let booking = {
        user_id: this.user.user_id, //get id of current user
        booking_time: currentTime, //get current time
      };

      let result = await fetch("/rest/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      result = await result.json();
      this.$store.commit("appendBooking", result);

      this.addTickets(result);
    },
    async addTickets(booking) {
      let indexPosition = 0;
      for (let seat of this.seats) {
        if (seat.status === "selected") {
          console.log("booking id: " + booking.booking_id);
          console.log("screening id: " + this.currentScreening.screening_id);
          console.log("seat id: " + seat.seat_id);
          console.log("type id: " + this.listTicketTypes[indexPosition]);

          let ticket = {
            booking_id: booking.booking_id,
            screening_id: this.currentScreening.screening_id,
            seat_id: seat.seat_id,
            ticket_type_id: this.listTicketTypes[indexPosition],
          };
          indexPosition += 1;

          let result = await fetch("/rest/tickets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ticket),
          });

          result = await result.json();
          this.$store.commit("appendTicket", result);

          seat.status = "reserved";
          this.counter = 0;
        }
      }
      this.$router.push("/myPage");
    },
  },
  async created() {
    let screening = await fetch("/rest/screenings/" + this.$route.params.id);
    screening = await screening.json();
    console.log(screening);
    this.currentScreening = screening;

    this.checkReservedSeats();
  },
  computed: {
    seats() {
      return this.$store.state.seats;
    },
    screenings() {
      return this.$store.state.screenings;
    },
    tickets() {
      return this.$store.state.tickets;
    },
    user() {
      return this.$store.state.user;
    },
    totalTickets() {
      return this.$store.state.totalTickets;
    },
    listTicketTypes() {
      return this.$store.state.listTicketTypes;
    },
  },
};
