import { ref, onMounted, onUnmounted } from 'vue';

export function useModal() {
    const isOpen = ref(false);
    const activeElement = ref<HTMLElement | null>(null);

    const openModal = () => {
        // Returns focus to the element opening the modal
        activeElement.value = document.activeElement as HTMLElement;
        isOpen.value = true;

        // Disables background scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        isOpen.value = false;
        document.body.style.overflow = '';
        if (activeElement.value) {
            activeElement.value.focus();
        }
    };

    const handleEscape = (event: KeyboardEvent) => {
        // Allows you to close the modal using the ESC key
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', handleEscape);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', handleEscape);
    });

    return {
        isOpen,
        openModal,
        closeModal,
    };
}
