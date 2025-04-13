export const RegistrationHandler = {
    init() {
        const form = document.getElementById('registration-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    },

    async handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            localStorage.setItem('formSubmission', JSON.stringify(data));

            window.location.href = form.action;
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    }
};
