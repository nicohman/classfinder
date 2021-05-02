<template>
  <td :colspan="headers.length">
    <br />
    <strong>Credits</strong>
    : {{item.Credits}}
    <br />
    <strong>Dates</strong>
    {{item.StartDate}}-{{item.EndDate}}
    <br />
    <strong>Description</strong>
    : {{item.Description}}
    <br />
    <span v-if="item.PrerequisiteText">
      <strong>Prerequisites</strong>
      : {{item.PrerequisiteText}}
      <br />
    </span>
    <span v-if="item.Attributes.length > 0">
      <strong>Other Attributes</strong>
      : {{item.Attributes.join(',')}}
    </span>
  </td>
</template>
<script>
export default {
  name: 'Expanded',
  props: { item: Object, headers: Array },
};
</script>
