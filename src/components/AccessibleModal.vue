<template>
	<div
		v-if="isOpen"
		class="modal-overlay"
		@click="handleOverlayClick"
	>
		<div
			class="modal-content"
			role="dialog"
			aria-modal="true"
			:aria-labelledby="modalTitleId"
			tabindex="-1"
			ref="modalContent"
			@keydown.tab="handleTabKey"
		>
		<div class="close-btn">
			<button @click="handleCloseClick" aria-label="Close">
				X
			</button>
		</div>
			<h2 :id="modalTitleId">
				{{ title }}
			</h2>

			<div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

const props = defineProps<{
	title: string;
	modalTitleId: string;
	isOpen: boolean;
	closeModal: () => void;
}>();

const modalContent = ref<HTMLElement | null>(null);

/*
 * Returns the list of CSS selectors for focusable elements.
 */
function getFocusableSelectors(): string[] {
	return [
		'a[href]',
		'button',
		'textarea',
		'input',
		'select',
		'[tabindex]:not([tabindex="-1"])',
	];
}

function isFocusableElement(element: HTMLElement): boolean {
	const focusableSelectors = getFocusableSelectors();
	return focusableSelectors.some((selector) => element.matches(selector));
}

/*
 * Get all valid focusable elements within the modal content.
 */
 function getValidFocusableElements(): HTMLElement[] {
	const focusableSelectorsStr = getFocusableSelectors().join(', ');
	const focusableElements = modalContent.value?.querySelectorAll<HTMLElement>(focusableSelectorsStr);

	return Array.from(focusableElements || []).filter(isFocusableElement);
}

/*
 * Focus on focusable element.
 */
 function focusElement(element: HTMLElement, event: KeyboardEvent): void {
	element.focus();
	event.preventDefault();
}

/*
 * Manages the focus trapping inside the modal.
 * It ensures that Tab and Shift+Tab navigation stays within the modal.
 */
function handleTabKey(event: KeyboardEvent): void {
	const focusableElements = getValidFocusableElements();

	if (!focusableElements.length) return;

	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	// Handle focus wrapping when Shift + Tab is pressed
	if (event.shiftKey && document.activeElement === firstElement) {
		focusElement(lastElement, event)
	// Handle focus wrapping when Tab is pressed
	} else if (!event.shiftKey && document.activeElement === lastElement) {
		focusElement(firstElement, event)
	}
}

/*
 * Handles closing the modal when clicking outside the modal content.
 */
function handleOverlayClick(event: MouseEvent): void {
	if (event.target === modalContent.value?.parentElement) {
		props.closeModal();
	}
}

function handleCloseClick(): void {
	props.closeModal();
}

/*
 * Watcher that monitors when the modal is opened or closed.
 * It ensures the modal receives focus when it opens.
 */
 watch(
	() => props.isOpen,
	(newValue) => {
		if (newValue) {
			nextTick(() => {
				modalContent.value?.focus();
			});
		}
	}
);
</script>

<style scoped>
.close-btn {
	display: flex;
	justify-content: flex-end;
}

.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal-content {
	background-color: white;
	padding: 1em;
	border-radius: 5px;
	width: 90%;
	max-width: 500px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	outline: none;
}
</style>
