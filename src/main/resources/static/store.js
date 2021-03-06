import Vue from "./libs/vue.esm.browser.js";
import Vuex from "./libs/vuex.esm.browser.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    films: [],
    users: [],
    screenings: [],
    seats: [],
    bookings: [],
    user: null,
    tickets: [],
    totalTickets: 0,
    listTicketTypes: [],
    tickets: []
  },
  mutations: {
    setFilms(state, films) {
      state.films = films;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setScreenings(state, screenings) {
      state.screenings = screenings;
    },
    appendUser(state, user) {
      state.users.push(user);
    },
    appendBooking(state, book) {
      state.bookings.push(book);
    },
    appendTicket(state, ticket) {
      state.tickets.push(ticket);
    },
    appendFilm(state, film) {
      state.films.push(film);
    },
    appendScreening(state, screening) {
      state.films.push(screening);
    },
    setSeats(state, seats) {
      state.seats = seats;
    },
    setUser(state, user) {
      state.user = user;
    },
    setBookings(state, bookings) {
      state.bookings = bookings;
    },
    setTickets(state, tickets) {
      state.tickets = tickets;
    },
    setTotalTickets(state, totalTickets) {
      state.totalTickets = totalTickets;
    },
    setListTicketTypes(state, listTicketTypes) {
      state.listTicketTypes = listTicketTypes;
    },
  },
});
