// masterJs.js

document.addEventListener('DOMContentLoaded', () => {
    const errorMessage = window.errorMessage;
  
    if (errorMessage) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: errorMessage,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  });
  