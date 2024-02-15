import { ref, toRefs } from "vue"

export default {

    props: ["message"],

    setup(props) {

      const { message } = toRefs(props)

      console.log(props.message)

      onMounted(() => {
        console.log(`Message: ${props.message}`)
      })

    }

  }