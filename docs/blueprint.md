# **App Name**: Vanta AI

## Core Features:

- Landing Page: Landing page with hero section, features, pricing, testimonials, and footer.
- Authentication: Email and Google sign-in authentication.
- Pricing Tiers: Free and Pro pricing tiers for access to more features.
- Dashboard Navigation: Dashboard sidebar navigation for Resume Builder, Cover Letter Builder, LinkedIn Outreach, and Settings.
- Resume Builder: Tool: AI-powered resume builder that generates a tailored resume. Includes a text input form and AI response output (editable + export as PDF/Word). User inputs either LinkedIn URL or plain text of their work experience. Uses OpenAI GPT API to generate a professional resume in ATS-friendly format. Displays result in editable rich text editor. Includes "Download as PDF" and "Download as Word" buttons. Saves resume to Supabase (linked to user account).
- Cover Letter Builder: Tool: AI-powered cover letter builder that generates a tailored cover letter. Includes a text input form and AI response output (editable + export as PDF/Word). User pastes a job description + uploads resume (from DB). AI generates a personalized cover letter. Editable text box output.  Export to PDF/Word.  Save to Supabase.
- LinkedIn Outreach Assistant: Tool: AI-powered LinkedIn outreach assistant that generates personalized outreach messages. User enters target company, role, and recruiter name. AI generates a personalized outreach message (friendly + professional). Copy button for easy pasting. Option to save messages in Supabase.
- Account Settings: Basic settings page to manage account.
- Stripe Subscription System: Stripe subscription system: Free plan (2 resumes, 2 cover letters, 5 outreach messages). Pro plan: $15/month → unlimited everything + Auto-Apply tool. Restrict usage based on plan (check Supabase DB).

## Style Guidelines:

- Primary color: Strong blue (#2962FF), a professional but not-too-corporate color implying knowledge, confidence and stability. This primary hue aims for a midpoint on the formality spectrum.
- Background color: Very light blue (#F0F5FF), of similar hue to the primary but unsaturated and bright for a calm, clean feel.
- Accent color: Electric purple (#C04CFF), highlighting energy, originality, and expressiveness.
- Font pairing: 'Space Grotesk' (sans-serif) for headings, combined with 'Inter' (sans-serif) for body text. Space Grotesk provides a tech-forward aesthetic, and Inter brings a clean and readable feel to the content.
- Line icons, related to career development and job searching, to illustrate the core features.
- Clean and modern layout, with a focus on readability and user experience.
- Subtle transitions and animations to enhance user engagement and provide feedback.