<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { dataStore } from '@/stores/dataStore'
const store = dataStore() //access this to change database info
const linkNumber = ref(1)
const uploadingFiles = ref(false)

//should bind these to the store for some form of permanent storage

const firstName = defineModel('firstName', { default: '-69420' })
const lastName = defineModel('lastName', { default: '-69420' })
const nickname = defineModel('nickname', { default: '-69420' })
const description = defineModel('description', { default: '-69420' })
const email = defineModel('email', { default: '-69420' })
const links = defineModel('links', { default: [] })

// Consolidated uploads - will sort and organize later
const uploadedFiles = ref([]) // Array of { name, category, value, previewURL }
const fileName = ref('')
const fileCategory = ref('')
const fileValue = ref(null)

const imagePreviewUrl = ref('')
const fileError = ref('')

const supportedExtensions = {
  image: ['.png', '.jpg', '.jpeg', '.webp'],
  model: [
    '.obj',
    '.stl',
    '.sldprt',
    '.sldasm',
    '.step',
    '.stp',
    '.iges',
    '.igs',
    '.fbx',
    '.glb',
    '.gltf',
  ],
}

function onFileSelected(event) {
  const [file] = event.target.files ?? []

  if (!file) {
    fileError.value = ''
    return
  }

  const fileName = file.name.toLowerCase()

  // Check if it's an image
  if (supportedExtensions.image.some((ext) => fileName.endsWith(ext))) {
    fileCategory.value = 'image'
    // Create preview for images
    if (imagePreviewUrl.value) {
      URL.revokeObjectURL(imagePreviewUrl.value)
    }
    imagePreviewUrl.value = URL.createObjectURL(file)
  }
  // Check if it's a 3D model
  else if (supportedExtensions.model.some((ext) => fileName.endsWith(ext))) {
    fileCategory.value = 'model'
  }
  // Invalid file type
  else {
    fileError.value =
      'Unsupported file type. Please upload an image (PNG, JPG, WEBP) or 3D model (OBJ, STL, STEP, FBX, etc.)'
    event.target.value = ''
    return
  }

  uploadedFiles.value.push({
    name: fileName.value,
    category: fileCategory.value,
    value: fileValue.value,
    previewUrl: fileCategory.value === 'image' ? imagePreviewUrl.value : null, //this url should probably not be used, as it is blob and will be destroyed. Also, its persistence will cause memory leaks?
  })
  fileError.value = ''
  event.target.value = ''
}

onBeforeUnmount(() => {
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value)
  }
})
</script>

<template>
  <div class="portfolio-inputs">
    <div class="input-group">
      <label for="first-name">First Name:</label>
      <input type="string" id="first-name" v-model="firstName" />
    </div>

    <div class="input-group">
      <label for="last-name">Last Name:</label>
      <input type="string" id="last-name" v-model="lastName" />
    </div>

    <div class="nickname">
      <label for="nickname">Nickname:</label>
      <input type="string" id="nickname" v-model="nickname" />
    </div>

    <div class="description">
      <label for="description">Description:</label>
      <input type="string" id="description" v-model="description" />
    </div>

    <div class="email">
      <label for="email">Email:</label>
      <input type="string" id="email" v-model="email" />
    </div>

    <button @click="linkNumber++">Add Link</button>
    <button @click="linkNumber > 1 ? linkNumber-- : null">Remove Link</button>

    <div v-for="i in linkNumber" :key="`link-${i}`" class="links">
      <label for="links">Links:</label>
      <input type="string" id="links" v-model="links[i - 1]" />
    </div>

    <div>
      <button @click="uploadingFiles = true">Upload Files:</button>
    </div>

    <div v-if="uploadingFiles" class="input-group">
      <div>
        <button @click="uploadingFiles = false">Exit</button>
      </div>

      <div class="name">
        <label for="name">Name:</label>
        <input type="string" id="name" v-model="fileName" />
      </div>

      <label for="file-upload">Upload Files (Images or 3D Models):</label>
      <input
        id="file-upload"
        type="file"
        accept=".png,.jpg,.jpeg,.webp,.obj,.stl,.sldprt,.sldasm,.step,.stp,.iges,.igs,.fbx,.glb,.gltf"
        @change="onFileSelected"
      />

      <p v-if="fileError" class="file-error">{{ fileError }}</p>

      <small
        >Images: PNG, JPG, WEBP | 3D Models: OBJ, STL, STEP, IGES, FBX, GLTF/GLB, SolidWorks</small
      >

      <img v-if="imagePreviewUrl" :src="imagePreviewUrl" alt="Preview" class="image-preview" />
    </div>

    <div v-if="uploadedFiles.length" class="uploaded-files">
      <h3>Uploaded Files:</h3>
      <ul>
        <li v-for="(file, idx) in uploadedFiles" :key="`file-${idx}`">
          {{ file.name }} ({{ file.category }})
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.image-preview {
  display: block;
  width: 100%;
  max-width: 240px;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
}

.file-error {
  color: #c62828;
  margin: 0.35rem 0;
}

.uploaded-files {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}

.uploaded-files ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
}

.uploaded-files li {
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
}
</style>
