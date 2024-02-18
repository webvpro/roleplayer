<template>
  <json-forms
    :data="formData"
    :renderers="formRenderers"
    :schema="formSchema"
    :uischema="formUiSchema"
    @change="onChange"
  >
  </json-forms>
</template>

<script setup>
  import {JsonForms} from '@jsonforms/vue';
  import {
    defaultStyles,
    mergeStyles,
    vanillaRenderers,
  } from '@jsonforms/vue-vanilla';
  import {string} from 'yup';

  const props = defineProps({
    formRoot: {
      type: Object,
      default: {
        control: {root: 'daisy-ui-control'},
      },
    },
    formData: {},
    formSchema: {},
    formUiSchema: {},
    formRenderers: {type: Array, default: [...vanillaRenderers]},
  });
  const data = props.formData.value;
  const emit = defineEmits(['frmChange', 'frmSubmit']);

  const onChange = event => {
    console.log('Form Change', event);
    emit('frmChange', event);
  };
  const myStyles = computed(() => mergeStyles(defaultStyles, props.formRoot));
  provide('styles', myStyles.value);
</script>
<style lang="postcss">
  .vertical-layout > .vertical-layout-item > .control {
    @apply w-full;
  }
  .vertical-layout > .vertical-layout-item > .control.daisy-ui-control {
    @apply form-control w-full;
  }
  .vertical-layout > .vertical-layout-item > .control.daisy-ui-control > .label,
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .wrapper
    > .input,
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .wrapper
    > .text-area,
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .error {
    @apply w-full;
  }
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .wrapper
    > .text-area {
    @apply h-80;
  }
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .error {
    @apply text-error lowercase first-letter:capitalize;
  }
</style>
