document.getElementById('m')?.addEventListener('click',()=>document.getElementById('n')?.classList.toggle('open'));

// Keep the careers portal focused on job openings while making the internship
// opportunity easy to discover from its careers landing page.
(() => {
  const path = window.location.pathname.replace(/\/$/, '');
  if (!path.endsWith('/careers/index.html') && !path.endsWith('/careers')) return;
  if (sessionStorage.getItem('internship-promo-dismissed')) return;

  const styles = document.createElement('style');
  styles.textContent = `
    .internship-promo-backdrop{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:20px;background:rgba(8,12,10,.78);backdrop-filter:blur(6px)}
    .internship-promo{position:relative;width:min(680px,100%);padding:clamp(28px,6vw,56px);overflow:hidden;border:2px solid #c9f36a;border-radius:20px;background:linear-gradient(145deg,#202723,#111713);color:#fff;box-shadow:0 30px 100px rgba(0,0,0,.5);font-family:'DM Sans',sans-serif}
    .internship-promo:before{content:'';position:absolute;width:250px;height:250px;right:-110px;top:-130px;border-radius:50%;background:#c9f36a;opacity:.12}
    .internship-promo-close{position:absolute;right:16px;top:14px;width:40px;height:40px;border:1px solid rgba(255,255,255,.25);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:24px;cursor:pointer}
    .internship-promo-badge{display:inline-block;padding:7px 12px;border-radius:999px;background:#c9f36a;color:#171b19;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
    .internship-promo h2{position:relative;margin:20px 0 12px;font-family:Manrope,sans-serif;font-size:clamp(30px,5vw,48px);line-height:1.08;letter-spacing:-.04em}
    .internship-promo p{position:relative;color:#d5dbd2;font-size:15px;line-height:1.7}
    .internship-promo ul{position:relative;display:grid;gap:10px;margin:22px 0;padding:0;list-style:none;color:#edf2e8;font-size:14px}
    .internship-promo li:before{content:'✓';margin-right:10px;color:#c9f36a;font-weight:900}
    .internship-promo-claim{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:12px;margin-top:8px;padding:15px 22px;border-radius:4px;background:#c9f36a;color:#171b19;text-decoration:none;font-size:13px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
    .internship-promo-note{position:relative;margin:16px 0 0!important;font-size:11px!important;color:#aeb8aa!important}
    @media(max-width:480px){.internship-promo{padding:30px 22px}.internship-promo-claim{width:100%}}
  `;
  document.head.appendChild(styles);

  const backdrop = document.createElement('div');
  backdrop.className = 'internship-promo-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-labelledby', 'internship-promo-title');
  backdrop.innerHTML = `
    <section class="internship-promo">
      <button class="internship-promo-close" type="button" aria-label="Close internship announcement">×</button>
      <span class="internship-promo-badge">Summer Internship Program</span>
      <h2 id="internship-promo-title">Build real skills with Stratos.</h2>
      <p>Explore guided, self-paced project tracks for students. Visit the internship portal to review available programs, details, and next steps.</p>
      <ul>
        <li>Project-based remote learning tracks</li>
        <li>Program details and eligibility in one place</li>
        <li>Credential and verification information</li>
      </ul>
      <a class="internship-promo-claim" href="https://stratos-internship.vercel.app/" target="_blank" rel="noopener noreferrer">Claim your slot <span aria-hidden="true">↗</span></a>
      <p class="internship-promo-note">Looking for a full-time role? Close this announcement to continue to Careers.</p>
    </section>`;

  const dismiss = () => {
    sessionStorage.setItem('internship-promo-dismissed', 'true');
    backdrop.remove();
  };
  backdrop.querySelector('.internship-promo-close').addEventListener('click', dismiss);
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) dismiss();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.contains(backdrop)) dismiss();
  });
  document.body.appendChild(backdrop);
})();
