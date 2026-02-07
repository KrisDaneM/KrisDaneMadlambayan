// ===============================
// Dark mode buttons
// ===============================
const darkToggle = document.getElementById('darkToggle');
const darkToggleMobile = document.getElementById('darkToggleMobile');

// ===============================
// Hamburger menu
// ===============================
const hamburger = document.querySelector('.hamburger');
const hamburgerMenu = document.querySelector('.hamburger-menu');

// ===============================
// Contact form elements
// ===============================
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// ===============================
// DARK MODE TOGGLE
// ===============================
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

if (darkToggle) darkToggle.addEventListener('click', toggleDarkMode);
if (darkToggleMobile) darkToggleMobile.addEventListener('click', toggleDarkMode);

// Apply saved dark mode on load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
});

// ===============================
// HAMBURGER MENU TOGGLE
// ===============================
if (hamburger && hamburgerMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });
}

// ===============================
// EMAILJS FORM SUBMISSION
// ===============================
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formMessage.textContent = '';

    emailjs.sendForm('service_su6pyfv', 'template_fq7byqe', this)
      .then(function () {
        formMessage.textContent = 'Message sent successfully!';
        form.reset();
      })
      .catch(function () {
        formMessage.textContent = 'Error sending message. Try again!';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'SUBMIT';
      });
  });
}

// ===============================
// RESUME DOWNLOAD BUTTONS (Automatic download for PDF & PNG)
// DOCX uses HTML download attribute, no JS needed
// ===============================
async function forceDownload(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error('File not found');

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    alert('Error downloading file: ' + error);
  }
}

// Attach buttons to PDF and PNG files
document.getElementById('downloadPDF')?.addEventListener('click', () => {
  forceDownload('downloads/resumepdf.pdf');
});

document.getElementById('downloadImage')?.addEventListener('click', () => {
  forceDownload('downloads/resumeimg.png');
});

// ===============================
// RESUME DOWNLOAD BUTTONS (Automatic download)
// Only for DOCX to force download in all browsers
// ===============================
document.getElementById('downloadDOCX')?.addEventListener('click', function (e) {
  e.preventDefault(); // prevent default link behavior
  const filePath = 'downloads/resumedocx.docx'; // path to your docx
  fetch(filePath)
    .then(resp => {
      if (!resp.ok) throw new Error('File not found');
      return resp.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resumedocx.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    })
    .catch(err => {
      alert('Error downloading file: ' + err);
    });
});