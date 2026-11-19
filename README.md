# Alamin Mahmud — B2B Lead Research Portfolio

A responsive, bilingual (English / Arabic RTL) static portfolio website for B2B Lead Research and Prospect Research.

## What's included

- Multi-page portfolio: Home, About, Services, Portfolio, Work Process, Data Quality, Tools, Contact, plus three project detail pages.
- AM monogram logo beside the name throughout the site.
- Office-atmosphere hero artwork and the supplied profile photo.
- English default, with an Arabic language toggle and right-to-left page layout.
- Three portfolio demonstrations based on the source workbooks:
  - Chicago Law Firms — 41 source records
  - New York Real Estate Agencies — 34 source records
  - Texas Dental Clinics — 27 source records
- Six masked sample rows per project. Full decision-maker names, job titles and the source-backed email status are visible. Email addresses, phone numbers and LinkedIn profile URLs are partially masked.
- The original Excel files are not included in this public website package.

## Important data notes

- Law and Real Estate workbook rows are labelled `Verified` in the source workbooks. The website describes this as a source-provided label, not a new or permanent deliverability guarantee.
- The Dental workbook has no email-verification status field. Its public sample is therefore labelled `Not independently verified`.
- Missing phone / website fields remain missing. No values are invented.
- The first Dental source row has a possible decision-maker / email alignment issue. It is retained as supplied and the project page flags it for manual review.

## Preview locally

Because the site loads JSON content with `fetch()`, open it through a local web server rather than double-clicking the HTML file.

For example, from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Download and extract this ZIP.
2. Open the GitHub repository currently used for your portfolio website.
3. Back up the current site files before replacing them.
4. Upload the contents of this folder to the repository's publishing branch/root. Keep the folder structure (`assets/` and `data/`) intact.
5. In the repository, confirm **Settings → Pages** is configured to publish from the correct branch and folder.
6. Wait for GitHub Pages to finish the deployment, then open the published site.

Do not upload the original private Excel workbooks to a public repository.

## Visual editing without editing code

The repository includes `.pages.yml` for **Pages CMS**. It maps the text, contact details and masked portfolio sample data to structured editing fields.

After this website is in your GitHub repository:

1. Open `https://app.pagescms.org/` and sign in with the GitHub account that owns the repository.
2. Install/authorize the Pages CMS GitHub App for that repository.
3. Open the repository. Pages CMS reads the included `.pages.yml` configuration.
4. Edit the **Site text and contact details** or **Portfolio project previews** entries, then save.

Pages CMS commits the edited content files back to GitHub. GitHub Pages then serves the updated static site. This does not require placing a GitHub token in the public website. Keep the GitHub account and repository access private to you.

Pages CMS is a separate third-party service; review its terms and privacy information before connecting your GitHub account.

## Main files

- `index.html` — home page
- `styles.css` — visual design and responsive layout
- `site.js` — language toggle, navigation and project rendering
- `data/site-content.json` — English / Arabic text and contact details
- `data/projects.json` — masked project preview data
- `.pages.yml` — Pages CMS editing configuration

