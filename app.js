AOS.init({
    duration:1000,
    once:true,
    easing: 'ease-in-out', 
    offset: 120, 
    delay: 0, 
    mirror: false
})

const typed = new Typed("#typing",{
    strings:["متفکر خلاق", "توسعه‌دهنده وب", "بهینه‌ساز عملکرد", "توسعه‌دهنده واکنش‌ گرا"],
    typeSpeed:60,
    backSpeed:30,
    backDelay:1000,
    loop:true
})  

document.querySelectorAll(".counter").forEach(counter => {
    const update = () => {
        const persianToEnglish = num => {
            return num.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
        };
        
        const target = +persianToEnglish(counter.getAttribute('data-target'));
        const count = +persianToEnglish(counter.innerText);
        const inc = target / 200;
        
        if (count < target) {
            const englishToPersian = num => {
                return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
            };
            counter.innerText = englishToPersian(Math.ceil(count + inc));
            setTimeout(update, 10);
        } else {
            counter.innerText = counter.getAttribute('data-target');
        }
    };

    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                update();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 }).observe(counter);
});

window.addEventListener("scroll", function(){
    const header = document.getElementById('mainHeader')
    if(window.scrollY > 100){
        header.classList.add('fixed')
    }else{
        header.classList.remove("fixed")
    }
})

const button = document.querySelectorAll('.filter-btn')
const items = document.querySelectorAll('.portfolio-item')

button.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        button.forEach(b => b.classList.remove("active"))
        const filter = btn.getAttribute('data-filter')
        items.forEach(item =>{
            if(filter === "all" || item.classList.contains(filter)){
                item.classList.remove("hide")
            }else{
                item.classList.add("hide")
            }
        })
    })
})

const btn = document.getElementById('backToTop');

window.onscroll = function() {
    if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
};

btn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (e.target === document.querySelector('body::after') || 
            (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('active'))) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
    document.querySelectorAll('.mobile-nav li a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
});

// post concat form
document.getElementById('post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.btn-submit');
    const messageDiv = document.getElementById('form-message');
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      const formData = {
        name: form.elements['name'].value,
        phone: form.elements['phone'].value,
        email: form.elements['email'].value,
        subject: form.elements['subject'].value,
        message: form.elements['message'].value
      };
      
      const response = await fetch('https://formspree.io/f/xpwdrdvz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        messageDiv.textContent = 'Your appointment request has been sent successfully!';
        messageDiv.style.color = 'green';
        form.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error.message;
      messageDiv.style.color = 'red';
      console.error('Form submission error:', error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Appointment Now';
    }
});

function updateAOS() {
  const elements = document.querySelectorAll('[data-aos-mobile]');
  const isMobile = window.innerWidth < 768;

  elements.forEach(el => {
    if (isMobile) {
      el.setAttribute('data-aos', el.getAttribute('data-aos-mobile'));
    } else {
      el.setAttribute('data-aos', 'fade-right'); // Revert to default
    }
  });

  AOS.refresh();
}

window.addEventListener('load', updateAOS);
window.addEventListener('resize', updateAOS);