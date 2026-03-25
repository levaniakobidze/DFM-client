# Frontend Pages and Flows

## Main Pages

### 1. Landing Page
Purpose:
- introduce the platform
- explain how it works
- encourage users to browse or create a dare

Suggested sections:
- hero
- short explanation
- featured dares
- categories
- CTA

---

### 2. Dare Feed Page
Purpose:
- show available dares
- allow browsing and filtering
- let users open dare details

Important UI elements:
- filter row
- category chips
- dare cards
- reward amount
- action button

---

### 3. Dare Details Page
Purpose:
- show full dare information
- let user accept the dare
- explain proof requirements
- show reward and status clearly

Possible sections:
- main content card
- reward summary
- instructions
- action panel

---

### 4. Create Dare Page
Purpose:
- allow users to create a new dare

Possible flow:
1. enter title and description
2. select category
3. enter reward amount
4. define proof requirement
5. review and submit

---

### 5. Submission Upload Page
Purpose:
- allow accepted user to upload proof

Possible elements:
- dare summary
- upload field
- notes field
- submit button
- upload status

---

### 6. Profile Page
Purpose:
- show user overview and activity

Possible sections:
- profile header
- stats
- created dares
- completed dares
- recent activity

---

### 7. Wallet Page
Purpose:
- show balance and transaction info

Possible sections:
- balance card
- pending rewards
- recent transactions
- payout CTA placeholder

---

## Core User Flows

### Flow A — Browse and Accept
1. user lands on website
2. user browses dare feed
3. user opens dare details
4. user clicks accept dare
5. user proceeds toward submission flow

---

### Flow B — Create Dare
1. user opens create dare page
2. fills form
3. reviews info
4. submits dare
5. sees success state

---

### Flow C — Upload Proof
1. user opens accepted dare
2. uploads proof
3. submits
4. sees pending review state

---

### Flow D — Check Wallet
1. user opens wallet page
2. sees available balance
3. sees pending rewards
4. sees transaction history

---

## Frontend Build Order Recommendation
1. app shell / layout
2. shared components
3. landing page
4. dare feed page
5. dare details page
6. create dare page
7. profile page
8. wallet page
9. submission upload page

---

## AI Instructions
When asked to build a page:
- follow these flow definitions
- keep the page MVP-level
- use mock data if backend is not ready
- keep future API integration in mind
- do not invent unrelated complex features