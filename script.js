// ChemDetect — تفاعلات بسيطة للواجهة فقط.
document.addEventListener("DOMContentLoaded", () => {
  // مساحة الفيديو مؤقتة عمدًا. عند اختيار فيديو، يمكن استبدالها بعنصر <video>
  // أو تضمين فيديو مناسب مع التأكد من صحة المحتوى وسلامته.
  const videoPlaceholder = document.getElementById("videoPlaceholder");
  if (videoPlaceholder) {
    videoPlaceholder.setAttribute("aria-label", "مساحة مؤقتة لإضافة فيديو التفاعل لاحقًا");
  }

  // تحديث سنة حقوق المشروع تلقائيًا إذا أضيفت لاحقًا إلى التذييل.
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
});
