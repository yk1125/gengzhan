<template><div class="async-state" :data-status="status"><slot v-if="status==='ready'"/><span v-else>{{ message }}</span></div></template>
<script setup>defineProps({ status: { type: String, default: 'ready' }, message: { type: String, default: '' } })</script>
