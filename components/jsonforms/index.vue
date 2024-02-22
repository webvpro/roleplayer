<template>
  <json-forms
    :data="data"
    :renderers="renderers"
    :schema="schema"
    :uischema="uischema"
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
  const emit = defineEmits(['frmChange', 'frmSubmit', 'frmError']);
  const data = props.formData;
  const schema = props.formSchema;
  const uischema = props.formUiSchema;
  const renderers = props.formRenderers;
  const myStyles = computed(() => mergeStyles(defaultStyles, props.formRoot));

  provide('styles', myStyles.value);

  const onChange = event => {
    console.log('Form Change', event);
    emit('frmChange', event);
  };
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
  .vertical-layout > .vertical-layout-item > .control.daisy-ui-control > .error,
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .description {
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
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .description {
    @apply text-info lowercase first-letter:capitalize;
  }
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .wrapper
    > .input:invalid {
    @apply input-error;
  }
  .vertical-layout
    > .vertical-layout-item
    > .control.daisy-ui-control
    > .wrapper
    > .input:focus {
    @apply input-info border-none;
  }
</style>
