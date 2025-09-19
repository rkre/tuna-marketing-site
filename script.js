// Mobile menu toggle
function toggleMobileMenu() {
  const nav = document.querySelector(".nav")
  const btn = document.querySelector(".mobile-menu-btn")

  nav.classList.toggle("mobile-open")
  btn.classList.toggle("active")
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")

  if (window.scrollY > 50) {
    header.style.background = "rgba(3, 3, 48, 0.98)"
  } else {
    header.style.background = "rgba(3, 3, 48, 0.95)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".feature-card, .pricing-card, .step")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Button click handlers
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)

      // Handle specific button actions
      const buttonText = this.textContent.trim()

      if (buttonText.includes("Get Started") || buttonText.includes("Download")) {
        // Redirect to app store or signup
        console.log("Redirecting to app download...")
        // window.location.href = 'https://your-app-store-link';
      } else if (buttonText.includes("Contact")) {
        // Scroll to contact section
        const contactSection = document.querySelector("#contact")
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" })
        }
      } else if (buttonText.includes("Learn More")) {
        // Scroll to features section
        const featuresSection = document.querySelector("#features")
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })
})

// Newsletter form success handling
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "beehiiv_subscribe_success") {
    // Show success message
    const newsletterSection = document.querySelector(".newsletter-content")
    const successMessage = document.createElement("div")
    successMessage.innerHTML = `
            <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 8px; padding: 1rem; margin: 1rem 0; color: #22c55e;">
                <strong>🎉 Welcome to TUNA!</strong><br>
                You're all set! Check your email for confirmation and get ready for exclusive early access.
            </div>
        `
    newsletterSection.appendChild(successMessage)

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove()
    }, 5000)
  }
})

// Add loading states to buttons
function addLoadingState(button) {
  const originalText = button.innerHTML
  button.innerHTML = "Loading..."
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = originalText
    button.disabled = false
  }, 2000)
}

// Performance optimization: Lazy load images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute("data-src")
        }
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img)
    }
  })
})
