import usersList from '../components/usersList.js'
import loggingIn from '../components/loggingIn.js'

export default {
    components: {
        usersList,
        loggingIn
      },
    template:`
    <div>
        <h3>Login</h3>
        <loggingIn />


    </div>
    `
}