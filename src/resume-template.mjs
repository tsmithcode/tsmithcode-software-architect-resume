function resumeList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function resumeChips(items) {
  return items.map((item) => `<span>${item}</span>`).join("");
}

function strengthMarkup(strength) {
  return `
    <article class="strength">
      <h3>${strength.title}</h3>
      <p>${strength.body}</p>
    </article>
  `;
}

function experienceMarkup(job) {
  return `
    <article class="job">
      <div class="job-heading">
        <div>
          <h3>${job.company}</h3>
          <p>${job.role}</p>
        </div>
        <span>${job.period}</span>
      </div>
      <ul>${resumeList(job.bullets)}</ul>
    </article>
  `;
}

export function resumeHtml(config, logoSrc) {
  const firstPageExperience = config.experience.slice(0, 3);
  const secondPageExperience = config.experience.slice(3);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${config.name} software architect resume</title>
    <style>
      @page {
        size: Letter;
        margin: 0;
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        width: 8.5in;
        margin: 0;
        background: #f8fafc;
        color: #172033;
        font-family:
          Inter,
          ui-sans-serif,
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          sans-serif;
      }

      .resume-page {
        position: relative;
        width: 8.5in;
        min-height: 11in;
        padding: 0.42in 0.52in 0.4in;
        overflow: hidden;
        page-break-after: always;
        background:
          linear-gradient(90deg, rgba(20, 184, 166, 0.09), transparent 45%),
          #f8fafc;
      }

      .resume-page:last-child {
        page-break-after: auto;
      }

      .resume-page::before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 0.09in;
        content: "";
        background: linear-gradient(90deg, #14b8a6, #2dd4bf, #0f766e);
      }

      header {
        display: grid;
        grid-template-columns: 0.78in 1fr;
        gap: 0.16in;
        align-items: center;
        padding-bottom: 0.16in;
        border-bottom: 1.5px solid #cbd5e1;
      }

      .logo {
        width: 0.68in;
        height: 0.68in;
        object-fit: contain;
      }

      h1,
      h2,
      h3,
      p,
      ul {
        margin: 0;
      }

      h1 {
        color: #07111f;
        font-size: 25pt;
        line-height: 1.02;
        letter-spacing: 0;
      }

      .role {
        margin-top: 0.04in;
        color: #0f766e;
        font-size: 10.6pt;
        font-weight: 800;
      }

      .contact {
        display: flex;
        flex-wrap: wrap;
        gap: 0.035in 0.08in;
        margin-top: 0.08in;
        color: #475569;
        font-size: 7.7pt;
        font-weight: 650;
      }

      .contact span + span::before {
        padding-right: 0.08in;
        color: #94a3b8;
        content: "|";
      }

      .summary {
        margin-top: 0.16in;
        color: #253247;
        font-size: 9.9pt;
        line-height: 1.42;
      }

      .layout {
        display: grid;
        grid-template-columns: 2.12in 1fr;
        gap: 0.22in;
        margin-top: 0.18in;
      }

      aside {
        display: grid;
        gap: 0.12in;
        align-content: start;
      }

      section {
        margin-top: 0.17in;
      }

      .layout section:first-child,
      aside section:first-child {
        margin-top: 0;
      }

      h2 {
        color: #0f766e;
        font-size: 8.4pt;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .box {
        padding: 0.12in;
        border: 1px solid #cbd5e1;
        border-radius: 0.08in;
        background: rgba(255, 255, 255, 0.78);
      }

      .box h2 {
        margin-bottom: 0.08in;
      }

      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.055in;
      }

      .chips span {
        padding: 0.035in 0.07in;
        border: 1px solid #cbd5e1;
        border-radius: 999px;
        background: #ffffff;
        color: #334155;
        font-size: 7.2pt;
        font-weight: 800;
      }

      ul {
        padding-left: 0.16in;
        color: #253247;
        font-size: 8pt;
        line-height: 1.36;
      }

      li + li {
        margin-top: 0.04in;
      }

      .strength-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.1in;
      }

      .strength {
        min-height: 0.86in;
        padding: 0.1in 0.11in;
        border: 1px solid #d8e0ea;
        border-left: 3px solid #14b8a6;
        border-radius: 0.07in;
        background: #ffffff;
      }

      .strength h3,
      .job h3 {
        color: #07111f;
        font-size: 9.3pt;
        line-height: 1.18;
      }

      .strength p {
        margin-top: 0.045in;
        color: #475569;
        font-size: 7.8pt;
        line-height: 1.35;
      }

      .job {
        padding: 0.12in 0;
        border-bottom: 1px solid #d8e0ea;
      }

      .job:first-of-type {
        padding-top: 0.08in;
      }

      .job-heading {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.12in;
        align-items: start;
        margin-bottom: 0.07in;
      }

      .job-heading p {
        margin-top: 0.02in;
        color: #0f766e;
        font-size: 8pt;
        font-weight: 800;
      }

      .job-heading span {
        color: #64748b;
        font-size: 7.3pt;
        font-weight: 800;
        white-space: nowrap;
      }

      .proof-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.14in;
        margin-top: 0.11in;
      }

      .callout {
        margin-top: 0.18in;
        padding: 0.13in 0.16in;
        border: 1.5px solid #14b8a6;
        border-radius: 0.08in;
        background: #ecfeff;
        color: #164e63;
        font-size: 8.4pt;
        line-height: 1.35;
      }
    </style>
  </head>
  <body>
    <main class="resume-page">
      <header>
        <img class="logo" src="${logoSrc}" alt="" />
        <div>
          <h1>${config.name}</h1>
          <p class="role">${config.role}</p>
          <p class="contact">${config.contact.map((item) => `<span>${item}</span>`).join("")}</p>
        </div>
      </header>

      <p class="summary">${config.summary}</p>

      <div class="layout">
        <aside>
          <section class="box">
            <h2>Target roles</h2>
            <ul>${resumeList(config.targetRoles)}</ul>
          </section>
          <section class="box">
            <h2>Core tools</h2>
            <div class="chips">${resumeChips(config.tools)}</div>
          </section>
          <section class="box">
            <h2>Strong markets</h2>
            <div class="chips">${resumeChips(config.industries)}</div>
          </section>
        </aside>

        <div>
          <section>
            <h2>Software strengths</h2>
            <div class="strength-grid">${config.strengths.map(strengthMarkup).join("")}</div>
          </section>

          <section>
            <h2>Recent experience</h2>
            ${firstPageExperience.map(experienceMarkup).join("")}
          </section>
        </div>
      </div>
    </main>

    <main class="resume-page">
      <header>
        <img class="logo" src="${logoSrc}" alt="" />
        <div>
          <h1>${config.name}</h1>
          <p class="role">Software architecture, modernization, data systems, and delivery ownership</p>
          <p class="contact">${config.contact.map((item) => `<span>${item}</span>`).join("")}</p>
        </div>
      </header>

      <div class="layout">
        <aside>
          <section class="box">
            <h2>Review signals</h2>
            <ul>
              <li>Business-critical system ownership</li>
              <li>Hands-on architecture and delivery</li>
              <li>Clear written technical communication</li>
              <li>Modernization without avoidable disruption</li>
              <li>Practical support and handoff discipline</li>
            </ul>
          </section>
          <section class="box">
            <h2>Contact path</h2>
            <ul>
              <li>Start with role, work model, timeline, and target system.</li>
              <li>Share sensitive code, records, or internal diagrams only after the right channel is agreed.</li>
            </ul>
          </section>
          <section class="box">
            <h2>Handoff artifacts</h2>
            <ul>${resumeList(config.handoff)}</ul>
          </section>
        </aside>

        <div>
          <section>
            <h2>Earlier experience</h2>
            ${secondPageExperience.map(experienceMarkup).join("")}
          </section>

          <section>
            <h2>Selected software proof</h2>
            <div class="proof-grid">
              <article class="box">
                <ul>${resumeList(config.evidence.slice(0, 2))}</ul>
              </article>
              <article class="box">
                <ul>${resumeList(config.evidence.slice(2))}</ul>
              </article>
            </div>
          </section>

          <section>
            <h2>Architecture delivery pattern</h2>
            <div class="strength-grid">${config.deliveryPattern.map(strengthMarkup).join("")}</div>
          </section>

          <p class="callout">
            Public resume content is intentionally generalized. Private code, customer records, internal diagrams, credentials, compensation posture, and employer-confidential implementation details should move through the right review channel.
          </p>
        </div>
      </div>
    </main>
  </body>
</html>`;
}
