# Writeup

## Approach

I split the application into three layers. I had the data layer read and join the two JSON files at request time, matching records on jurisdiction and job code, and filter out any empty salary grade fields before storing them. For the matching layer I used a token scoring approach to identify which job a user is asking about without relying on fuzzy matching libraries. The server action ties these together by loading the data, then finds the best match and passes only that single job record to the LLM. Also, There is a limitation on how the current data is being loaded on each request, because loadJobListings() reads the files on every request which wouldn't scale properly. This could be cached so the file reads happens only once.

## Matching Strategy

I normalized both the user query and each job listing's title and jurisdiction by lowercasing and stripping punctuation, I then split it into tokens. For each listing, I counted how many query tokens appeared in the listing's text and tracked the highest scoring match. This approach works well because it handles case variations and informal phrasing without using external libraries and scales linearly with dataset size.

## Challenges

The raw salary JSON had inconsistent key casing like "Jurisdiction" capitalized and "Job Code" with a space, which required the TypeScript interface to be in the raw shape exactly as it was than a normalized form. I also noticed the Ventura salary records use a different format that caused them to be filtered out by the dollar sign check. For cases like this there can be better way to have normalization in a production system.

## AI Assistance

I used Claude as a thinking partner throughout the build, talking through the file structure, the token scoring approach, and some code structure. I typed and adapted all the code myself and can speak to every decision made.