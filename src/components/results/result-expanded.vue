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
    <span v-if="item.prerequisite_text">
      <strong>Prerequisites</strong>
      : {{item.prerequisite_text}}
      <br />
    </span>
    <span v-if="item.attributes.length > 0">
      <strong>Other Attributes</strong>
      : {{item.attributes.join(',')}}
    </span>
  </td>
</template>
<script>
export default {
  name: 'ResultExpanded',
  props: { item: Object, headers: Array },
};
</script>
