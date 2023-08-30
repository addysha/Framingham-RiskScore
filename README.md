# Framingham-RiskScore
Front end with javascript html and css webpage to calculate the Framingham risk score of a person.
implementing only a single web page, to the user it appears to be a website with multiple pages. with
(i) age/gender input,  (ii) cholesterol inputs (iii) smoking status input,  (iv) blood pressure input, and (v) the final risk score output.  
The pages are connected with previous/restart/next buttons.
**What is the Framingham Risk Score**
The Framingham Risk Score is a sex-specific algorithm used to estimate the 10-year cardiovascular risk of an individual. 
The Framingham Risk Score was first developed based on data obtained from the Framingham Heart Study, 
to estimate the 10-year risk of developing coronary heart disease.[1] In order to assess the 10-year cardiovascular disease risk,
cerebrovascular events, peripheral artery disease and heart failure were subsequently added as disease outcomes for the 2008 Framingham Risk Score, on top of coronary heart disease.

**How to Calculate/Score it:**

Framingham Risk Score for Women
Age: 20–34 years: Minus 7 points. 35–39 years: Minus 3 points. 40–44 years: 0 points. 45–49 years: 3 points. 50–54 years: 6 points. 55–59 years: 8 points. 60–64 years: 10 points. 65–69 years: 12 points. 70–74 years: 14 points. 75–79 years: 16 points.

Total cholesterol, mg/dL:

Age 20–39 years: Under 160: 0 points. 160-199: 4 points. 200-239: 8 points. 240-279: 11 points. 280 or higher: 13 points.
Age 40–49 years: Under 160: 0 points. 160-199: 3 points. 200-239: 6 points. 240-279: 8 points. 280 or higher: 10 points.
Age 50–59 years: Under 160: 0 points. 160-199: 2 points. 200-239: 4 points. 240-279: 5 points. 280 or higher: 7 points.
Age 60–69 years: Under 160: 0 points. 160-199: 1 point. 200-239: 2 points. 240-279: 3 points. 280 or higher: 4 points.
Age 70–79 years: Under 160: 0 points. 160-199: 1 point. 200-239: 1 point. 240-279: 2 points. 280 or higher: 2 points.
If cigarette smoker: Age 20–39 years: 9 points. • Age 40–49 years: 7 points. • Age 50–59 years: 4 points. • Age 60–69 years: 2 points. • Age 70–79 years: 1 point.

All non smokers: 0 points.

HDL cholesterol, mg/dL: 60 or higher: Minus 1 point. 50-59: 0 points. 40-49: 1 point. Under 40: 2 points.

Systolic blood pressure, mm Hg: Untreated: Under 120: 0 points. 120-129: 1 point. 130-139: 2 points. 140-159: 3 points. 160 or higher: 4 points. • Treated: Under 120: 0 points. 120-129: 3 points. 130-139: 4 points. 140-159: 5 points. 160 or higher: 6 points.

10-year risk in %: Points total: Under 9 points: <1%. 9-12 points: 1%. 13-14 points: 2%. 15 points: 3%. 16 points: 4%. 17 points: 5%. 18 points: 6%. 19 points: 8%. 20 points: 11%. 21=14%, 22=17%, 23=22%, 24=27%, >25= Over 30%

Framingham Risk Score for Men
Age: 20–34 years: Minus 9 points. 35–39 years: Minus 4 points. 40–44 years: 0 points. 45–49 years: 3 points. 50–54 years: 6 points. 55–59 years: 8 points. 60–64 years: 10 points. 65–69 years: 11 points. 70–74 years: 12 points. 75–79 years: 13 points.

Total cholesterol, mg/dL:

Age 20–39 years: Under 160: 0 points. 160-199: 4 points. 200-239: 7 points. 240-279: 9 points. 280 or higher: 11 points.
Age 40–49 years: Under 160: 0 points. 160-199: 3 points. 200-239: 5 points. 240-279: 6 points. 280 or higher: 8 points.
Age 50–59 years: Under 160: 0 points. 160-199: 2 points. 200-239: 3 points. 240-279: 4 points. 280 or higher: 5 points.
Age 60–69 years: Under 160: 0 points. 160-199: 1 point. 200-239: 1 point. 240-279: 2 points. 280 or higher: 3 points.
Age 70–79 years: Under 160: 0 points. 160-199: 0 points. 200-239: 0 points. 240-279: 1 point. 280 or higher: 1 point.
If cigarette smoker: Age 20–39 years: 8 points. • Age 40–49 years: 5 points. • Age 50–59 years: 3 points. • Age 60–69 years: 1 point. • Age 70–79 years: 1 point.

All non smokers: 0 points.

HDL cholesterol, mg/dL: 60 or higher: Minus 1 point. 50-59: 0 points. 40-49: 1 point. Under 40: 2 points.

Systolic blood pressure, mm Hg: Untreated: Under 120: 0 points. 120-129: 0 points. 130-139: 1 point. 140-159: 1 point. 160 or higher: 2 points. • Treated: Under 120: 0 points. 120-129: 1 point. 130-139: 2 points. 140-159: 2 points. 160 or higher: 3 points.

10-year risk in %: Points total: 0 point: <1%. 1-4 points: 1%. 5-6 points: 2%. 7 points: 3%. 8 points: 4%. 9 points: 5%. 10 points: 6%. 11 points: 8%. 12 points: 10%. 13 points: 12%. 14 points: 16%. 15 points: 20%. 16 points: 25%. 17 points or more: Over 30%
**-------------------------------------------------------------**
all logic applied in JS file
