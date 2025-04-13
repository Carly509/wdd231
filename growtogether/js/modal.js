export const Modal = {
    modal: null,
    modalContent: null,
    closeButton: null,

    init() {
        this.modal = document.getElementById('modal');
        this.modalContent = document.getElementById('modal-content');
        this.closeButton = this.modal.querySelector('.modal__close');

        this.closeButton.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    },

    open(content) {
        this.modalContent.innerHTML = content;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};
