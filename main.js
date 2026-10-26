document.addEventListener("DOMContentLoaded", () => {
  // ปีปัจจุบันในส่วนท้ายของทุกหน้า
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  // เมนูนำทางสำหรับหน้าจอมือถือ
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
    });
  }

  // กรองรายการอาหารตามหมวด
  const tabs = document.querySelectorAll(".menu-tab");
  const dishes = document.querySelectorAll(".menu-item");
  if (tabs.length && dishes.length) {
    tabs.forEach(tab => tab.addEventListener("click", () => {
      tabs.forEach(item => item.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.dataset.filter;
      dishes.forEach(dish => {
        dish.hidden = category !== "all" && dish.dataset.category !== category;
      });
    }));
  }

  // ตั้งค่าวันจองให้เลือกได้ตั้งแต่วันนี้เป็นต้นไป
  const dateInput = document.querySelector('input[name="date"]');
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
  }

  // ตัวอย่างการส่งฟอร์ม: แจ้งผลบนหน้าเว็บโดยไม่ส่งข้อมูลไปยังเซิร์ฟเวอร์
  const reservationForm = document.getElementById("reservationForm");
  if (reservationForm) {
    reservationForm.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(reservationForm);
      const message = reservationForm.querySelector(".form-message");
      message.textContent = `ได้รับคำขอจองโต๊ะของคุณ ${data.get("name")} แล้ว (ตัวอย่างการทำงาน — ยังไม่ได้ส่งข้อมูลไปยังร้านจริง)`;
      reservationForm.reset();
      if (dateInput) {
        const today = new Date();
        dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      }
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const message = contactForm.querySelector(".form-message");
      message.textContent = "ส่งข้อความตัวอย่างเรียบร้อยแล้ว — ต้องเชื่อมต่อระบบหลังบ้านเพื่อรับข้อความจริง";
      contactForm.reset();
    });
  }
});
