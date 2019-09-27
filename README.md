
Website portal for government employees who wish to access data based on the 
criteria of internet availability/computer ownership and commuting to work/car
ownership. 

This information is broken up into provinces, so users will only see the 
statistical data they are tasked with. The following users are set up in the 
system:

Username    Password    Province

ffoley      warrior     munster
gsmith      trainer     leinster
hobrien     textile     ulster
sstevens    botanist    connaught

---
### UX

Users can access the portal from a login screen. Once successfully entered, the
main page is displayed with various graphs showing the different statistical 
data for the province assigned to the user. 

The user can interact with the various graphs to get further breakdown on the
data. For example, clicking on any of the counties in the top graph will allow
the graphs below to only show data relevant to the particular county.

---
### Technologies

HTML5,
CSS3,
Javascript,
Bootstrap 4.3.1,
FontAwesome 4.7.0
D3/DC Javascript graphing libraries
Jasmin

---
### Development issues

To get this site to work, I needed to integrate 2 data files into javascript via
D3/DC to allow the data to be visually represented. There was however a major 
problem that I needed to overcome. The files that I acquired from the Irish
government website (https://data.gov.ie/) were only representing totals from
various voting districts in the various counties. In order for the graphs to 
allow for the cross comparisons, this data would need to be able to show 
individual results for each person individual and their individual responses.

In order to achieve this, I created a javascript file to process the information
and create individual records. This file (calculations.js) is not part of the
website, but it is included to show my workings. The functionality works using 
the overall totals of the verious criteria for a given province and using these
totals to create a random number and assign an individual record with a 
percentage value based on where the random number lay in the sub total ranges.

For instance, if there are 100 people surveyed and 25 people use broadband, an
individual result would have a 25% chance of getting assigned that particular
value. The sub total values should add up to 100, so basing a random number from
1 to 100, there should be a represantitive set of values generated for a set of
records whose number is based on a proportion of overall population in a 
province.

These calculated records are then stored in the 4 csv files used by the graphs
on the website (connaught.csv, leinster.csv, munster.csv, ulster.csv). 

This allowed for a good representation, but one comparison graph 
(Travel time percentages of transport used) was failing with respect to the
fact that people who travel by foot or bicycle were being shown to have 
travelled at times which would not be a reasonable time. This meant that for the
columns of Transport and Time Travelled, there had to be a correlation. For 
people who use either bicycles or who walk, their random number had to lie
within a shorter range of time traveled.

### Findings

With the records finalized and the graphs viewed, there were some items of
interest that came from viewing this generated data. The large number of people
with no interest was very high. With such a figure, you would expect there to
be a much larger figure for the 'Other' internet option, but this was not the 
case. For most people, it was either people with broadband or no internet at
all.

Another was the correlation of households with 3 or more cars and how they
travel to work. You would expect to see a lot of these people using their cars
for work travel but, from some of the data charts, they also appear to be 
people with multiple cars who use alternative travel to get to work. 

### Conclusions

Because of the randomness of the way the information is created, it is hard to 
make definitive conclusions based on the data. However, even given the random
nature fo the data, it would also be fair to say that some of these results may
represent some of the population and may give a small snapshot into real life
peoples answers. Also, given the correlation between time travel and transport
used that was missed, it may also be the case that there are others which I have
not taken into account.

---
### Testing

There is full Jasmin testing done on the login page to handle incorrect user 
names, invalid passwords a successful login. There was also testing done on the 
graphs to ensure that any data group select would update the graphs 
accordingly. The site itself is primarly for desktop, and has been test across
various browsers such as IE, Firefox and Chrome. It does work with tablet views,
but mobiles will not work due to the D3 graphs which proved troublesome in 
making them work with smaller views.

---
### Deployment

The site is currently being hosted at:

https://rayomeara.github.io/milestone-project-two/

And is deployed directly from the master branch. The site update automatically
upon new commits to the master branch.

To run locally, clone the repository using the command:

git clone https://github.com/rayomeara/milestone-project-two.git
