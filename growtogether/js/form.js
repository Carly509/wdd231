export const FormManager = {
    validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && input.value) {
                if (!this.validateEmail(input.value)) {
                    this.showError(input, 'Please enter a valid email address');
                    isValid = false;
                }
            }
        });

        return isValid;
    },

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') ||
                     document.createElement('div');

        error.className = 'error-message';
        error.textContent = message;

        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
    },

    async handleSubmit(formElement, submitCallback) {
        if (this.validateForm(formElement)) {
            const formData = new FormData(formElement);
            const data = Object.fromEntries(formData.entries());

            try {
                await submitCallback(data);
                formElement.reset();
                return true;
            } catch (error) {
                console.error('Form submission error:', error);
                return false;
            }
        }
        return false;
    }
};
