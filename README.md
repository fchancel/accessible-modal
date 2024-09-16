# Accessible Modal Component in Vue.js

This project provides a **demonstration** of how to build an accessible modal component using Vue.js, with a focus on accessibility best practices. It is designed as a **learning example** to show how to implement keyboard navigation, focus trapping, and ARIA attributes.

The implementation is based on the guidelines provided by the **W3C** for accessible modals, specifically following the recommendations outlined in the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

## Features

- **Keyboard navigation**: The modal supports navigation using "Tab" and "Shift+Tab", with focus trapped inside the modal.
- **ARIA compliance**: Proper use of `role="dialog"`, `aria-modal`, and `aria-labelledby` to provide context to screen readers.
- **Focus management**: Automatically redirects focus to the modal when opened and restores it to the triggering element when closed.
- **Close with Escape**: Allows the modal to be closed using the "Escape" key for ease of use.
- **Scroll management**: Disables background scrolling when the modal is open, ensuring users remain focused on the modal content.

## How to Test

This project is set up with **Vue.js** and can be run locally to explore the modal's behavior.

### Steps to test:

1. Clone the repository to your local environment.
   
2. Install the dependencies by running:

```bash
   npm install
```

3. Start the local development server:

```bash
   npm run dev
```

4. Open your browser at the provided `localhost` address and interact with the modal to test its accessibility features.

## Code Explanation

- **AccessibleModal.vue**: The core modal component that handles accessibility features like focus management, ARIA attributes, and keyboard navigation.
- **useModal.ts**: A composable that centralizes logic for opening/closing modals, managing scroll, and handling the "Escape" key press.
- **App.vue**: An example usage file that shows how to trigger multiple modals and pass the appropriate props.


## Educational Focus

This project is for educational purposes only. It serves as a guide on how to implement accessible modal dialogs following the W3C's [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). The code demonstrates how to handle focus management, keyboard navigation, and proper use of ARIA attributes to ensure that the modal is accessible to all users, including those with disabilities.

## License

This project is open-source and available under the [MIT License](LICENSE).