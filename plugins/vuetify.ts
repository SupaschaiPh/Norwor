// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'


export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme:{
        themes:{
            light:{
                
                colors:{
                    //Referance color : https://colorhunt.co/palette/0c2d57fc6736ffb0b0efecec
                    primary:"#FC6736",
                    secondary:"#0C2D57"
                },
                
                
            }
        }
    }
  })
  app.vueApp.use(vuetify)
})
