---
title: MetaProjection.ca
eventType: project
date: 2019-08-20
website: https://2021.metaprojection.ca
repository: https://github.com/rosslh/MetaProjection.ca
image: metaprojection
thumbnail: metaprojection-thumb
thumbnailBorder: true
excerpt: An aggregator of Canadian electoral projections
tags: [typescript, gatsby, graphql, nodedotjs]
---

<a href="https://2021.metaprojection.ca" target="_blank" rel="noopener noreferrer">MetaProjection</a> aggregates Canadian federal electoral projections so visitors can see how the election is shaping up, both nationally and by district. A map at the top of the page shows how each electoral district is likely to vote. The site uses the visitor's geolocation to find their district and surface its likely winner.

I built this in the run-up to the 2019 Canadian federal election because I kept checking multiple projection sites and finding conflicting numbers. MetaProjection.ca combines the results of several reputable poll-trackers so you get a balanced read on the race in one place.

I built MetaProjection with Gatsby, a React.js static site generator. The build scrapes each projection source, saves the data as JSON, and then the React client queries it through GraphQL.

I updated it for the 2021 federal election.
