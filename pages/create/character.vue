<template>
  <div class="drawer drawer-end h-full my-3 w-auto">
    <input
      id="item-details"
      type="checkbox"
      class="drawer-toggle"
      v-model="toggleDetailDrawer"
    />
    <div class="drawer-content">
      <div class="mx-auto snap-start container">
        <div class="card lg:card-side bg-base-100 shadow-xl">
          <div class="w-auto bg-primary p-6">
            <div
              class="flex items-center justify-center border-3 border-dashed border-secondary p-6"
            >
              <Icon class="mx-auto text-8xl" name="gala:portrait2" />
            </div>
          </div>
          <div class="card-body w-full">
            <h2 class="card-title">Create a new character</h2>
            <p>Enter a name for your character and click start</p>
            <div></div>
            <div class="card-actions justify-center">
              <div class="form-control">
                <label class="input-group">
                  <span class="whitespace-nowrap">Character's Name</span>
                  <input
                    type="text"
                    placeholder="name goes here"
                    class="input input-bordered w-96"
                    v-model="newCharacterName"
                  />
                </label>
              </div>
              <button class="btn btn-primary" @click="startCharacter">
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="item-details" class="drawer-overlay"></label>
      <div class="w-96 md:w-2/3 bg-secondary text-secondary-content">side</div>
    </div>
  </div>
  <footer
    class="bg-green-700 text-3xl text-white text-center border-t-4 border-red-500 fixed inset-x-0 bottom-0 p-4"
  >
    need to fix
  </footer>
</template>
<script setup>
  const {createCharacter, character} = useMyCharacters();
  const toggleDetailDrawer = ref(false);
  const newCharacterName = ref();
  const startCharacter = async () => {
    console.log('New Name', newCharacterName.value);
    console.log(character.value);
  };
</script>
