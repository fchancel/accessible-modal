<template>
	<div>
		<button @click="openFirstModal">Open First Modal</button>
		<button @click="openSecondModal">Open Second Modal</button>

		<AccessibleModal
			title="First Modal Title"
			modalTitleId="firstModalTitle"
			:isOpen="isFirstModalOpen"
			:closeModal="closeFirstModal"
		>
			<p>This is the content of the first modal.</p>
		</AccessibleModal>

		<AccessibleModal
			title="Second Modal Title"
			modalTitleId="secondModalTitle"
			:isOpen="isSecondModalOpen"
			:closeModal="closeSecondModal"
		>
			<p>This is the content of the second modal.</p>
			<button>Button 1</button>
			<button @click="closeSecondModal">Close</button>
		</AccessibleModal>
	</div>
</template>

<script setup lang="ts">
import { useModal } from '@/composables/useModal';
import AccessibleModal from '@/components/AccessibleModal.vue';

const { isOpen: isFirstModalOpen, openModal: openFirstModal, closeModal: closeFirstModal } = useModal();
const { isOpen: isSecondModalOpen, openModal: openSecondModal, closeModal: closeSecondModal } = useModal();
</script>