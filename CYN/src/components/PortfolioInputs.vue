<script setup>
import { onBeforeUnmount, ref } from 'vue';
const linkNumber = ref(1);
const fileNumber = ref(1);

const firstName = defineModel('firstName', { default: '-69420' });
const lastName = defineModel('lastName', { default: '-69420' });
const nickname = defineModel('nickname', { default: '-69420' });
const description = defineModel('description', { default: '-69420' });
const email = defineModel('email', { default: '-69420' });
const links = defineModel('links', { default: [] });                          
const uploadedImage = defineModel('uploadedImage', { default: null });        //the files will probably be consolidated to a single variable / array
const uploadedModelFile = defineModel('uploadedModelFile', { default: null });

//add array for dropdown to associate file type with file in array

const imagePreviewUrl = ref('');
const modelFileError = ref('');
const supportedModelExtensions = [
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
];

function onImageSelected(event) {
  const [file] = event.target.files ?? [];
  uploadedImage.value = file ?? null;

  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value);
    imagePreviewUrl.value = '';
  }

  if (file) {
    imagePreviewUrl.value = URL.createObjectURL(file);
  }
}

function onModelSelected(event) {
  const [file] = event.target.files ?? [];

  if (!file) {
    uploadedModelFile.value = null;
    modelFileError.value = '';
    return;
  }

  const fileName = file.name.toLowerCase();
  const isSupported = supportedModelExtensions.some((ext) => fileName.endsWith(ext));

  if (!isSupported) {
    uploadedModelFile.value = null;
    modelFileError.value = 'Unsupported model format. Please upload a valid 3D model file.';
    event.target.value = '';
    return;
  }

  uploadedModelFile.value = file;
  modelFileError.value = '';
}

onBeforeUnmount(() => {
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value);
  }
});
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
    
    <div v-for="i in linkNumber" class="links">
      <label for="links">Links:</label>
      <input type="string" id="links" v-model="links[i-1]" />
    </div>

    <div class="input-group">
      <label for="picture-upload">Upload Picture:</label>
      <input
        id="picture-upload"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        @change="onImageSelected"
      />
      <p v-if="uploadedImage">Selected: {{ uploadedImage.name }}</p>
      <img
        v-if="imagePreviewUrl"
        :src="imagePreviewUrl"
        alt="Uploaded preview"
        class="image-preview"
      />
    </div>

    <button @click="fileNumber++">Add File</button>
    <button @click="fileNumber > 1 ? fileNumber-- : null">Remove File</button>
    <!-- fix this to v-model to an array -->
     <!-- v-model should ideally bind to an object's property so type of file to .value.category ? and .value.file for actual file -->
      <!-- consolidate to single variable / array / input box -->
    <div v-for="i in fileNumber" :key="i" class="input-group">
      <label for="model-upload">Upload Model File:</label>
      <input
        id="model-upload"
        type="file"
        accept=".obj,.stl,.sldprt,.sldasm,.step,.stp,.iges,.igs,.fbx,.glb,.gltf"
        @change="onModelSelected"
      />
      <p v-if="uploadedModelFile">Selected: {{ uploadedModelFile.name }}</p>
      <p v-if="modelFileError" class="file-error">{{ modelFileError }}</p>
      <small>Supported examples: SolidWorks, OBJ, STL, STEP, IGES, FBX, GLTF/GLB</small>
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
</style>