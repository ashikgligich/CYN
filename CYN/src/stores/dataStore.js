import { ref } from 'vue'
import { defineStore } from 'pinia'

export const dataStore = defineStore('data', () => {
  const tempFirstName = ref('') //draws the first name from portfolio inputs to be stored permanently somewhere else
  const tempLastName = ref('') //draws the last name from portfolio inputs to be stored permanently somewhere else
  const tempEmail = ref('') //draws the email from portfolio inputs to be stored permanently somewhere else
  const tempDescription = ref('') //draws the description from portfolio inputs to be stored permanently somewhere else
  const tempLinks = ref([]) //draws Links from portfolio inputs to be stored permanently somewhere else
  const tempPicture = ref('') //draws the profile picture from portfolio inputs to be stored permanently somewhere else
  const tempResume = ref('') //draws the resume from portfolio inputs to be stored permanently somewhere else

  //add some way to store obj and stl files for the 3D models.
  //add way to add videos, but they should be structured to accompany a project etc

  //add async functions to fetch and save data to backend

  return {
    tempFirstName,
    tempLastName,
    tempDescription,
    tempLinks,
    tempPicture,
    tempResume,
    tempEmail,
  }
})
