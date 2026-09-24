# Product Requirements Document — GENESIS Event Website

**Project:** GENESIS — The Beginning of a New Era
**Organizer:** Rotaract Club of Daffodil International University
**Event Theme:** A Day of Ideas & Inspiration
**Technology:** Next.js 16.2.x + Supabase + Vercel
**Primary Goal:** Present the event professionally and convert visitors into completed registrations.
**Secondary Goal:** Give organizers a secure admin system to manage registrations, verify payments, track attendance, and export registration data.

---

# 1. Product Vision

The website should feel like the official digital home of a major university-level event, not a generic event template or AI-generated landing page.

The experience should combine:

* The visual identity of **GENESIS**
* The credibility of **Rotaract Club of Daffodil International University**
* Information about the event
* Speaker profiles
* Program highlights
* Club information
* Registration
* Payment information
* Administrative registration management

The website must be:

* Professional
* Clean
* Editorial
* Fast
* Mobile-first
* Fully responsive
* Accessible
* Easy to navigate
* Easy to register from a phone
* Secure
* Maintainable

---

# 2. Core Design Direction

## 2.1 Design Philosophy

The design must **not** look like an AI-generated website.

### Explicitly avoid

* Gradients
* Neon colors
* Excessive glassmorphism
* Huge rounded cards
* Excessive pill-shaped UI
* Random floating shapes
* AI-generated illustrations
* Emoji-based icons
* Generic SaaS dashboard styling
* Excessive shadows
* Over-animation
* Giant centered hero typography with no information hierarchy
* Every section being a collection of cards
* Excessive use of blue
* Excessive use of decorative elements

### Preferred

* Strong typography
* Editorial layouts
* Precise spacing
* Fine borders
* Controlled color usage
* Real event photography
* Existing GENESIS artwork
* Custom/simple line icons
* High-quality speaker photography
* Subtle animations
* Strong information hierarchy
* Large but controlled typography
* Asymmetric layouts where appropriate
* Clean forms
* Excellent mobile UX

---

# 3. Brand Direction

The existing event artwork should be treated as the visual source of truth.

The artwork contains:

* Deep burgundy/wine
* Dark purple/charcoal
* Gold/yellow
* Rotaract magenta
* DIU blue
* Warm white

The website should **not use every color equally**.

### Suggested hierarchy

**Primary**

* Deep Burgundy / Wine
* Warm White
* Charcoal

**Secondary**

* Rotaract Magenta
* Gold

**Supporting**

* DIU Blue

Colors should be used intentionally for:

* Links
* Buttons
* Active states
* Section accents
* Important information
* Registration states

---

# 4. Target Users

## Primary

### 4.1 University Students

Students visiting through:

* Facebook
* Messenger
* WhatsApp
* Instagram
* Direct links

They should be able to understand the event within seconds and register from a mobile device.

### 4.2 Rotaract Members

Members need a specialized registration flow:

* General Member
* Board Member
* Ex-Rotaractor

### 4.3 Guests

External participants need a simple guest registration process.

### 4.4 Event Administrators

Administrators need to:

* View registrations
* Search participants
* Filter participants
* Verify payments
* Track attendance
* Export Excel
* View registration statistics

---

# 5. Website Structure

```text
/
│
├── Landing Page
│
├── /register
│   └── Registration System
│
├── /registration-success
│
└── /admin
    │
    ├── /login
    │
    ├── /dashboard
    │
    ├── /registrations
    │
    └── /registrations/[id]
```

---

# 6. Navigation

## Desktop

Use a **professional horizontal navbar**.

Example:

```text
┌──────────────────────────────────────────────────────────────┐
│ [Rotaract Logo]   Event   Speakers   Experience   About   FAQ │
│                                                       Register│
└──────────────────────────────────────────────────────────────┘
```

### Navigation items

* Event
* Speakers
* Experience
* About Club
* FAQ

Primary CTA:

**Register Now**

The navbar should remain readable without becoming oversized.

---

# 7. Mobile Navigation

On mobile, **do not show the desktop navigation links**.

Use:

```text
┌────────────────────────────────────┐
│ [Logo]                         [☰] │
└────────────────────────────────────┘
```

Clicking the hamburger opens a proper mobile navigation panel.

### Mobile menu

```text
GENESIS

Event
Speakers
Experience
About Club
FAQ

──────────────

Register Now
```

The menu should:

* Animate smoothly
* Prevent background scrolling while open
* Close when a navigation item is selected
* Close when clicking outside
* Have a clear close button
* Be keyboard accessible

---

# 8. Landing Page

---

## Section 01 — Hero

### Purpose

Immediately communicate:

* Event identity
* Event name
* Theme
* Date
* Venue
* Registration CTA

### Content

**GENESIS**

**The Beginning of a New Era**

**A Day of Ideas & Inspiration**

`03 October`

`ICH, Daffodil International University`

CTA:

**Register Now**

Secondary information:

**Rotaract Club of Daffodil International University**

---

## Hero Visual

The supplied GENESIS artwork should inspire the visual treatment.

Do not simply place the complete poster as the entire background.

Instead:

* Use the GENESIS identity
* Use the event artwork selectively
* Use real artwork as visual material
* Preserve readability
* Keep text as actual HTML text

### Important

Critical information must **never be embedded only inside an image**.

This ensures:

* Mobile readability
* Accessibility
* SEO
* Responsive behavior

---

# 9. Section 02 — Event Introduction

### Heading

**More than an event. A space for ideas.**

Content derived from:

> How often do we get the chance to sit in the same room with people who can change the way we think?

Then:

> Not just another seminar.
> Not just another certificate.
> Not just another day on the university calendar.

Continue with the GENESIS concept.

### Goal

Create emotional connection before presenting the practical event information.

---

# 10. Section 03 — Event Information

### Heading

**GENESIS at a Glance**

Display:

```text
DATE
03 October

VENUE
ICH
Daffodil International University

ORGANIZED BY
Rotaract Club of
Daffodil International University
```

When the exact event time is finalized, add:

```text
TIME
[Time]
```

---

# 11. Section 04 — Speakers

### Heading

**Three Voices. Different Perspectives. One Platform.**

The design should prioritize photography and typography.

---

## Speaker 01

### Dr. Imran Mahmud

**Professor & Head**
Department of Software Engineering
Faculty of Science and Information Technology

### Session

**Empowering Academic Excellence with Artificial Intelligence**

### Description

AI is changing the way we learn, create and solve problems — from classrooms to future careers.

---

## Speaker 02

### Sabbir Sarkar

**Cambridge CELTA-Certified Master Trainer**

### Description

A seasoned educator and trainer with extensive experience in:

* Communication
* Soft skills
* Public speaking
* Teaching
* Professional development

### Session

**Communication, Confidence & Professional Development**

---

## Speaker 03

A third speaker is referenced in the supplied promotional copy, but their details have not yet been provided.

The implementation must therefore support a third speaker dynamically.

Database/content structure:

```text
speaker_1
speaker_2
speaker_3
```

The third speaker should **not be fabricated**.

---

# 12. Speaker Component

Each speaker should contain:

* Photograph
* Name
* Designation
* Organization
* Session title
* Short description

### Desktop

Use an editorial two/three-column arrangement.

### Mobile

Stack vertically:

```text
[Photo]

Dr. Imran Mahmud
Designation

Session
Description

────────────

[Photo]

Sabbir Sarkar
...
```

---

# 13. Section 05 — Learn / Create / Grow / Connect

### Heading

**What GENESIS Is About**

Four themes:

### Learn

Discover new ideas, perspectives and knowledge.

### Create

Turn ideas into possibilities.

### Grow

Develop confidence, communication and professional skills.

### Connect

Meet people and create meaningful relationships.

Do not make these generic colorful cards.

Use typography, dividers and subtle iconography.

---

# 14. Section 06 — What You'll Experience

### Heading

**More Than a Session**

Include:

### Inspiring Sessions

Hear from distinguished speakers from education, technology and professional development.

### Lunch & Refreshments

Food and refreshments during the event.

### Cultural Experience

An opportunity to enjoy creativity and shared cultural experiences.

### E-Certificate

Registered participants who attend the event receive an e-certificate.

### Networking

Meet fellow students, members and inspiring people.

### Book, Food & Gifts

Available through the optional event package.

---

# 15. Section 07 — Event Experience

This should be a strong typography-led section.

### Heading

**Don't come just to attend.**

Content:

> Come to participate.
> Come to ask.
> Come to listen.
> Come to meet someone new.
> Come with an open mind.

Then:

> Because university life isn't only about collecting grades.

> It's about collecting experiences, people, ideas and stories that shape who we become.

This section should have significant whitespace.

No card grid.

---

# 16. Section 08 — Program / Schedule

The supplied content doesn't yet include exact times.

Therefore, the PRD defines the component but leaves the schedule content configurable.

Example:

```text
The Day

Registration
        ↓
Opening
        ↓
AI & Academic Excellence
        ↓
Communication & Professional Development
        ↓
Cultural Experience
        ↓
Lunch & Networking
        ↓
Closing
```

When actual times are available:

```text
10:00 AM
Registration

10:30 AM
Opening

11:00 AM
Session
...
```

### Mobile

Vertical timeline.

### Desktop

Horizontal or editorial timeline.

---

# 17. Section 09 — About Rotaract Club

### Heading

**About the Rotaract Club of Daffodil International University**

Content:

> The Rotaract Club of Daffodil International University is an international organization focused on self-development.

Then introduce the three core objectives.

---

## Community Service

Creating positive social impact through meaningful initiatives.

## Leadership & Professional Development

Developing leadership abilities, professional skills and career readiness.

## Fellowship & Global Understanding

Building meaningful friendships, cultural understanding and international connections.

---

# 18. Section 10 — Professional Development

Because the club specifically emphasizes professional development, include:

### Beyond the Classroom

Content:

> We equip our members with essential soft skills for the workplace and career guidance through interactive sessions, panel discussions and practical experiences.

This connects the club's purpose directly to the GENESIS event.

---

# 19. Section 11 — Club Impact

### Heading

**From Ideas to Impact**

This section should contain actual club initiatives.

Structure:

```text
[Large Photo]

PAST INITIATIVE
Title
Description


[Photo]

RECENT EVENT
Title
Description
```

Then:

### Looking Ahead

Future initiatives/plans.

The actual content should be supplied by the organizers.

---

# 20. Section 12 — Gallery

### Heading

**Moments That Matter**

Use real event photographs.

### Desktop

Editorial grid.

### Mobile

Single-column/controlled two-column image layout.

Avoid:

* Infinite carousel
* Auto-rotating slideshow
* Excessive animations

Images should use:

* Lazy loading
* Responsive image sizes
* Proper aspect ratios
* Optimized formats where possible

---

# 21. Section 13 — Registration Information

### Heading

**Be Part of GENESIS**

Content:

> Bring your curiosity. Be part of something special.

Explain:

### E-Certificate

Every registered participant who attends the event will receive an e-certificate.

### Optional Package

Participants who want the:

* Book
* Food
* Gifts

can select the optional package for:

**BDT 100**

CTA:

**Register Now**

---

# 22. Section 14 — FAQ

Initial questions:

### Will I receive an e-certificate?

Registered participants who attend the event will receive an e-certificate.

### What is included in the optional package?

The optional package includes the book, food and gifts specified by the organizers.

### Who can register?

Guests and eligible Rotaract participants can register.

### What payment methods are available?

Payment options depend on the selected registration category.

### Can Board Members register?

Yes. Board Members can select their position during registration.

### Where is the event?

ICH, Daffodil International University.

The FAQ should be accordion-based.

---

# 23. Section 15 — Final CTA

Large editorial CTA:

> **Bring Your Curiosity.**

> Be part of something special.

Button:

**Register for GENESIS**

Subtext:

`A Day of Ideas & Inspiration`

---

# 24. Footer

Footer should contain:

### Club

Rotaract Club of Daffodil International University

### Event

GENESIS
The Beginning of a New Era

### Navigation

* Event
* Speakers
* Experience
* About Club
* FAQ
* Register

### Social

* Facebook
* Instagram
* Other official social links

### Copyright

`© 2026 Rotaract Club of Daffodil International University`
Tecnology Partner UNLEFT LLC (will redirect at unleft.space)

---

# 25. Registration System

Registration should be built as a **dynamic multi-state form**, not one massive form.

---

# 26. Registration Entry Screen

Route:

```text
/register
```

Heading:

**Register for GENESIS**

Subheading:

Choose your registration category to continue.

Two primary options:

```text
┌───────────────────────┐
│       GUEST           │
│                       │
│ Register as a guest   │
└───────────────────────┘

┌───────────────────────┐
│    CLUB MEMBER        │
│                       │
│ Register as a member  │
└───────────────────────┘
```

---

# 27. Guest Registration

After selecting Guest:

```text
Guest Registration
```

Fields:

### Name

Required.

### Student ID

Required.

### Email

Required.

Must validate email format.

### Contact Number

Required.

Should support Bangladesh phone numbers.

### How did you know about the program?

Required.

Recommended dropdown options:

* Facebook
* Instagram
* WhatsApp
* Friend / Colleague
* Club Member
* University
* Poster / Flyer
* Other

Allow:

**Other**

with conditional text input.

---

# 28. Guest Optional Package

Display:

```text
Optional Event Package

☐ I want the Book + Food + Gift package
   Additional BDT 100
```

When checked:

```text
Optional Package
BDT 100
```

The final amount should update dynamically.

---

# 29. Guest Payment

### Payment Method

Required.

Initially:

**bKash**

Display:

```text
bKash

01877162078
```

### Transaction ID

Required if payment is required.

---

# 30. Guest Payment Summary

Before submission:

```text
Registration
BDT 0 / applicable amount

Optional Package
BDT 100

────────────────

Total
BDT XXX
```

The actual base guest fee should be configured rather than hard-coded if it is still undecided.

---

# 31. Club Member Registration

After selecting:

**Club Member**

show:

```text
Select Member Type

General Member
Board Member
Ex-Rotaractor
```

Only after selecting one should the relevant fields appear.

---

# 32. General Member

### Registration Fee

**BDT 100**

### Fields

* Name *
* Student ID *
* Email *
* Contact Number *

### Payment Method

bKash

```text
01877162078
```

### Payment Reference

Display:

```text
Reference:
racgen_[Your Name]
```

### Transaction ID

Required.

---

# 33. Board Member

### Position

Required dropdown.

Options:

* President
* Vice President
* Secretary
* Joint Secretary
* Treasurer
* Directors
* IPP
* Other

If:

**Other**

is selected:

```text
Enter Position *
```

---

# 34. Board Member Fee Logic

The fee must be calculated automatically.

| Position        | Registration Fee |
| --------------- | ---------------: |
| IPP             |         BDT 1000 |
| President       |          BDT 500 |
| Vice President  |          BDT 500 |
| Secretary       |          BDT 500 |
| Joint Secretary |          BDT 500 |
| Treasurer       |          BDT 300 |
| Directors       |          BDT 300 |
| Other           |     Configurable |

The admin should eventually be able to change these amounts without modifying frontend code.

---

# 35. Board Member Fields

* Position *
* Name *
* Student ID *
* Email *
* Contact Number *

### Payment Method

Options:

* bKash
* Bank Transfer

### bKash

```text
01877162078
```

### Bank

```text
PRIME BANK PLC

A/C:
2188213015190
```

### Reference

Your supplied requirement says:

```text
racgen_ (last 3 digit of your payment number)
```

This needs to be implemented as an instruction rather than automatically generated unless the exact desired format is confirmed.

### Transaction ID

Required.

---

# 36. Ex-Rotaractor

### Registration Fee

**BDT 1000**

### Fields

* Name *
* Student ID *
* Email *
* Contact Number *
* Club Name *

### Payment Method

* bKash
* Bank Transfer

### bKash

```text
01877162078
```

### Bank

```text
PRIME BANK PLC
A/C: 2188213015190
```

### Transaction ID

The original requirement does not explicitly list Transaction ID under Ex-Rotaractor, but the system should support it because payment verification requires a transaction/reference identifier.

This should be confirmed before final production.

---

# 37. Payment UI

Never hide payment instructions in tiny text.

Use a clean payment panel:

```text
PAYMENT

bKash
01877162078

OR

Prime Bank PLC
A/C: 2188213015190
```

When the user selects a payment method, only relevant information appears.

---

# 38. Form Validation

Every required field must have:

* Required validation
* Format validation
* Inline error message
* Accessible error state

Example:

```text
Email *
[ abc@ ]

Please enter a valid email address.
```

Do not wait until submission to show every error.

---

# 39. Duplicate Registration Protection

The backend should prevent accidental duplicate registrations.

Potential duplicate checks:

* Student ID
* Email
* Transaction ID

The exact uniqueness rules should be configurable.

For example:

```text
A participant cannot register twice using the same Student ID.
```

If duplicate:

```text
A registration already exists for this Student ID.
Please contact the organizing team if you believe this is an error.
```

---

# 40. Registration Submission

On submission:

1. Validate client-side
2. Validate again server-side
3. Verify category
4. Calculate registration fee server-side
5. Calculate package fee server-side
6. Calculate final amount server-side
7. Insert registration into Supabase
8. Generate registration ID
9. Return success
10. Display confirmation

**Never trust the amount calculated by the browser.**

---

# 41. Registration ID

Generate a human-friendly ID.

Example:

```text
GEN-2026-00001
GEN-2026-00002
GEN-2026-00003
```

The ID should be unique.

---

# 42. Registration Success Page

Route:

```text
/registration-success
```

Display:

# Registration Confirmed

```text
Thank you for registering for GENESIS.

Registration ID
GEN-2026-00042

Name
John Doe

Category
Club Member — General Member

Payment
bKash

Amount
BDT 100

Status
Payment Pending Verification
```

CTA:

**Return to Event**

Optional future feature:

**Download Registration Receipt**

---

# 43. Admin System

Route:

```text
/admin
```

The admin interface must be visually separate from the public event website.

It should prioritize:

* Data
* Speed
* Clarity
* Tables
* Filters
* Actions

No unnecessary visual decoration.

---

# 44. Admin Authentication

Recommended production architecture:

```text
Supabase Auth
       ↓
Admin User
       ↓
Admin Role
       ↓
Protected Admin Routes
```

The `.env` should contain sensitive configuration such as:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service role key must **never** be exposed to client-side code.

---

# 45. Admin Bootstrap Credentials

Since you specifically want to initially provide admin credentials through `.env`, the implementation can support an initial bootstrap mechanism.

For example:

```env
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

But these must only be consumed server-side during initial admin setup.

After deployment, production authentication should use Supabase Auth rather than checking a plaintext `.env` password on every request.

---

# 46. Admin Dashboard

Route:

```text
/admin/dashboard
```

Top-level statistics:

```text
TOTAL REGISTRATIONS
428

GUESTS
172

CLUB MEMBERS
256

PENDING PAYMENTS
74

VERIFIED
354
```

Additional statistics:

```text
General Members
Board Members
Ex-Rotaractors

Optional Packages
Total Revenue
```

---

# 47. Registration Management

Route:

```text
/admin/registrations
```

Table:

| Registration ID | Name | Type   | Category | Payment | Amount | Status   |
| --------------- | ---- | ------ | -------- | ------- | -----: | -------- |
| GEN-0001        | ...  | Guest  | Guest    | bKash   |    100 | Pending  |
| GEN-0002        | ...  | Member | General  | bKash   |    100 | Verified |

---

# 48. Registration Filters

Admin should be able to filter by:

### Registration Type

* All
* Guest
* Club Member

### Member Type

* General
* Board
* Ex-Rotaractor

### Position

* President
* VP
* Secretary
* etc.

### Payment Method

* bKash
* Bank

### Payment Status

* Pending
* Verified
* Rejected

### Attendance

* Not Marked
* Attended
* Absent

### Package

* With Package
* Without Package

---

# 49. Search

Search by:

* Name
* Student ID
* Email
* Phone
* Registration ID
* Transaction ID

Search should work server-side for large datasets.

---

# 50. Registration Details

Route:

```text
/admin/registrations/[id]
```

Display:

## Participant

* Name
* Student ID
* Email
* Phone

## Registration

* Registration ID
* Participant Type
* Member Type
* Position
* Club Name

## Payment

* Registration fee
* Package fee
* Total
* Payment method
* Transaction ID
* Payment status

## Event

* Attendance
* Registration date

---

# 51. Payment Verification

Admin can change:

```text
Pending
↓
Verified
```

or:

```text
Pending
↓
Rejected
```

When rejected, optionally require:

```text
Rejection Reason
```

Every status modification should record:

* Who changed it
* When it was changed
* Previous status
* New status

---

# 52. Attendance

Admin can mark:

```text
Attended
Absent
Not Marked
```

This is useful because the e-certificate requirement depends on actual attendance.

---

# 53. Excel Export

Admin should have:

**Export Excel**

The exported `.xlsx` should contain:

```text
Registration ID
Registration Date
Name
Student ID
Email
Contact Number
Participant Type
Member Type
Position
Club Name
Registration Fee
Optional Package
Package Amount
Total Amount
Payment Method
Transaction ID
Payment Status
Attendance
Referral Source
```

---

# 54. Export Filters

The admin should be able to export:

### All

Every registration.

### Current Filter

Only currently filtered records.

Example:

```text
Board Members
+
Verified Payments
+
Attended
```

Then:

**Export Excel**

---

# 55. Excel Generation

Excel generation should happen server-side.

Recommended library:

```text
xlsx
```

or another stable `.xlsx` generation package compatible with the project.

The file name should be meaningful:

```text
GENESIS-Registrations-2026-09-24.xlsx
```

or:

```text
GENESIS-Board-Members-Verified.xlsx
```

---

# 56. Supabase Database Architecture

Recommended tables:

```text
admins
registrations
payment_records
attendance
event_settings
speakers
schedule_items
faq_items
gallery_items
club_content
```

For the initial version, some content can remain in code/configuration rather than database-driven.

---

# 57. Registrations Table

Suggested schema:

```text
registrations

id
registration_id
participant_type
member_type
position
name
student_id
email
contact_number
club_name
referral_source
referral_other
payment_method
transaction_id
registration_fee
package_selected
package_fee
total_amount
payment_status
attendance_status
created_at
updated_at
```

---

# 58. Registration Types

Use controlled values rather than arbitrary strings.

```text
participant_type:

guest
club_member
```

Member:

```text
member_type:

general
board
ex_rotaractor
```

---

# 59. Payment Status

```text
pending
verified
rejected
```

Attendance:

```text
not_marked
attended
absent
```

---

# 60. Event Settings

Create an `event_settings` structure for configurable values.

Example:

```text
event_name
event_tagline
event_date
event_time
venue
registration_open
registration_close
guest_fee
package_fee
bkash_number
bank_name
bank_account
```

This prevents needing to edit code when basic event information changes.

---

# 61. Registration Fee Configuration

Instead of hard-coding:

```javascript
if position === "IPP"
```

store fee configuration.

Example:

```text
IPP → 1000
President → 500
Vice President → 500
Secretary → 500
Joint Secretary → 500
Treasurer → 300
Director → 300
```

This allows future changes from the admin configuration.

---

# 62. Security Architecture

This is a critical part of the implementation.

### Public

Can:

* View event
* Submit registration

Cannot:

* Read registrations
* Read other users
* Access admin
* Export data

### Admin

Can:

* Read registrations
* Update payment status
* Update attendance
* Export data
* View dashboard

---

# 63. Supabase Row Level Security

RLS must be enabled.

Public users should **not** have permission to run arbitrary:

```text
SELECT *
FROM registrations
```

They should only be allowed to submit registrations through a controlled server-side operation/API.

Admin access must be authenticated and authorized.

---

# 64. Sensitive Information

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
ADMIN_PASSWORD
private admin credentials
```

in:

* Client JavaScript
* Browser network responses
* Public source code
* Git repository

---

# 65. Anti-Spam / Abuse Protection

Because registration is publicly accessible, implement protection against automated submissions.

Recommended:

* Rate limiting
* Server-side validation
* Duplicate checks
* Request throttling
* Optional CAPTCHA/Turnstile if abuse becomes significant

Do not rely exclusively on frontend validation.

---

# 66. SEO

The public landing page should be SEO-ready.

### Title

```text
GENESIS — The Beginning of a New Era | Rotaract Club of DIU
```

### Description

A concise description about:

* GENESIS
* Rotaract Club of DIU
* A Day of Ideas & Inspiration
* Event date
* Registration

### Open Graph

When shared on:

* Facebook
* Messenger
* WhatsApp
* LinkedIn

it should display the proper event poster/OG image.

---

# 67. Social Sharing

Create an optimized Open Graph image based on the supplied GENESIS artwork.

The OG image should contain:

```text
GENESIS
The Beginning of a New Era
A Day of Ideas & Inspiration
03 October
Rotaract Club of DIU
```

Do not generate a new generic AI illustration.

Use the existing event identity.

---

# 68. Performance Requirements

The site should prioritize fast loading on mobile networks.

### Requirements

* Use Next.js image optimization
* Lazy-load below-the-fold images
* Avoid unnecessarily huge images
* Compress event photographs
* Avoid loading unnecessary JavaScript
* Minimize third-party scripts
* Use server components where appropriate
* Keep client components limited to interactive UI
* Avoid animation libraries unless genuinely necessary

---

# 69. Responsive Breakpoints

Design for:

### Mobile

Approximately:

```text
320–767px
```

### Tablet

```text
768–1023px
```

### Desktop

```text
1024px+
```

The exact CSS implementation should remain fluid rather than designing only for three fixed widths.

---

# 70. Mobile-First Requirements

The mobile design must prioritize:

* One-handed navigation
* Large touch targets
* Easy form filling
* Clear labels
* Minimal typing
* Large CTA
* Readable payment instructions
* Fast image loading
* Sticky registration CTA where appropriate

Minimum touch target:

**44 × 44px**

---

# 71. Mobile Registration UX

The registration form should not feel like a desktop form squeezed onto a phone.

Use:

```text
Step 1
Who are you?

Guest
Club Member

↓

Step 2
Choose category

General
Board
Ex-Rotaractor

↓

Step 3
Your details

↓

Step 4
Payment

↓

Step 5
Review

↓

Confirmed
```

A step indicator can be used:

```text
01 Details
02 Payment
03 Review
```

This is preferable to one extremely long form.

---

# 72. Form Persistence

If the user accidentally refreshes during registration, temporary form state can optionally be preserved in browser session/local storage.

Do **not** store sensitive payment information unnecessarily.

At minimum, preserve:

* Selected category
* Name
* Email
* Contact
* Position

Do not persist unnecessary sensitive information.

---

# 73. Error Handling

Network failure:

```text
We couldn't submit your registration.

Please check your connection and try again.
```

Database failure:

```text
Something went wrong while submitting your registration.

Your form was not confirmed.
Please try again.
```

Duplicate:

```text
A registration already exists with these details.
```

Never show raw:

```text
Postgres error
Supabase error
Stack trace
```

to the user.

---

# 74. Loading States

Use proper loading states.

Example:

```text
Submitting Registration...
```

The submit button must become disabled during submission to prevent duplicate requests.

---

# 75. Success State

The success state must be visually clear.

```text
✓

Registration Confirmed

GEN-2026-00124
```

Do not use a giant animated celebration.

Keep it professional.

---

# 76. Accessibility

The website must support:

* Semantic HTML
* Keyboard navigation
* Proper labels
* Focus states
* Screen reader-friendly buttons
* Accessible accordions
* Accessible mobile navigation
* Sufficient color contrast
* Alt text for meaningful images
* Reduced-motion preference

---

# 77. Image Requirements

For each image:

```text
alt="Dr. Imran Mahmud"
```

not:

```text
alt="image123.jpg"
```

Decorative images should use appropriate empty alt attributes.

---

# 78. Technical Stack

## Frontend

```text
Next.js 16.2.x
React
TypeScript
```

Use the App Router.

---

# 79. Styling

Preferred:

```text
CSS Modules
```

or a carefully structured global CSS architecture.

Tailwind can be used only if you specifically decide to include it, but the design system must remain custom.

The visual result is more important than the styling library.

---

# 80. Backend

Use:

```text
Supabase
```

for:

* PostgreSQL
* Authentication
* Registration data
* Admin authorization
* Optional storage

---

# 81. Deployment

```text
GitHub
   ↓
Vercel
   ↓
Next.js
   ↓
Supabase
```

Environment variables configured inside Vercel.

---

# 82. Recommended Project Structure

```text
src/
│
├── app/
│   ├── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── registration-success/
│   │   └── page.tsx
│   │
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── registrations/
│   │   │   └── [id]/
│   │   └── layout.tsx
│   │
│   └── api/
│       ├── registrations/
│       ├── admin/
│       └── export/
│
├── components/
│   ├── navigation/
│   ├── hero/
│   ├── speakers/
│   ├── event/
│   ├── club/
│   ├── gallery/
│   ├── registration/
│   ├── admin/
│   └── ui/
│
├── lib/
│   ├── supabase/
│   ├── validation/
│   ├── registration/
│   ├── export/
│   └── auth/
│
├── types/
│
├── config/
│
└── styles/
```

---

# 83. Component Architecture

Important reusable components:

```text
Navbar
MobileMenu
Hero
EventIntro
EventInfo
SpeakerSection
SpeakerCard
ExperienceSection
ProgramTimeline
ClubSection
ImpactSection
Gallery
FAQ
RegistrationCTA
Footer
```

Registration:

```text
RegistrationTypeSelector
MemberTypeSelector
GuestForm
GeneralMemberForm
BoardMemberForm
ExRotaractorForm
PaymentMethodSelector
PaymentInformation
RegistrationSummary
RegistrationSuccess
```

Admin:

```text
AdminSidebar
AdminHeader
DashboardStats
RegistrationTable
RegistrationFilters
RegistrationDetails
PaymentStatus
AttendanceStatus
ExportButton
```

---

# 84. State Management

Do not introduce a large state-management library unnecessarily.

For registration:

* React state
* Form validation
* Server actions/API routes
* URL state where useful

Keep the architecture simple.

---

# 85. Form Validation Library

Recommended:

```text
Zod
```

Use the same validation schema conceptually on server and client wherever practical.

Important:

**Server validation is authoritative.**

---

# 86. Admin Dashboard UX

Desktop:

```text
┌───────────────┬──────────────────────────────────────┐
│               │                                      │
│ Dashboard     │  Registration Overview               │
│ Registrations │                                      │
│ Settings      │  [Stats] [Stats] [Stats] [Stats]    │
│               │                                      │
│               │  Recent Registrations                │
│               │  ────────────────────────────────    │
│               │  Table                               │
│               │                                      │
└───────────────┴──────────────────────────────────────┘
```

Mobile:

Sidebar becomes a drawer.

Tables become horizontally scrollable or transform into compact participant cards where appropriate.

---

# 87. Admin Dashboard Visual Style

Unlike the public website, the admin panel should be:

* Dense
* Functional
* Neutral
* Data-focused

Avoid making it look like a marketing page.

Use:

* Tables
* Borders
* Status badges
* Small charts only where useful
* Filters
* Search
* Clear actions

---

# 88. Admin Status Colors

Use semantic colors:

**Pending**

Neutral/warning.

**Verified**

Positive/green.

**Rejected**

Error/red.

Don't use colors merely for decoration.

---

# 89. Event Content Management

For version 1, the following can remain configuration/static:

* Event description
* Speakers
* FAQ
* About club
* Schedule

Database-driven content is not required unless organizers need to update the website themselves.

The **registration data**, however, must be database-driven.

This keeps the initial product simpler and more reliable.

---

# 90. Future CMS Capability

Architecture should not prevent future CMS functionality.

Possible future:

```text
/admin/content
```

where admins can edit:

* Event details
* Speakers
* Schedule
* FAQ
* Gallery
* Club information

But **not required for V1**.

---

# 91. Analytics

Optional but recommended:

Track:

* Landing page visits
* Register button clicks
* Registration started
* Registration completed
* Registration category
* Referral source

Avoid collecting unnecessary personal analytics.

---

# 92. Registration Funnel

Track:

```text
Landing Page
      ↓
Register Click
      ↓
Participant Type
      ↓
Category
      ↓
Form Started
      ↓
Payment
      ↓
Review
      ↓
Registration Completed
```

This will help identify where users abandon registration.

---

# 93. Important Business Rules

### Rule 1

A participant must select their registration category before category-specific fields load.

### Rule 2

Registration fee must be calculated server-side.

### Rule 3

Package fee must be calculated server-side.

### Rule 4

Transaction ID must be validated.

### Rule 5

Duplicate registrations must be detected.

### Rule 6

Only administrators can access participant data.

### Rule 7

Only administrators can change payment status.

### Rule 8

Only administrators can export participant data.

### Rule 9

Attendance can be marked by authorized administrators.

### Rule 10

E-certificates are for participants who registered and attended.

---

# 94. Registration Fee Configuration

The final configuration should look conceptually like:

```text
Guest
    Base Fee: [TBD]
    Optional Package: 100

General Member
    100

Board
    IPP: 1000
    President: 500
    Vice President: 500
    Secretary: 500
    Joint Secretary: 500
    Treasurer: 300
    Directors: 300
    Other: [TBD]

Ex-Rotaractor
    1000
```

---

# 95. Content That Still Needs Final Confirmation

The PRD deliberately does **not invent** the missing information.

Still required:

### Event

* Exact year
* Exact time
* Full venue/address
* Registration opening/closing dates

### Speaker

* Third speaker information, if there really is one

### Club

* Past initiative #1
* Past initiative #2
* Recent events
* Future plans

### Registration

* Guest base registration fee
* Exact referral options
* Exact Board `Other` fee
* Exact meaning of Board payment reference
* Whether Ex-Rotaractor requires Transaction ID
* Whether bank transfer is available for every category

---

# 96. Non-Functional Requirements

## Performance

Target:

* Fast first load
* Optimized mobile images
* Minimal client-side JS
* No unnecessary dependencies

## Security

* RLS
* Secure authentication
* Server-side validation
* Rate limiting
* No service key exposure

## Reliability

Registration submission must be transactional.

A user should never see:

> Registration successful

if the registration wasn't actually stored.

---

# 97. Definition of Done — Public Website

The public website is complete when:

* [ ] Desktop navbar works
* [ ] Mobile hamburger menu works
* [ ] Hero is responsive
* [ ] Event information is visible
* [ ] Speaker section works
* [ ] Experience section works
* [ ] Schedule works
* [ ] Club information works
* [ ] Gallery works
* [ ] FAQ works
* [ ] Registration CTA works
* [ ] Website is responsive from 320px upward
* [ ] Images are optimized
* [ ] SEO metadata exists
* [ ] OG sharing image exists
* [ ] Accessibility basics are implemented
* [ ] No gradient-based visual design
* [ ] No emoji-based UI
* [ ] No generic AI-style components

---

# 98. Definition of Done — Registration

* [ ] Guest registration works
* [ ] Club Member selection works
* [ ] General Member works
* [ ] Board Member works
* [ ] Ex-Rotaractor works
* [ ] Position-based fee calculation works
* [ ] Optional package works
* [ ] Payment method switching works
* [ ] Transaction ID captured
* [ ] Duplicate protection works
* [ ] Server-side validation works
* [ ] Registration ID generated
* [ ] Supabase insertion works
* [ ] Success page works
* [ ] Mobile form works properly

---

# 99. Definition of Done — Admin

* [ ] Admin login works
* [ ] Unauthorized users cannot access admin
* [ ] Dashboard statistics work
* [ ] Registration table works
* [ ] Search works
* [ ] Filters work
* [ ] Registration details work
* [ ] Payment status can be changed
* [ ] Attendance can be marked
* [ ] Excel export works
* [ ] Filtered export works
* [ ] Admin cannot accidentally expose private data
* [ ] Supabase RLS is enabled
* [ ] Service role key remains server-only

---

# 100. Final Experience

The final website should communicate this journey:

```text
                    GENESIS
                       │
                       ↓
             The Beginning of
                 a New Era
                       │
                       ↓
             A Day of Ideas
               & Inspiration
                       │
                       ↓
          ┌────────────┼────────────┐
          ↓            ↓            ↓
        LEARN        CREATE        GROW
                       │
                       ↓
                    CONNECT
                       │
                       ↓
                 THE SPEAKERS
                       │
                       ↓
              THE EXPERIENCE
                       │
                       ↓
               ABOUT THE CLUB
                       │
                       ↓
                BE PART OF IT
                       │
                       ↓
                 REGISTER
                       │
                       ↓
              PAYMENT + CONFIRM
                       │
                       ↓
                ADMIN SYSTEM
```

The key principle is:

**The landing page sells the experience.
The registration page removes friction.
The admin panel removes operational work.**

And the visual system should make all three feel like parts of the **same GENESIS identity**, while keeping the registration and admin interfaces significantly more functional than decorative.
