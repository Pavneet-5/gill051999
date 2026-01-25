/* -----------------------------
   Link Click Tracking
----------------------------- */
document.querySelectorAll(
  ".header-link, .footer-link, .tracked-link"
).forEach(link => {
  link.addEventListener("click", () => {
    adobeDataLayer.push({
      event: "linkClick",
      link: {
        linkText: link.textContent.trim(),
        linkURL: link.getAttribute("href"),
        linkType: "navigation"
      }
    });

    console.log("Link click tracked:", link.textContent);
  });
});

/* -----------------------------
   Video Milestone Tracking
----------------------------- */
const video = document.getElementById("promoVideo");
const milestones = [25, 50, 75, 100];
const milestonesTracked = new Set();

video.addEventListener("timeupdate", () => {
  if (!video.duration) return;

  const percentPlayed = Math.floor(
    (video.currentTime / video.duration) * 100
  );

  milestones.forEach(milestone => {
    if (percentPlayed >= milestone && !milestonesTracked.has(milestone)) {
      milestonesTracked.add(milestone);

      adobeDataLayer.push({
        event: "videoMilestone",
        video: {
          videoName: "Product Promo",
          milestone: milestone
        }
      });

      console.log(`Video milestone: ${milestone}%`);
    }
  });
});

/* -----------------------------
   Form Submission Tracking
----------------------------- */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  adobeDataLayer.push({
    event: "formSubmit",
    form: {
      formName: "contact_us",
      formType: "lead"
    }
  });

  console.log("Form submitted");

  alert("Thanks! Your form was submitted.");
  e.target.reset();
});
/* -----------------------------
   Scroll Depth Tracking
----------------------------- */
const scrollMilestones = [25, 50, 75, 100];
const scrollTracked = new Set();

function getScrollPercent() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  return Math.floor(
    ((scrollTop + windowHeight) / documentHeight) * 100
  );
}

window.addEventListener("scroll", () => {
  const scrollPercent = getScrollPercent();

  scrollMilestones.forEach(milestone => {
    if (scrollPercent >= milestone && !scrollTracked.has(milestone)) {
      scrollTracked.add(milestone);

      adobeDataLayer.push({
        event: "scrollDepth",
        scroll: {
          depth: milestone,
          unit: "percent"
        }
      });

      console.log(`Scroll depth reached: ${milestone}%`);
    }
  });
});
