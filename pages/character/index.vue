<template>
  <div class="mt-3 mx-auto p-3 snap-start container">
    <div
      class="grid content-around grid-cols-1 gap-3 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center"
    >
      <CharacterProfileCard mode="create" @create="openCreate()" />
      <CharacterProfileCard
        v-if="myCharacters"
        v-for="char in myCharacters"
        key="char.id"
        :character="char"
        @view="viewCharacter"
      />
    </div>
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->
    <input
      type="checkbox"
      id="create-new-modal"
      class="modal-toggle"
      v-model="createModelToggle"
    />
    <div class="modal modal-bottom w-full sm:modal-middle">
      <form @submit="onSubmit">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Type in a name and click start</h3>
            <p class="py-4">
                
                <div class="form-control">
                    <label class="input-group">
                        <span>Character Name</span>
                        <input v-model="characterName" type="text" placeholder="your character name here" class="input input-bordered" />
                    </label>
                    <span>{{ errorMessage }}</span>
                </div>
            
            </p>
            <div class="modal-action">
            <button class="btn btn-primary" type="submit">
                Create
            </button>
            <label for="create-new-modal" class="btn">Close</label>
            </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
    import { useField, useForm } from 'vee-validate';
    import {v4} from 'uuid';
    const createModelToggle = ref(false);
    const openCreate = () => (createModelToggle.value = true);
const { myCharacters, character } = useMyCharacter();
    const characterUtils = utilsCharacters()
const createNewCharacter = (cName) => {
      console.log('create new', characterUtils.initCharacter(v4(), cName))
      character.value = characterUtils.initCharacter(v4(), cName)
      //character.value = { id: v4(), name: cName };
        return navigateTo({path:`/character/${character.value.id}`})
    };
    const viewCharacter = (id) => navigateTo({path:`/character/${id}`})
    const { handleSubmit } = useForm();
    const { value: characterName, errorMessage } = useField('characterName', validateField);
    function validateField(value) {
        if (!value) {
            return 'name is required';
        }
        return true
    }  
const onSubmit = handleSubmit(values => {
console.log('Submit new character',values)
    if (values) {
        createNewCharacter(values.characterName)
    }    
});
</script>
