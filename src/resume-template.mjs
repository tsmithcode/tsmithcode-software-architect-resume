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
  const { labels, theme } = config;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${config.documentTitle}</title>
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
          linear-gradient(90deg, ${theme.wash}, transparent 45%),
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
        background: linear-gradient(90deg, ${theme.accent}, ${theme.accentLight}, ${theme.accentDark});
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
        color: ${theme.accentDark};
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
        color: ${theme.accentDark};
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
        border-left: 3px solid ${theme.accent};
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
        color: ${theme.accentDark};
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
        border: 1.5px solid ${theme.accent};
        border-radius: 0.08in;
        background: ${theme.calloutBackground};
        color: ${theme.calloutText};
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
            <h2>${labels.primaryList}</h2>
            <ul>${resumeList(config.primaryList)}</ul>
          </section>
          <section class="box">
            <h2>${labels.toolList}</h2>
            <div class="chips">${resumeChips(config.tools)}</div>
          </section>
          <section class="box">
            <h2>${labels.marketList}</h2>
            <div class="chips">${resumeChips(config.markets)}</div>
          </section>
        </aside>

        <div>
          <section>
            <h2>${labels.strengths}</h2>
            <div class="strength-grid">${config.strengths.map(strengthMarkup).join("")}</div>
          </section>

          <section>
            <h2>${labels.recentExperience}</h2>
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
          <p class="role">${config.secondPageRole}</p>
          <p class="contact">${config.contact.map((item) => `<span>${item}</span>`).join("")}</p>
        </div>
      </header>

      <div class="layout">
        <aside>
          <section class="box">
            <h2>${labels.reviewSignals}</h2>
            <ul>${resumeList(config.reviewSignals)}</ul>
          </section>
          <section class="box">
            <h2>${labels.contactPath}</h2>
            <ul>${resumeList(config.contactPath)}</ul>
          </section>
          <section class="box">
            <h2>${labels.handoff}</h2>
            <ul>${resumeList(config.handoff)}</ul>
          </section>
        </aside>

        <div>
          <section>
            <h2>${labels.earlierExperience}</h2>
            ${secondPageExperience.map(experienceMarkup).join("")}
          </section>

          <section>
            <h2>${labels.evidence}</h2>
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
            <h2>${labels.deliveryPattern}</h2>
            <div class="strength-grid">${config.deliveryPattern.map(strengthMarkup).join("")}</div>
          </section>

          <p class="callout">${config.callout}</p>
        </div>
      </div>
    </main>
  </body>
</html>`;
}
