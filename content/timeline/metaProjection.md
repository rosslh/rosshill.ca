---
title: MetaProjection
eventType: project
date: 2019-08-20
website: https://2019.metaprojection.ca
repository: https://github.com/rosslh/metaprojection
image: metaprojection
thumbnail: metaprojection-thumb
blurb: An aggregator of multiple Canadian federal electoral projections which provides an overview of how the election is playing out, both federally and by district.
tags: [gatsby, graphql]
---

MetaProjection is a website that aggregates multiple Canadian federal electoral projections in order to provide an overview of how the election is playing out, both federally and by district. A map is displayed at the top of the page which indicates how each electoral district is likely to vote. The application uses the user’s geolocation to find their district and display its likely winner.

I made this project during the run-up to the 2019 Canadian federal election because I found myself checking multiple electoral projection sites that would sometimes have conflicting information. MetaProjection.ca gives a balanced overview of the election by combining the results of multiple reputable poll-trackers.

MetaProjection was built with Gatsby, a React.js static site generator. First, the projection sources are scraped for their data, which is saved into json files. This data is then queried from the React client using GraphQL.