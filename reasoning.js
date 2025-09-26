
// reasoning.js
// Contains all chapters and questions for Reasoning

const reasoningData = {
  chapters: [
    {
      name: 'Counting of Figures',
      sets: [
        // Set 1: Questions 1-20
        [

        ],
        
        // Set 2: Questions 21-40
        [
        
        ],
        // Set 4: Questions 61-80
        
          
      ]// End of Noun
    },

    {
      name: 'Calendar',
      sets: [
        // Set 1: Questions 1-20
        [
          { question: "What was the day of the week on 15th August, 1947?", options: ["Friday", "Saturday", "Sunday", "Thursday"], answer: 0, year: "SSC CGL 2016" },
          { question: "If today is Monday, after 61 days, it will be:", options: ["Wednesday", "Saturday", "Tuesday", "Thursday"], answer: 1, year: "SSC CHSL 2018" },
          { question: "Which of the following is not a leap year?", options: ["2000", "2004", "1900", "1996"], answer: 2, year: "SSC CGL 2017" },
          { question: "The calendar for the year 2007 will be the same for the year:", options: ["2014", "2016", "2017", "2018"], answer: 3, year: "SSC CGL 2019" },
          { question: "On what dates of April, 2001 did Wednesday fall?", options: ["1st, 8th, 15th, 22nd, 29th", "2nd, 9th, 16th, 23rd, 30th", "3rd, 10th, 17th, 24th", "4th, 11th, 18th, 25th"], answer: 3, year: "SSC CGL 2020" },
          { question: "It was Sunday on Jan 1, 2006. What was the day of the week on Jan 1, 2010?", options: ["Sunday", "Saturday", "Friday", "Wednesday"], answer: 2, year: "SSC CGL 2018" },
          { question: "The last day of a century cannot be:", options: ["Monday", "Wednesday", "Tuesday", "Friday"], answer: 2, year: "SSC CGL 2015" },
          { question: "How many odd days are there in 100 years?", options: ["1", "2", "3", "5"], answer: 3, year: "SSC CHSL 2019" },
          { question: "If the first day of the year (other than a leap year) was Friday, then which was the last day of that year?", options: ["Wednesday", "Thursday", "Friday", "Sunday"], answer: 2, year: "SSC CGL 2021" },
          { question: "What was the day of the week on 28th May, 2006?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 3, year: "SSC CGL 2017" },
          { question: "If 6th March, 2005 is Monday, what was the day of the week on 6th March, 2004?", options: ["Sunday", "Saturday", "Tuesday", "Wednesday"], answer: 0, year: "SSC MTS 2019" },
          { question: "The year next to 1990 will have the same calendar as that of the year 1990.", options: ["1996", "2001", "2002", "1998"], answer: 1, year: "SSC CGL 2022" },
          { question: "If the day before yesterday was Thursday, when will Sunday be?", options: ["Today", "Tomorrow", "Day after tomorrow", "Two days after today"], answer: 1, year: "SSC CHSL 2020" },
          { question: "On 8th Feb, 2005 it was Tuesday. What was the day of the week on 8th Feb, 2004?", options: ["Tuesday", "Monday", "Sunday", "Wednesday"], answer: 2, year: "SSC CGL 2019" },
          { question: "How many days are there in x weeks and x days?", options: ["7x*x", "8x", "14x", "7x"], answer: 1, year: "SSC CGL 2018" },
          { question: "The first Republic Day of India was celebrated on 26th January, 1950. It was a:", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 0, year: "SSC CGL 2017" },
          { question: "If 1st January 2001 was Monday, then what was the day of the week on 31st December 2001?", options: ["Wednesday", "Monday", "Tuesday", "Sunday"], answer: 1, year: "SSC CHSL 2021" },
          { question: "If the 3rd day of a month is Monday, which of the following will be the 5th day from 21st of that month?", options: ["Tuesday", "Monday", "Wednesday", "Thursday"], answer: 2, year: "SSC CGL 2020" },
          { question: "A year starting with Monday and ending with Tuesday. How many days are there in the year?", options: ["365", "366", "364", "Cannot be determined"], answer: 1, year: "SSC CGL 2022" },
          { question: "What will be the day of the week on 1st Jan, 2033?", options: ["Monday", "Friday", "Saturday", "Sunday"], answer: 2, year: "SSC CGL 2021" }
        ],

        // Set 2: Questions 1-20
        [
          { question: "The calendar for the year 1996 will be the same for the year:", options: ["2012", "2020", "2024", "2028"], answer: 2, year: "SSC CGL 2019" },
          { question: "If January 1, 1992 was a Wednesday, what day of the week was January 1, 1993?", options: ["Thursday", "Friday", "Saturday", "Monday"], answer: 1, year: "SSC CHSL 2018" },
          { question: "What was the day on 1st Jan 1901?", options: ["Monday", "Tuesday", "Wednesday", "Friday"], answer: 1, year: "SSC CGL 2017" },
          { question: "If the 11th of a month is Saturday, what date will be 4 days after the 3rd Tuesday of the month?", options: ["24", "25", "26", "27"], answer: 1, year: "SSC CGL 2022" },
          { question: "Mrs. Susheela celebrated her wedding anniversary on Tuesday, 30th September 1997. When will she celebrate her next wedding anniversary on the same day?", options: ["30th September 2003", "30th September 2004", "30th September 2002", "30th October 2003"], answer: 0, year: "SSC CGL 2020" },
          { question: "If the national day of a country was celebrated on the 4th Saturday of a month, then find the date of celebration, given that the first day of that month is a Tuesday.", options: ["24th", "25th", "26th", "27th"], answer: 2, year: "SSC CHSL 2019" },
          { question: "How many times does the 29th day of the month occur in 400 consecutive years?", options: ["4497", "4400", "4800", "4922"], answer: 0, year: "SSC CGL 2018" },
          { question: "If the second day of a month is a Friday, which of the following would be the last day of the next month which has 31 days?", options: ["Sunday", "Monday", "Tuesday", "Data inadequate"], answer: 3, year: "SSC CGL 2021" },
          { question: "My brother is 562 days older than me, while my sister is 75 weeks older than him. If my sister was born on Tuesday, on which day was I born?", options: ["Monday", "Wednesday", "Thursday", "Tuesday"], answer: 2, year: "SSC CGL 2022" },
          { question: "What was the day of the week on 16th July, 1776?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 1, year: "SSC CGL 2019" },
          { question: "If the 25th of August in a year is Thursday, the number of Mondays in that month is:", options: ["3", "4", "5", "6"], answer: 2, year: "SSC CHSL 2017" },
          { question: "The calendar for the year 2005 is the same as for the year:", options: ["2010", "2011", "2012", "2013"], answer: 1, year: "SSC CGL 2016" },
          { question: "If February 1, 1996 is Wednesday, what day is March 3, 1996?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 0, year: "SSC MTS 2018" },
          { question: "If the day after tomorrow is Sunday, which day was tomorrow's day before yesterday?", options: ["Friday", "Saturday", "Monday", "Thursday"], answer: 3, year: "SSC CGL 2020" },
          { question: "How many leap years are there in 400 years?", options: ["96", "97", "98", "99"], answer: 1, year: "SSC CGL 2018" },
          { question: "The last day of the 20th century was:", options: ["Monday", "Wednesday", "Friday", "Sunday"], answer: 3, year: "SSC CGL 2021" },
          { question: "If the third Friday of a month is on the 16th, what is the date of the fourth Tuesday of that month?", options: ["20th", "22nd", "27th", "29th"], answer: 2, year: "SSC CGL 2022" },
          { question: "What was the day of the week on 17th June, 1998?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2, year: "SSC CGL 2019" },
          { question: "A month starts on a Saturday and has 30 days. How many Wednesdays are in that month?", options: ["3", "4", "5", "6"], answer: 1, year: "SSC CHSL 2020" },
          { question: "If the 10th day of a month, having 31 days, is a Tuesday, then which day of the week will the last day of the same month be?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 0, year: "SSC CGL 2021" }
        ],
        // Set 3
        [
          { question: "The calendar for 2020 will be the same for which of the following years?", options: ["2040", "2044", "2048", "2052"], answer: 2, year: "SSC CGL 2022" },
          { question: "If 18th February 1997 was a Tuesday, then what was the day on 18th February 1999?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 3, year: "SSC CHSL 2018" },
          { question: "What was the day of the week on 2nd October 1869?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 1, year: "SSC CGL 2017" },
          { question: "If the 5th day of a month is two days after Monday, what day of the week will be the 19th of the month?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 1, year: "SSC CGL 2021" },
          { question: "Suresh was born on 4th October 1999. Dinesh was born 6 days before Suresh. The Independence Day of that year fell on Sunday. Which day was Dinesh born?", options: ["Tuesday", "Wednesday", "Monday", "Sunday"], answer: 2, year: "SSC CGL 2020" },
          { question: "If the seventh day of a month is three days earlier than Friday, what day will it be on the nineteenth day of the month?", options: ["Sunday", "Monday", "Wednesday", "Friday"], answer: 0, year: "SSC CHSL 2019" },
          { question: "How many odd days are there in a period of 300 years?", options: ["0", "1", "2", "3"], answer: 1, year: "SSC CGL 2018" },
          { question: "If the first day of a leap year is a Monday, then what day of the week is the last day of that year?", options: ["Monday", "Tuesday", "Wednesday", "Sunday"], answer: 1, year: "SSC CGL 2021" },
          { question: "Reaching a place of appointment on Friday, I found that I was two days earlier than the scheduled day. If I had reached on the following Wednesday, how many days late would I have been?", options: ["One day", "Two days", "Three days", "Four days"], answer: 0, year: "SSC CGL 2022" },
          { question: "What was the day of the week on 20th June 1837?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 1, year: "SSC CGL 2019" },
          { question: "If the 23rd of a month is a Sunday, what day it would have been two weeks and four days earlier?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2, year: "SSC CHSL 2017" },
          { question: "The calendar for the year 1897 is the same as for the year:", options: ["1903", "1905", "1908", "1910"], answer: 0, year: "SSC CGL 2016" },
          { question: "If April 1, 2003 was a Tuesday, what day is April 1, 2005?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: 2, year: "SSC MTS 2018" },
          { question: "If today is Friday, what will be the day 363 days from now?", options: ["Saturday", "Sunday", "Thursday", "Friday"], answer: 2, year: "SSC CGL 2020" },
          { question: "How many days are there from 2nd Jan 1995 to 15th March 1995?", options: ["71", "72", "73", "74"], answer: 1, year: "SSC CGL 2018" },
          { question: "The first day of the 21st century (1st Jan 2001) was a:", options: ["Monday", "Tuesday", "Wednesday", "Sunday"], answer: 0, year: "SSC CGL 2021" },
          { question: "If the fourth Saturday of a month is the 22nd day, what is the 13th day of the month?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 2, year: "SSC CGL 2022" },
          { question: "What was the day of the week on 13th April 1919?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 2, year: "SSC CGL 2019" },
          { question: "A month with 31 days starts on a Friday. How many Tuesdays are in that month?", options: ["3", "4", "5", "Cannot be determined"], answer: 2, year: "SSC CHSL 2020" },
          { question: "If the 15th day of a month, having 30 days, is a Wednesday, then which day of the week will the first day of the same month be?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 1, year: "SSC CGL 2021" }
        ],
        // Set 4
        [
          { question: "The calendar for which year will be the same as for the year 2009?", options: ["2015", "2016", "2017", "2018"], answer: 0, year: "SSC CGL 2022" },
          { question: "If March 1, 2008 was a Saturday, what day of the week was March 1, 2009?", options: ["Sunday", "Monday", "Tuesday", "Friday"], answer: 0, year: "SSC CHSL 2018" },
          { question: "What was the day on 31st December 1 AD?", options: ["Monday", "Tuesday", "Wednesday", "Friday"], answer: 0, year: "SSC CGL 2017" },
          { question: "If the 1st of a month is a Sunday, what date will be 3 days after the 4th Wednesday of the month?", options: ["28", "29", "30", "31"], answer: 2, year: "SSC CGL 2022" },
          { question: "Karan remembers that his sister's birthday is not after 18th August. Karan's mother remembers that his sister's birthday is before 20th August but after 17th August. On which date of August is his sister's birthday?", options: ["17th", "18th", "19th", "20th"], answer: 1, year: "SSC CGL 2020" },
          { question: "If the day after tomorrow is Saturday, what day was three days before yesterday?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: 2, year: "SSC CHSL 2019" },
          { question: "How many odd days are there in a period of 200 years?", options: ["1", "2", "3", "5"], answer: 2, year: "SSC CGL 2018" },
          { question: "If a leap year starts on a Friday, on what day will it end?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 1, year: "SSC CGL 2021" },
          { question: "A man was born on Jan 1, 1980. How many birthdays will he celebrate up to Jan 1, 2020?", options: ["39", "40", "41", "42"], answer: 1, year: "SSC CGL 2022" },
          { question: "What was the day of the week on 26th November 1949?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 2, year: "SSC CGL 2019" },
          { question: "If the 1st of October is a Sunday, then the 1st of November will be:", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2, year: "SSC CHSL 2017" },
          { question: "The calendar for the year 2002 is the same as for the year:", options: ["2008", "2010", "2012", "2013"], answer: 3, year: "SSC CGL 2016" },
          { question: "If May 10, 1997 was a Monday, what was the day of the week on Oct 10, 2000?", options: ["Saturday", "Sunday", "Monday", "Tuesday"], answer: 1, year: "SSC MTS 2018" },
          { question: "If today is Wednesday, what will be the day 84 days from now?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2, year: "SSC CGL 2020" },
          { question: "How many days are there from 5th March 1988 to 10th August 1988 (inclusive)?", options: ["158", "159", "160", "161"], answer: 2, year: "SSC CGL 2018" },
          { question: "The first day of a century must be:", options: ["Monday, Tuesday, or Wednesday", "Monday, Wednesday, or Friday", "Monday, Tuesday, Thursday, or Saturday", "Monday, Wednesday, Friday, or Sunday"], answer: 2, year: "SSC CGL 2021" },
          { question: "If the second day of a month is a Sunday, which of the following would be the 31st day of that month?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: 2, year: "SSC CGL 2022" },
          { question: "What was the day of the week on 25th December 1995?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: 1, year: "SSC CGL 2019" },
          { question: "A month with 28 days starts on a Tuesday. How many Fridays are in that month?", options: ["3", "4", "5", "Cannot be determined"], answer: 1, year: "SSC CHSL 2020" },
          { question: "If the 20th day of a month is a Thursday, what day of the week was the 1st day of that month?", options: ["Monday", "Tuesday", "Wednesday", "Sunday"], answer: 0, year: "SSC CGL 2021" }
        ],
        // Set 5
        [
          { question: "The calendar for 2011 will be the same for which of the following years?", options: ["2017", "2021", "2022", "2024"], answer: 2, year: "SSC CGL 2022" },
          { question: "If June 1, 2000 was a Thursday, what day of the week was June 1, 2001?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 1, year: "SSC CHSL 2018" },
          { question: "What was the day on 1st January, 1 AD?", options: ["Sunday", "Monday", "Tuesday", "Saturday"], answer: 1, year: "SSC CGL 2017" },
          { question: "If the 2nd of a month is a Sunday, what date will be the 4th Friday of the month?", options: ["24th", "25th", "26th", "27th"], answer: 2, year: "SSC CGL 2022" },
          { question: "Ashish's birthday is on Monday 29th May. On what day of the week will be Rachna's Birthday in the same year if Rachna was born on 17th November?", options: ["Saturday", "Wednesday", "Friday", "Sunday"], answer: 2, year: "SSC CGL 2020" },
          { question: "If the day before yesterday was Saturday, what day will be the day after tomorrow?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 1, year: "SSC CHSL 2019" },
          { question: "Which two months in a year have the same calendar?", options: ["June, October", "April, November", "April, July", "October, December"], answer: 2, year: "SSC CGL 2018" },
          { question: "If a year (which is not a leap year) has 53 Sundays, what is the day on the 1st of January of that year?", options: ["Sunday", "Monday", "Saturday", "Cannot be determined"], answer: 0, year: "SSC CGL 2021" },
          { question: "A man was born on 29th Feb 1896. How many birthdays did he celebrate up to the year 1920?", options: ["5", "6", "7", "8"], answer: 1, year: "SSC CGL 2022" },
          { question: "What was the day of the week on 1st April 2000?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 2, year: "SSC CGL 2019" },
          { question: "If the 30th of January 2013 was a Thursday, what was the day on 2nd March 2013?", options: ["Tuesday", "Thursday", "Saturday", "Sunday"], answer: 3, year: "SSC CHSL 2017" },
          { question: "The calendar for the year 1982 is the same as for the year:", options: ["1988", "1990", "1993", "1994"], answer: 2, year: "SSC CGL 2016" },
          { question: "If July 4, 1776 was a Thursday, what day was July 4, 1777?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: 2, year: "SSC MTS 2018" },
          { question: "If today is Tuesday, what will be the day 100 days from now?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: 2, year: "SSC CGL 2020" },
          { question: "How many odd days are there in the period from 2001 to 2010 (inclusive)?", options: ["10", "11", "12", "13"], answer: 2, year: "SSC CGL 2018" },
          { question: "The first day of the 19th century (1st Jan 1801) was a:", options: ["Monday", "Tuesday", "Wednesday", "Friday"], answer: 2, year: "SSC CGL 2021" },
          { question: "If the third day of a month is a Tuesday, which of the following will be the 25th day of the month?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 1, year: "SSC CGL 2022" },
          { question: "What was the day of the week on 22nd February 2012?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2, year: "SSC CGL 2019" },
          { question: "A month with 31 days ends on a Wednesday. How many Saturdays are in that month?", options: ["3", "4", "5", "Cannot be determined"], answer: 1, year: "SSC CHSL 2020" },
          { question: "If the 1st day of a month is a Friday, what day of the week will the 29th day of that month be?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 1, year: "SSC CGL 2021" }
        ],
     ]
    },
    // End of Pronoun

    {
      name: 'Direction and Distance',
      sets: [
        // Set 1: Questions 1-20
        [
          { question: "A man walks 5 km toward the south and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?", options: ["West", "South", "North-East", "South-West"], answer: 3, year: "SSC CGL 2017" },
          { question: "Rahul put his timepiece on the table in such a way that at 6 P.M. hour hand points to the North. In which direction the minute hand will point at 9.15 P.M.?", options: ["South-East", "South", "North", "West"], answer: 3, year: "SSC CGL 2018" },
          { question: "A man is facing north. He turns 45 degrees in the clockwise direction and then another 180 degrees in the same direction and then 45 degrees in the anticlockwise direction. Find which direction he is facing now.", options: ["North", "East", "West", "South"], answer: 3, year: "SSC CHSL 2019" },
          { question: "One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. To which direction was he facing?", options: ["East", "West", "South", "North"], answer: 2, year: "SSC CGL 2020" },
          { question: "A man walks 1 km to East, then he turns to South and walks 5 km. Again he turns to East and walks 2 km, after this he turns to North and walks 9 km. Now, how far is he from his starting point?", options: ["3 km", "4 km", "5 km", "7 km"], answer: 2, year: "SSC CGL 2021" },
          { question: "Starting from a point P, Sachin walked 20 metres towards South. He turned left and walked 30 metres. He then turned left and walked 20 metres. He again turned left and walked 40 metres and reached a point Q. How far and in which direction is the point Q from the point P?", options: ["20 metres, West", "10 metres, West", "10 metres, East", "30 metres, North"], answer: 1, year: "SSC CGL 2022" },
          { question: "A man is facing west. He turns 45° in the clockwise direction and then another 180° in the same direction and then 270° in the anti-clockwise direction. Which direction is he facing now?", options: ["North-West", "South-West", "South", "West"], answer: 1, year: "SSC CGL 2019" },
          { question: "I am facing East. I turn 100° in the clockwise direction and then 145° in the anti-clockwise direction. Which direction am I facing now?", options: ["East", "North-East", "North", "South-East"], answer: 1, year: "SSC CHSL 2018" },
          { question: "A river flows west to east and on the way turns left and goes in a semi-circle round a hillock, and then turns left at right angles. In which direction is the river finally flowing?", options: ["West", "East", "North", "South"], answer: 1, year: "SSC CGL 2017" },
          { question: "A man walks 30 metres towards South. Then, turning to his right, he walks 30 metres. Then, turning to his left, he walks 20 metres. Again, he turns to his left and walks 30 metres. How far is he from his initial position?", options: ["20 metres", "30 metres", "50 metres", "60 metres"], answer: 2, year: "SSC CGL 2020" },
          { question: "Kunal walks 10 km towards North. From there, he walks 6 km towards South. Then, he walks 3 km towards East. How far and in which direction is he with reference to his starting point?", options: ["5 km, West", "5 km, North-East", "7 km, East", "7 km, West"], answer: 1, year: "SSC CGL 2021" },
          { question: "If South-East becomes North, North-East becomes West and so on. What will West become?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 2, year: "SSC CGL 2022" },
          { question: "A man walks 2 km towards North. Then he turns to East and walks 10 km. After this he turns to North and walks 3 km. Again he turns to East and walks 2 km. How far is he from the starting point?", options: ["10 km", "13 km", "15 km", "17 km"], answer: 1, year: "SSC CGL 2019" },
          { question: "The town of Paranda is located on Green lake. The town of Akram is West of Paranda. Tokhada is East of Akram but West of Paranda. Kakran is East of Bopri but West of Tokhada and Akram. If they are all in the same district, which town is the farthest West?", options: ["Paranda", "Kakran", "Akram", "Bopri"], answer: 3, year: "SSC CGL 2018" },
          { question: "From his house, Lokesh went 15 km to the North. Then he turned West and covered 10 km. Then he turned South and covered 5 km. Finally turning to East, he covered 10 km. In which direction is he from his house?", options: ["East", "West", "North", "South"], answer: 2, year: "SSC CGL 2017" },
          { question: "A child is looking for his father. He went 90 metres in the East before turning to his right. He went 20 metres before turning to his right again to look for his father at his uncle's place 30 metres from this point. His father was not there. From there, he went 100 metres to his North before meeting his father in a street. How far did the son meet his father from the starting point?", options: ["80 metres", "100 metres", "140 metres", "260 metres"], answer: 1, year: "SSC CGL 2020" },
          { question: "A person starts from a point A and travels 3 km eastwards to B and then turns left and travels thrice that distance to reach C. He again turns left and travels five times the distance he covered between A and B and reaches his destination D. The shortest distance between the starting point and the destination is:", options: ["12 km", "15 km", "16 km", "18 km"], answer: 1, year: "SSC CGL 2021" },
          { question: "One evening before sunset, two friends Sumit and Mohit were talking to each other face to face. If Mohit's shadow was exactly to his right side, which direction was Sumit facing?", options: ["North", "South", "West", "East"], answer: 1, year: "SSC CGL 2022" },
          { question: "A boy rode his bicycle Northward, then turned left and rode 1 km and again turned left and rode 2 km. He found himself 1 km west of his starting point. How far did he ride Northward initially?", options: ["1 km", "2 km", "3 km", "5 km"], answer: 1, year: "SSC CGL 2019" },
          { question: "A postman was returning to the post office which was in front of him to the north. When the post office was 100m away from him, he turned to the left and moved 50m to deliver the last letter. He then moved in the same direction for 40m, turned to his right and moved 100m. How many meters was he away from the post office?", options: ["0 m", "90 m", "150 m", "100 m"], answer: 1, year: "SSC CGL 2018" }
        ],

        // Set 2: Questions 21–40
        [
          { question: "Ram walks 10m South from his house, turns left and walks 25m, again turns left and walks 40m, then turns right and walks 5m to reach the school. In which direction is the school from his house?", options: ["North", "South-West", "North-East", "East"], answer: 2, year: "SSC CGL 2017" },
          { question: "A clock is so placed that at 12 noon its minute hand points towards North-East. In which direction does its hour hand point at 1.30 PM?", options: ["North", "South", "East", "West"], answer: 2, year: "SSC CGL 2018" },
          { question: "A person walks 4 km towards west, then turns to his right to travel 9 km. He turns towards east and travels 12 km. Finally, he travels 3 km towards south. How far is he from the initial position?", options: ["10 km", "12 km", "15 km", "8 km"], answer: 0, year: "SSC CHSL 2019" },
          { question: "One morning, Uday and Vishal were talking to each other face to face at a crossing. If Vishal's shadow was exactly to the left of Uday, which direction was Uday facing?", options: ["East", "West", "North", "South"], answer: 2, year: "SSC CGL 2020" },
          { question: "Y is in the East of X which is in the North of Z. If P is in the South of Z, then in which direction of Y, is P?", options: ["North", "South", "South-East", "South-West"], answer: 3, year: "SSC CGL 2021" },
          { question: "A man starts from a point, walks 8 km towards North, turns right and walks 12 km, turns left and walks 7 km, turns and walks 24 km towards South, turns right and walks 12 km. In which direction is he from the starting point?", options: ["North", "South", "West", "East"], answer: 1, year: "SSC CGL 2022" },
          { question: "A man is facing South. He turns 135° in the anti-clockwise direction and then 180° in the clockwise direction. Which direction is he facing now?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 3, year: "SSC CGL 2019" },
          { question: "I am facing south. I turn right and walk 20 m. Then I turn right again and walk 10 m. Then I turn left and walk 10 m and then turning right walk 20 m. Then I turn right again and walk 60 m. In which direction am I from the starting point?", options: ["North", "North-west", "East", "North-east"], answer: 3, year: "SSC CHSL 2018" },
          { question: "A rat runs 20' towards East and turns to right, runs 10', and turns to right, runs 9', and again turns to left, runs 5', and then turns to left, runs 12', and finally turns to left and runs 6'. Now, which direction is the rat facing?", options: ["East", "West", "North", "South"], answer: 2, year: "SSC CGL 2017" },
          { question: "Starting from her house, a girl walked 5 km towards East. Then she turned right and walked 3 km. Again she turned right and walked 2 km. Finally, she turned left and walked 2 km. What is the shortest distance between her house and her final position?", options: ["5 km", "sqrt(34) km", "6 km", "sqrt(41) km"], answer: 1, year: "SSC CGL 2020" },
          { question: "A person starts walking from his home towards his friend's place. He walks for 25 m towards West. He takes a 90° right turn and walks for 20 m. He again takes a 90° right turn and walks for 10 m. He then walks for another 10 m after taking a 90° left turn. Turning 90° towards his right, he walks for 15 m to reach his friend's place. How far and in which direction is the friend's place from his home?", options: ["30 m, North", "30 m, South", "30 m, East", "30 m, West"], answer: 0, year: "SSC CGL 2021" },
          { question: "If North is called North-west, West is called South-west, South is called South-east and so on. A person walks straight from South-west to North-east and then turns left. Walks straight and again turns left. Now in which direction he is facing?", options: ["South", "South-east", "North-west", "North-east"], answer: 1, year: "SSC CGL 2022" },
          { question: "A car travels 25 km towards south from a garage. It turns left and travels 30 km, then turns west and travels 45 km. It then turns north and travels 10 km. Where is it with respect to the garage?", options: ["15 km South-West", "20 km North-West", "15 km North-West", "20 km South-West"], answer: 3, year: "SSC CGL 2019" },
          { question: "A man is performing yoga with his head down and legs up. His face is towards the West. In which direction will his left hand be?", options: ["North", "South", "East", "West"], answer: 0, year: "SSC CGL 2018" },
          { question: "A tourist drives 10 km towards west and turns to left and takes a drive of another 4 km. He then drives towards east another 4 km and then turns to his right and drives 5 km. Afterwards he turns to his left and travels 6 km. In which direction is he from the starting point?", options: ["North", "East", "West", "South"], answer: 3, year: "SSC CGL 2017" },
          { question: "Two buses start from the opposite points of a main road, 150 km apart. The first bus runs for 25 km and takes a right turn and then runs for 15 km. It then turns left and runs for another 25 km and takes the direction back to reach the main road. In the meantime, due to a minor breakdown, the other bus has run only 35 km along the main road. What would be the distance between the two buses at this point?", options: ["65 km", "75 km", "80 km", "85 km"], answer: 0, year: "SSC CGL 2020" },
          { question: "A person is standing on a point. He walks 20 m towards East. He then walks 10 m towards North. He then walks 35 m towards West. He then walks 5 m towards South. He then walks 15 m towards East. What is the straight distance in meters between the starting point and the point he is now at?", options: ["0 m", "5 m", "10 m", "20 m"], answer: 1, year: "SSC CGL 2021" },
          { question: "At 12.30, the hour hand of a clock faces North and the minute hand faces South. At 2.45, the hour hand will be in which direction?", options: ["North-West", "West", "South-East", "East"], answer: 3, year: "SSC CGL 2022" },
          { question: "A man walks 6 km towards East, then 5 km towards South, then 6 km towards West and then 10 km towards North. How far is he from his starting point?", options: ["5 km", "10 km", "12 km", "15 km"], answer: 0, year: "SSC CGL 2019" },
          { question: "A person walks 1 mile South, then 1 mile East, then 1 mile North. He is now ___ from his starting point.", options: ["1 mile East", "1 mile North", "1 mile South", "1 mile West"], answer: 0, year: "SSC CGL 2018" }
        ],
        // Set 3
        [
          { question: "A man walks 15 m south. Then he turns to his right and walks 15 m. Then turning to his left, he walks 10 m. Again he turns to his left and walks 15 m. How far is he from his initial position?", options: ["10 m", "25 m", "15 m", "30 m"], answer: 1, year: "SSC CGL 2022" },
          { question: "A person starts from point A, walks 10 m in south direction. He takes a left turn and walks 15 m. He again takes a left turn and walks 10 m. He finally takes a right turn and stops at point B. What is the distance and direction of B from A?", options: ["15 m, East", "20 m, East", "25 m, East", "15 m, West"], answer: 1, year: "SSC CHSL 2018" },
          { question: "If A is to the south of B and C is to the east of B, in what direction is A with respect to C?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 3, year: "SSC CGL 2017" },
          { question: "A man starts from his office and goes 5 km East. Then, he turns to the left and again walks for 3 km. Again he turns left and walks 5 km. At what distance is he from the starting point?", options: ["3 km", "4 km", "5 km", "6 km"], answer: 0, year: "SSC CGL 2021" },
          { question: "A girl leaves from her home. She first walks 30 metres in North-west direction and then 30 metres in South-west direction. Next, she walks 30 metres in South-east direction. Finally, she turns towards her home. In which direction is she moving?", options: ["North-West", "North-East", "South-East", "South-West"], answer: 1, year: "SSC CGL 2020" },
          { question: "A man is facing North-West. He turns 90° in the clockwise direction, then 180° in the anti-clockwise direction and then another 90° in the same direction. Which direction is he facing now?", options: ["South", "South-West", "West", "South-East"], answer: 3, year: "SSC CHSL 2019" },
          { question: "A starts from a point and walks 5 kms north, then turns left and walks 3 kms, then again turns left and walks 5 kms. In which direction is he now from the starting point?", options: ["North", "South", "East", "West"], answer: 3, year: "SSC CGL 2018" },
          { question: "A man walks 40 meters towards North. He then turns to his left and walks 40 meters. He again turns to his left and walks 15 meters. He finally turns to his right and walks 40 meters. How far and in which direction is he from his starting point?", options: ["80 m, West", "80 m, East", "100 m, West", "100 m, East"], answer: 0, year: "SSC CGL 2021" },
          { question: "A watch reads 4.30. If the minute hand points East, in what direction will the hour hand point?", options: ["North", "North-West", "North-East", "South-East"], answer: 2, year: "SSC CGL 2022" },
          { question: "A person travels 12 km North, then 5 km East. How far is he from the starting point?", options: ["17 km", "15 km", "14 km", "13 km"], answer: 3, year: "SSC CGL 2019" },
          { question: "A man walks 10 km towards west, then turns right and walks 10 km, then turns left and walks 10 km. In which direction is he now from the starting point?", options: ["North-West", "North-East", "South-West", "South-East"], answer: 0, year: "SSC CHSL 2017" },
          { question: "If 'A x B' means A is to the south of B; 'A + B' means A is to the north of B; 'A % B' means A is to the east of B; 'A - B' means A is to the west of B; then in P % Q + R - S, S is in which direction with respect to Q?", options: ["South-West", "South-East", "North-East", "North-West"], answer: 1, year: "SSC CGL 2016" },
          { question: "A man walks 1 km East, then 1 km South, then 1 km East, then 1 km South, then 1 km East. What is the shortest distance from the starting point?", options: ["sqrt(13) km", "sqrt(10) km", "5 km", "3 km"], answer: 0, year: "SSC MTS 2018" },
          { question: "A boy starts walking towards West, he turns right, then right again and finally turns left. Towards which direction is he walking now?", options: ["North", "South", "West", "East"], answer: 0, year: "SSC CGL 2020" },
          { question: "A man is facing east. He turns 60° clockwise, then 150° anti-clockwise. Which direction is he facing now?", options: ["North-East", "South-East", "North-West", "South-West"], answer: 0, year: "SSC CGL 2018" },
          { question: "A person walks 10 meters in front and 10 meters to the right. Then every time turning to his left, he walks 5, 15 and 15 meters respectively. How far is he now from his starting point?", options: ["5 meters", "10 meters", "15 meters", "20 meters"], answer: 0, year: "SSC CGL 2021" },
          { question: "A house faces North. A man coming out of his house walked straight for 10 m, turned left and walked 25 m. He then turned right and walked 5 m and again turned right and walked 25 m. How far is he from his house?", options: ["15 m", "55 m", "60 m", "65 m"], answer: 0, year: "SSC CGL 2022" },
          { question: "A person starts from point P and travels 3 km eastwards to Q. Then he turns left and travels thrice that distance to reach R. He again turns left and travels five times the distance he covered between P and Q and reaches his destination S. The shortest distance between P and S is:", options: ["12 km", "15 km", "18 km", "21 km"], answer: 1, year: "SSC CGL 2019" },
          { question: "A man walks 5 km East, then 5 km South-West. He again turns and walks 5 km North-West. Which is his final position with respect to the starting point?", options: ["At the starting point", "5 km East", "5 km West", "5 km North"], answer: 2, year: "SSC CHSL 2020" },
          { question: "A person is facing North. He walks 10m, turns 45° right, walks 5m, turns 135° left, walks 10m. What is his final direction?", options: ["North", "North-West", "West", "South-West"], answer: 2, year: "SSC CGL 2021" }
        ],
        // Set 4
        [
          { question: "A man walks 6 km east, then 10 km south, then 6 km west. How far is he from his starting point?", options: ["6 km", "10 km", "12 km", "22 km"], answer: 1, year: "SSC CGL 2022" },
          { question: "A person starts from point A, walks 20 m North, turns right and walks 10 m to reach B. Then he turns left and walks 15 m, then turns right and walks 20 m to reach C. In which direction is C from A?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 0, year: "SSC CHSL 2018" },
          { question: "A man is facing west. He turns 120° clockwise and then 165° anti-clockwise. Which direction is he facing now?", options: ["North-East", "South-East", "North-West", "South-West"], answer: 3, year: "SSC CGL 2017" },
          { question: "A car starts from point P, goes 10 km East, turns right, goes 5 km, turns right, goes 10 km. What is the shortest distance from P?", options: ["5 km", "10 km", "15 km", "20 km"], answer: 0, year: "SSC CGL 2021" },
          { question: "A person walks 10 m North, then 20 m East. He then turns right and walks 25 m, then turns right and walks 20 m. How far is he from the starting point?", options: ["10 m", "15 m", "20 m", "25 m"], answer: 1, year: "SSC CGL 2020" },
          { question: "A man is facing south. He turns 135° anti-clockwise, then 45° clockwise. Which direction is he facing now?", options: ["East", "West", "North-East", "South-East"], answer: 0, year: "SSC CHSL 2019" },
          { question: "A starts and walks 10 km North. He turns right and walks 10 km. He again turns right and walks 10 km. He turns left and walks 10 km. How far and in which direction is he from the starting point?", options: ["20 km East", "20 km West", "10 km East", "10 km West"], answer: 0, year: "SSC CGL 2018" },
          { question: "A man walks 30 m East, then turns right and walks 40 m. What is his distance from the starting point?", options: ["50 m", "60 m", "70 m", "80 m"], answer: 0, year: "SSC CGL 2021" },
          { question: "A clock shows 3 PM. If the minute hand points to the North-East, the hour hand will point to the:", options: ["South", "South-West", "North-West", "South-East"], answer: 3, year: "SSC CGL 2022" },
          { question: "A person walks 12 m North, then 16 m East. How far is he from the starting point?", options: ["20 m", "22 m", "24 m", "28 m"], answer: 0, year: "SSC CGL 2019" },
          { question: "A man walks 7 km East, then 7 km South. He then turns left and walks 5 km, then turns left again and walks 12 km. Where is he now with respect to his starting point?", options: ["13 km North-East", "12 km East", "13 km South-East", "12 km West"], answer: 0, year: "SSC CHSL 2017" },
          { question: "If South-West becomes North, what will North-East be?", options: ["West", "South-East", "East", "South"], answer: 3, year: "SSC CGL 2016" },
          { question: "A man walks 20 m North, turns right and walks 3 m, then turns left and walks 4 m, then turns right and walks 4 m. How far is he from the starting point?", options: ["25 m", "28 m", "30 m", "32 m"], answer: 0, year: "SSC MTS 2018" },
          { question: "A boy walks 12 km North, then 10 km East and 12 km South. How far is he from the starting point?", options: ["10 km", "12 km", "14 km", "16 km"], answer: 0, year: "SSC CGL 2020" },
          { question: "A man is facing North-East. He turns 90° clockwise. What is his new direction?", options: ["South-East", "South-West", "North-West", "North-East"], answer: 0, year: "SSC CGL 2018" },
          { question: "A person walks 15 m East, then 20 m North. What is the shortest distance from the starting point?", options: ["25 m", "30 m", "35 m", "40 m"], answer: 0, year: "SSC CGL 2021" },
          { question: "A man walks 10 m West, then 10 m South. He then turns East and walks 25 m. How far is he from the starting point?", options: ["15 m", "sqrt(325) m", "sqrt(425) m", "20 m"], answer: 1, year: "SSC CGL 2022" },
          { question: "A person starts from point X, walks 15 m South, turns left and walks 20 m, turns left again and walks 15 m. How far and in which direction is he from X?", options: ["20 m East", "20 m West", "35 m East", "35 m West"], answer: 0, year: "SSC CGL 2019" },
          { question: "A man walks 8 m East, then 6 m North. What is his distance from the starting point?", options: ["10 m", "12 m", "14 m", "16 m"], answer: 0, year: "SSC CHSL 2020" },
          { question: "A person walks 5 m North, turns right and walks 10 m, turns right and walks 10 m, turns left and walks 5 m. In which direction is he from the starting point?", options: ["North-East", "South-East", "North-West", "South-West"], answer: 1, year: "SSC CGL 2021" }
        ],
        // Set 5
        [
          { question: "A man walks 20 m East, then 10 m South, then 35 m West, then 5 m North, then 15 m East. Where is he now with respect to his starting point?", options: ["At the starting point", "5 m North", "5 m South", "5 m West"], answer: 2, year: "SSC CGL 2022" },
          { question: "A person starts from point P, walks 10 m East, turns left and walks 5 m, turns left again and walks 10 m. How far is he from P?", options: ["5 m", "10 m", "15 m", "20 m"], answer: 0, year: "SSC CHSL 2018" },
          { question: "A man is facing North. He turns 90° clockwise, then 135° anti-clockwise. Which direction is he facing now?", options: ["North-West", "North-East", "South-West", "South-East"], answer: 0, year: "SSC CGL 2017" },
          { question: "A car travels 15 km South, then 8 km East. What is the shortest distance from the starting point?", options: ["17 km", "19 km", "21 km", "23 km"], answer: 0, year: "SSC CGL 2021" },
          { question: "A person walks 20 m West, then 15 m North, then 35 m East, then 15 m South. How far is he from the starting point?", options: ["10 m East", "15 m East", "10 m West", "15 m West"], answer: 1, year: "SSC CGL 2020" },
          { question: "A man is facing West. He turns 45° clockwise, then 180° clockwise, then 270° anti-clockwise. Which direction is he facing now?", options: ["South-West", "North-West", "South-East", "North-East"], answer: 0, year: "SSC CHSL 2019" },
          { question: "A starts and walks 15 km South. He turns right and walks 25 km. He again turns right and walks 15 km. How far is he from the starting point?", options: ["25 km", "30 km", "35 km", "40 km"], answer: 0, year: "SSC CGL 2018" },
          { question: "A man walks 40 m South, then 30 m East. What is his distance from the starting point?", options: ["50 m", "60 m", "70 m", "80 m"], answer: 0, year: "SSC CGL 2021" },
          { question: "A clock is placed such that at 9 AM, the minute hand points towards South-West. In which direction does the hour hand point at 6 PM?", options: ["West", "East", "North", "South"], answer: 1, year: "SSC CGL 2022" },
          { question: "A person walks 9 m South, then 12 m East. How far is he from the starting point?", options: ["15 m", "18 m", "21 m", "25 m"], answer: 0, year: "SSC CGL 2019" },
          { question: "A man walks 5 km North, then 10 km East, then 15 km South. How far is he from the starting point?", options: ["10 * sqrt(2) km", "15 km", "20 km", "25 km"], answer: 0, year: "SSC CHSL 2017" },
          { question: "If East is replaced by South-East, then West will be replaced by which direction?", options: ["North-East", "North-West", "South-West", "North"], answer: 1, year: "SSC CGL 2016" },
          { question: "A man walks 10 m North, turns left and walks 20 m, then turns right and walks 10 m. How far is he from the starting point?", options: ["20 * sqrt(2) m", "30 m", "40 m", "50 m"], answer: 0, year: "SSC MTS 2018" },
          { question: "A boy walks 15 m South, then 20 m West, then 15 m North. How far is he from the starting point?", options: ["15 m", "20 m", "25 m", "35 m"], answer: 1, year: "SSC CGL 2020" },
          { question: "A man is facing South-West. He turns 180° clockwise. What is his new direction?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 0, year: "SSC CGL 2018" },
          { question: "A person walks 24 m West, then 7 m North. What is the shortest distance from the starting point?", options: ["25 m", "28 m", "31 m", "33 m"], answer: 0, year: "SSC CGL 2021" },
          { question: "A man walks 12 m North, then 5 m West, then 8 m South. How far is he from the starting point?", options: ["sqrt(41) m", "sqrt(51) m", "sqrt(61) m", "sqrt(71) m"], answer: 0, year: "SSC CGL 2022" },
          { question: "A person starts from point Y, walks 10 m North, turns right and walks 10 m, turns right again and walks 10 m. How far and in which direction is he from Y?", options: ["10 m East", "10 m West", "20 m East", "20 m West"], answer: 0, year: "SSC CGL 2019" },
          { question: "A man walks 10 m South, then 24 m West. What is his distance from the starting point?", options: ["26 m", "28 m", "30 m", "34 m"], answer: 0, year: "SSC CHSL 2020" },
          { question: "A person walks 8 m East, turns left and walks 6 m, turns left and walks 8 m. In which direction is he from the starting point?", options: ["North", "South", "East", "West"], answer: 0, year: "SSC CGL 2021" }
        ],
      ]
    
    }, // End of SV Agreement

    {
      name: 'Venn Diagram',
      sets: [ [], [], [], [], [] ]
    },

    {
      name: 'Pair Formation',
      sets: [
        [
          { question: "How many such pairs of letters are there in the word 'CORPORATE', each of which has as many letters between them in the word (in both forward and backward directions) as they have between them in the English alphabetical series?", options: ["One", "Two", "Three", "More than three"], answer: 2 },
          { question: "How many pairs of letters are there in the word 'JOURNALIST' which have as many letters between them in the word as in the English alphabet?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Find the number of letter pairs in the word 'CREATIVE' that have the same number of letters between them as in the alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "In the word 'SEQUENTIAL', how many pairs of letters have as many letters between them as in the alphabet series?", options: ["Three", "Four", "Five", "More than five"], answer: 3 },
          { question: "How many letter pairs exist in the word 'MEDITATION' which have the same number of letters between them as in the English alphabet?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Count the pairs of letters in 'BACKGROUND' that have as many letters between them in the word as in the alphabet.", options: ["Three", "Four", "Five", "Six"], answer: 2 },
          { question: "How many pairs of letters in the word 'CHRONICLE' have as many letters between them as in the English alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "In the word 'ABSOLUTE', how many letter pairs have a gap equal to their gap in the alphabetical series?", options: ["Three", "Four", "Five", "Six"], answer: 1 },
          { question: "Find the number of letter pairs in 'WONDERFUL' that have the same number of letters between them as in the alphabet.", options: ["One", "Two", "Three", "Four"], answer: 3 },
          { question: "How many such pairs of letters are there in the word 'EDUCATION' each of which has as many letters between them in the word as in the English alphabet?", options: ["Three", "Four", "Five", "Six"], answer: 1 },
          { question: "In the word 'HORIZONTAL', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Two", "Three", "Four", "Five"], answer: 2 },
          { question: "How many letter pairs in 'DIPLOMACY' have as many letters between them as in the alphabet?", options: ["Three", "Four", "Five", "Six"], answer: 0 },
          { question: "Count the letter pairs in 'TREASURY' with the same number of letters between them as in the English alphabet.", options: ["One", "Two", "Three", "Four"], answer: 3 },
          { question: "In 'GEOGRAPHY', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "How many pairs of letters in the word 'MASTER' have as many letters between them as in the alphabet?", options: ["One", "Two", "Three", "None"], answer: 1 },
          { question: "Find the number of letter pairs in 'BRIGHTEN' that have the same number of letters between them as in the alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "In the word 'FORMULATE', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "How many letter pairs in 'PRISONER' have as many letters between them as in the alphabet?", options: ["Two", "Three", "Four", "More than four"], answer: 3 },
          { question: "Count the letter pairs in 'STUMBLED' with the same number of letters between them as in the English alphabet.", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "In 'DOCUMENT', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["None", "One", "Two", "Three"], answer: 1 }
        ],
        [
          { question: "How many pairs of letters are there in the word 'ADVERTISEMENT' which have as many letters between them in the word as in the English alphabet?", options: ["Five", "Six", "Seven", "More than seven"], answer: 3 },
          { question: "In the word 'MICROSCOPE', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Three", "Four", "Five", "Six"], answer: 2 },
          { question: "Find the number of letter pairs in 'QUALIFY' that have the same number of letters between them as in the alphabet.", options: ["One", "Two", "Three", "None"], answer: 3 },
          { question: "How many letter pairs exist in the word 'BEAUTIFUL' which have the same number of letters between them as in the English alphabet?", options: ["One", "Two", "Three", "Four"], answer: 1 },
          { question: "Count the pairs of letters in 'ORGANIZED' that have as many letters between them in the word as in the alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "How many pairs of letters in the word 'SPLENDOR' have as many letters between them as in the English alphabet?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "In the word 'AMBIGUOUS', how many letter pairs have a gap equal to their gap in the alphabetical series?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "Find the number of letter pairs in 'KNOWLEDGE' that have the same number of letters between them as in the alphabet.", options: ["Three", "Four", "Five", "Six"], answer: 2 },
          { question: "How many such pairs of letters are there in the word 'COMPUTER' each of which has as many letters between them in the word as in the English alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "In the word 'CONSISTENT', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["One", "Two", "Three", "Four"], answer: 1 },
          { question: "How many letter pairs in 'HERITAGE' have as many letters between them as in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 3 },
          { question: "Count the letter pairs in 'MYSTIQUE' with the same number of letters between them as in the English alphabet.", options: ["None", "One", "Two", "Three"], answer: 1 },
          { question: "In 'PLATINUM', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["One", "Two", "Three", "Four"], answer: 0 },
          { question: "How many pairs of letters in the word 'TROUBLE' have as many letters between them as in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 2 },
          { question: "Find the number of letter pairs in 'EXAMPLE' that have the same number of letters between them as in the alphabet.", options: ["None", "One", "Two", "Three"], answer: 1 },
          { question: "In the word 'VIRTUAL', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["One", "Two", "Three", "Four"], answer: 0 },
          { question: "How many letter pairs in 'CHARGED' have as many letters between them as in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "Count the letter pairs in 'SPECTRUM' with the same number of letters between them as in the English alphabet.", options: ["One", "Two", "Three", "Four"], answer: 0 },
          { question: "In 'GLYCERIN', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 3 },
          { question: "How many pairs of letters in the word 'FASHION' have as many letters between them as in the alphabet?", options: ["One", "Two", "Three", "None"], answer: 3 }
        ],
        [
          { question: "How many pairs of letters are there in the word 'COMPREHEND' which have as many letters between them in the word as in the English alphabet?", options: ["Three", "Four", "Five", "Six"], answer: 2 },
          { question: "In the word 'ATMOSPHERE', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "Find the number of letter pairs in 'JUDGEMENT' that have the same number of letters between them as in the alphabet.", options: ["One", "Two", "Three", "Four"], answer: 0 },
          { question: "How many letter pairs exist in the word 'REPUBLICAN' which have the same number of letters between them as in the English alphabet?", options: ["Four", "Five", "Six", "Seven"], answer: 3 },
          { question: "Count the pairs of letters in 'FRAMEWORK' that have as many letters between them in the word as in the alphabet.", options: ["None", "One", "Two", "Three"], answer: 1 },
          { question: "How many pairs of letters in the word 'PREAMBLE' have as many letters between them as in the English alphabet?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "In the word 'BUCKWHEAT', how many letter pairs have a gap equal to their gap in the alphabetical series?", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "Find the number of letter pairs in 'COPYRIGHT' that have the same number of letters between them as in the alphabet.", options: ["One", "Two", "Three", "None"], answer: 3 },
          { question: "How many such pairs of letters are there in the word 'AVOCADO' each of which has as many letters between them in the word as in the English alphabet?", options: ["One", "Two", "Three", "Four"], answer: 0 },
          { question: "In the word 'SUBSTANCE', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Two", "Three", "Four", "Five"], answer: 2 },
          { question: "How many letter pairs in 'ZEPHYR' have as many letters between them as in the alphabet?", options: ["None", "One", "Two", "Three"], answer: 3 },
          { question: "Count the letter pairs in 'QUARTZ' with the same number of letters between them as in the English alphabet.", options: ["One", "Two", "Three", "None"], answer: 3 },
          { question: "In 'JUXTAPOSE', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "How many pairs of letters in the word 'FLAMINGO' have as many letters between them as in the alphabet?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Find the number of letter pairs in 'HYDRANGEA' that have the same number of letters between them as in the alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "In the word 'MAGNITUDE', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Three", "Four", "Five", "Six"], answer: 1 },
          { question: "How many letter pairs in 'CRYSTAL' have as many letters between them as in the alphabet?", "options": ["One", "Two", "Three", "None"], "answer": 0 },
          { question: "Count the letter pairs in 'PATHOGEN' with the same number of letters between them as in the English alphabet.", options: ["One", "Two", "Three", "Four"], answer: 1 },
          { question: "In 'BLACKSMITH', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "How many pairs of letters in the word 'JOURNEY' have as many letters between them as in the alphabet?", options: ["None", "One", "Two", "Three"], answer: 3 }
        ],
        [
          { question: "How many pairs of letters are there in the word 'CONFIGURATION' which have as many letters between them in the word as in the English alphabet?", options: ["Four", "Five", "Six", "Seven"], answer: 2 },
          { question: "In the word 'PHILANTHROPY', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Three", "Four", "Five", "More than five"], answer: 1 },
          { question: "Find the number of letter pairs in 'EQUANIMITY' that have the same number of letters between them as in the alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "How many letter pairs exist in the word 'INCANDESCENT' which have the same number of letters between them as in the English alphabet?", options: ["Four", "Five", "Six", "Seven"], answer: 2 },
          { question: "Count the pairs of letters in 'WONDERSTRUCK' that have as many letters between them in the word as in the alphabet.", options: ["Three", "Four", "Five", "Six"], answer: 1 },
          { question: "How many pairs of letters in the word 'SYMPATHETIC' have as many letters between them as in the English alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "In the word 'OBJECTIVELY', how many letter pairs have a gap equal to their gap in the alphabetical series?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Find the number of letter pairs in 'QUAGMIRE' that have the same number of letters between them as in the alphabet.", options: ["None", "One", "Two", "Three"], answer: 1 },
          { question: "How many such pairs of letters are there in the word 'EXHAUSTING' each of which has as many letters between them in the word as in the English alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 2 },
          { question: "In the word 'FARSIGHTED', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Three", "Four", "Five", "Six"], answer: 0 },
          { question: "How many letter pairs in 'JAWBREAKING' have as many letters between them as in the alphabet?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Count the letter pairs in 'POSTHUMOUSLY' with the same number of letters between them as in the English alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "In 'ZYGOMORPHIC', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["Three", "Four", "Five", "Six"], answer: 0 },
          { question: "How many pairs of letters in the word 'BACKFLIPS' have as many letters between them as in the alphabet?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Find the number of letter pairs in 'GUESTIMATING' that have the same number of letters between them as in the alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 3 },
          { question: "In the word 'PROGNOSTICATE', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Four", "Five", "Six", "Seven"], answer: 2 },
          { question: "How many letter pairs in 'HYPNOTIZED' have as many letters between them as in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "Count the letter pairs in 'DYSFUNCTIONAL' with the same number of letters between them as in the English alphabet.", options: ["Three", "Four", "Five", "Six"], answer: 0 },
          { question: "In 'ACKNOWLEDGMENT', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["Four", "Five", "Six", "Seven"], answer: 1 },
          { question: "How many pairs of letters in the word 'UNCOPYRIGHTABLE' have as many letters between them as in the alphabet?", options: ["Six", "Seven", "Eight", "More than eight"], answer: 3 }
        ],
        [
          { question: "How many pairs of letters are there in the word 'AMBIDEXTROUS' which have as many letters between them in the word as in the English alphabet?", options: ["Three", "Four", "Five", "Six"], answer: 1 },
          { question: "In the word 'TROUBLESHOOTING', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Five", "Six", "Seven", "Eight"], answer: 2 },
          { question: "Find the number of letter pairs in 'SUBJECTIVELY' that have the same number of letters between them as in the alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 0 },
          { question: "How many letter pairs exist in the word 'SCHADENFREUDE' which have the same number of letters between them as in the English alphabet?", options: ["Three", "Four", "Five", "Six"], answer: 2 },
          { question: "Count the pairs of letters in 'JUXTAPOSITION' that have as many letters between them in the word as in the alphabet.", options: ["One", "Two", "Three", "Four"], answer: 1 },
          { question: "How many pairs of letters in the word 'QUINTESSENTIAL' have as many letters between them as in the English alphabet?", options: ["Four", "Five", "Six", "Seven"], answer: 0 },
          { question: "In the word 'FLABBERGASTED', how many letter pairs have a gap equal to their gap in the alphabetical series?", options: ["Two", "Three", "Four", "Five"], answer: 2 },
          { question: "Find the number of letter pairs in 'GLOWSTICK' that have the same number of letters between them as in the alphabet.", options: ["One", "Two", "Three", "Four"], answer: 0 },
          { question: "How many such pairs of letters are there in the word 'WORKMANSHIP' each of which has as many letters between them in the word as in the English alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "In the word 'PYROTECHNICS', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Three", "Four", "Five", "Six"], answer: 0 },
          { question: "How many letter pairs in 'VEXATIOUSLY' have as many letters between them as in the alphabet?", options: ["One", "Two", "Three", "None"], answer: 3 },
          { question: "Count the letter pairs in 'EMBEZZLEMENT' with the same number of letters between them as in the English alphabet.", options: ["Two", "Three", "Four", "Five"], answer: 2 },
          { question: "In 'KNAVERY', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["One", "Two", "Three", "Four"], answer: 1 },
          { question: "How many pairs of letters in the word 'OXIDIZING' have as many letters between them as in the alphabet?", options: ["None", "One", "Two", "Three"], answer: 0 },
          { question: "Find the number of letter pairs in 'JACKFRUIT' that have the same number of letters between them as in the alphabet.", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "In the word 'WHIMSICAL', how many pairs of letters have the same number of letters between them as in the alphabet series?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
          { question: "How many letter pairs in 'GAVELKIND' have as many letters between them as in the alphabet?", options: ["Three", "Four", "Five", "Six"], answer: 2 },
          { question: "Count the letter pairs in 'PHLEGM' with the same number of letters between them as in the English alphabet.", options: ["One", "Two", "Three", "None"], answer: 0 },
          { question: "In 'BIVOUACKED', how many letter pairs have a number of letters between them equal to that in the alphabet?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "How many pairs of letters in the word 'EQUIVOCATE' have as many letters between them as in the alphabet?", options: ["Two", "Three", "Four", "Five"], answer: 1 }
        ]
      ]
    },

    {
      name: 'Coding Decoding',
      sets: [
        [
          { question: "If in a certain language, 'REASON' is coded as 'SDBRPM', how is 'THINK' coded in that language?", options: ["UIJOJ", "UJHNL", "UIJOL", "SIHNK"], answer: 1 },
          { question: "If 'TABLE' is coded as 'VCDNG', how is 'CHAIR' coded?", options: ["EJCJT", "EJDJS", "DJCJS", "EJCJS"], answer: 3 },
          { question: "In a code language, 'MASTER' is written as 'OCUVGT'. How will 'LABOUR' be written in the same language?", options: ["NCDQWT", "NCDQWU", "NCDWQT", "NCQWDT"], answer: 1 },
          { question: "If 'GO' = 32 and 'SHE' = 49, then 'SOME' will be equal to:", options: ["56", "58", "62", "64"], answer: 0 },
          { question: "If 'Z' = 52 and 'ACT' = 48, then 'BAT' will be equal to:", options: ["42", "44", "46", "48"], answer: 2 },
          { question: "In a certain code, 'SYSTEM' is written as 'SYSMET'. How is 'NEARER' written in that code?", options: ["AENRER", "AENRR", "AENRRE", "AERRNE"], answer: 2 },
          { question: "If 'ROSE' is coded as '6821', 'CHAIR' is coded as '73456', and 'PREACH' is coded as '961473', what will be the code for 'SEARCH'?", options: ["214673", "214763", "216473", "246173"], answer: 0 },
          { question: "In a certain code language, 'pit na som' means 'bring me water', 'na jo tod' means 'water is life', 'tub od pit' means 'give me toy'. Which of the following stands for 'toy'?", options: ["tub", "od", "pit", "som"], answer: 0 },
          { question: "If 'WHITE' is called 'BLUE', 'BLUE' is called 'RED', 'RED' is called 'YELLOW', 'YELLOW' is called 'BLACK', what would be the color of human blood?", options: ["RED", "YELLOW", "BLUE", "BLACK"], answer: 1 },
          { question: "If 'WORK' is coded as '4-12-9-16', then how will you code 'WOMAN'?", options: ["4-12-14-26-13", "4-12-13-26-14", "23-12-14-26-13", "23-15-13-1-14"], answer: 0 },
          { question: "If 'E' = 5, 'PEN' = 35, then 'PAGE' will be equal to?", options: ["27", "28", "29", "30"], answer: 2 },
          { question: "In a certain code, '253' means 'books are old'; '546' means 'man is old'; '378' means 'buy good books'. What stands for 'are' in that code?", options: ["2", "3", "5", "6"], answer: 0 },
          { question: "If 'MACHINE' is coded as '19-7-9-14-15-20-11', how will you code 'DANGER'?", options: ["10-7-20-13-11-24", "11-7-20-16-11-24", "13-7-20-9-11-25", "10-7-20-13-11-25"], answer: 0 },
          { question: "If 'DELHI' is coded as '73541' and 'CALCUTTA' as '82589662', how can 'CALICUT' be coded?", options: ["5279431", "8251896", "8543691", "5978213"], answer: 1 },
          { question: "If 'DIAMOND' is coded as 'VQYMLKV', how is 'FEMALE' coded?", options: ["UVNYNV", "UVNZNV", "TVNYNV", "UVNYMV"], answer: 0 },
          { question: "In a certain code, 'TRIPPLE' is written as 'SQHOOKD'. How is 'DISPOSE' written in that code?", options: ["CHRONRD", "CHROMSD", "CHRONTD", "CHROORD"], answer: 0 },
          { question: "If 'FRAGRANCE' is written as 'SBHSBODFG', how can 'IMPOSING' be written?", options: ["NQPTJHOJ", "NQPTJOHI", "NQPTJOHJ", "NQPTJHOI"], answer: 3 },
          { question: "In a certain code, 'MONKEY' is written as 'XDJMNL'. How is 'TIGER' written in that code?", options: ["QDFHS", "SDFHS", "SHFDQ", "UJHFS"], answer: 0 },
          { question: "If 'CLOUD' can be coded as '59432' and 'RAIN' as '1678', how can 'AROUND' be coded?", options: ["614328", "614382", "641328", "461328"], answer: 0 },
          { question: "If 'PALE' is coded as '2134', 'EARTH' is coded as '41590', how is 'PEARL' coded?", options: ["25430", "24153", "25413", "25143"], answer: 1 }
        ],
        [
          { question: "If 'HEATER' is written as 'KBDQHO', how will you write 'COOLER'?", options: ["FLRIHO", "FLIRHO", "FRLIHO", "FRLIHO"], answer: 0 },
          { question: "If 'JUDICIARY' is coded as 'YRAICIDUJ', how is 'GLORIOUS' coded?", options: ["SUOIRULG", "SUOIRLOG", "SUOIROLG", "SUOIRGOL"], answer: 1 },
          { question: "In a certain code, 'BREAKTHROUGH' is written as 'EAOUHRBRGHKT'. How is 'DISTRIBUTION' written in that code?", options: ["STTIBUDIONRI", "STTIBUONRIDI", "STTIBUDIONIR", "STTIBUDOINRI"], answer: 2 },
          { question: "If 'CONSCIOUSLY' is written as 'PEBNPJEXNKM', how is 'SOIL' written?", options: ["NEJK", "NEKI", "NEHJ", "NEJL"], answer: 3 },
          { question: "If 'GOLD' is written as 'HOME', 'COME' is written as 'DONE', then how will 'SONS' be written?", options: ["TOOS", "TONS", "TOOT", "TOON"], answer: 1 },
          { question: "If 'MUMBAI' is coded as 'LTLABH', how is 'DELHI' coded?", options: ["CDKGH", "CDKGI", "CDKHI", "CDKHJ"], answer: 0 },
          { question: "In a certain code, 'GIVE' is written as '5137' and 'BAT' is written as '924'. How is 'GATE' written?", options: ["5247", "5124", "5214", "5427"], answer: 0 },
          { question: "If 'A' = 2, 'M' = 26, 'Z' = 52, then 'BET' = ?", options: ["44", "54", "64", "72"], answer: 1 },
          { question: "If 'ACNE' can be coded as '3-7-29-11', how can 'BOIL' be coded?", options: ["5-31-19-25", "5-29-19-25", "4-31-19-25", "4-29-19-25"], answer: 0 },
          { question: "In a certain code, '15789' is written as 'AXBTC', '2346' is written as 'MPDU'. How is '23549' written in that code?", options: ["MPXDT", "MPADC", "MPXDC", "MPAXD"], answer: 2 },
          { question: "If 'green' means 'red', 'red' means 'yellow', 'yellow' means 'blue', what is the color of a ripe banana?", options: ["green", "red", "blue", "yellow"], answer: 2 },
          { question: "In a code, 'MAN' is written as 'SANM'. How is 'BOY' written?", options: ["SOYB", "YOB", "SOBY", "YBO"], answer: 0 },
          { question: "If 'TEMPLE' is coded as 'VHQURL', how would you code 'CHURCH'?", options: ["EKYWIO", "EKYWIN", "EKYWJO", "EKXWJO"], answer: 0 },
          { question: "If 'ORANGE' is coded as 'SECRIG', how is 'GRAPES' coded?", options: ["ITEVIW", "ITEXIW", "ITEYIW", "ITEZIX"], answer: 0 },
          { question: "If 'FLOWER' is coded as 'EKNVDQ', what is the code for 'GARDEN'?", options: ["Fzqcdm", "Fzqcbm", "Fzqccl", "Fzqcdl"], answer: 3 },
          { question: "If 'MERCURY' is written as 'FGAREPH', how can 'CURE' be written?", options: ["ERAP", "PERA", "REAP", "AREP"], answer: 1 },
          { question: "In a certain code, '24685' is written as '33776'. How is '35791' written in that code?", options: ["44882", "44883", "44884", "44885"], answer: 0 },
          { question: "If 'car' is 'bike', 'bike' is 'aeroplane', 'aeroplane' is 'ship', where do you fly?", options: ["car", "bike", "aeroplane", "ship"], answer: 3 },
          { question: "If 'SPIDER' is written as 'PSDIRE', how is 'COMMON' written?", options: ["OCMMNO", "OCMOMN", "OCMMON", "OCMNOM"], answer: 2 },
          { question: "If 'B' = 2, 'BAG' = 10, then 'BOX' = ?", options: ["39", "41", "42", "43"], answer: 1 }
        ],
        [
          { question: "If 'REJECT' is coded as 'SGMIXZ', how is 'ACCEPT' coded?", options: ["BEFIUV", "BEFIUU", "BEFIUT", "BEFIUS"], answer: 0 },
          { question: "In a certain code, 'TERMINAL' is written as 'NSFUMBOJ'. How is 'CREDIBLE' written?", options: ["DSFEJCMF", "DSFEJCFM", "DSFEJCKF", "DSFEJCKM"], answer: 0 },
          { question: "If 'JOURNEY' is coded as 'LMWTJGA', how is 'MEDICAL' coded?", options: ["OGFKEBN", "OGFKEBM", "OGFKEBL", "OGFKEBK"], answer: 0 },
          { question: "If 'GOAT' is coded as 'HPBU', how is 'FROG' coded?", options: ["GSPH", "GSPG", "GSPF", "GSPE"], answer: 0 },
          { question: "If 'UNITED' is coded as 'SLGRCB', how is 'DISOWN' coded?", options: ["BGQMUL", "BGQMVL", "BGQMUK", "BGQMUJ"], answer: 0 },
          { question: "In a certain code, 'FORGET' is written as 'DPPHCU'. How would 'DOCTOR' be written?", options: ["BPAUMS", "BPAUNS", "BPAUPS", "BPAUQS"], answer: 2 },
          { question: "If 'GLOSSORY' is coded as '97533562', and 'GEOGRAPHY' = '915968402', then 'GEOLOGY' can be coded as?", options: ["9157592", "9157591", "9157590", "9157589"], answer: 0 },
          { question: "If 'air' is 'green', 'green' is 'blue', 'blue' is 'sky', 'sky' is 'yellow', and 'yellow' is 'water', what is the color of clear sky?", options: ["yellow", "sky", "blue", "water"], answer: 1 },
          { question: "If 'CAT' is coded as 'XZG', then 'DOG' is coded as:", options: ["WLT", "WLU", "WLV", "WLW"], answer: 0 },
          { question: "If 'RAJU' is coded as '11-12-13-14', then 'JUNK' is coded as:", options: ["13-14-15-16", "14-15-16-17", "15-16-17-18", "16-17-18-19"], answer: 3 },
          { question: "If 'DEAN' is coded as '4-5-1-14', how is 'NEED' coded?", options: ["13-5-5-4", "14-5-5-4", "15-5-5-4", "16-5-5-4"], answer: 1 },
          { question: "In a certain code, '3a, 2b, 7c' means 'Truth is Eternal'; '7c, 9a, 8b, 3a' means 'Enmity is not Eternal'. Which letter-number combination stands for 'Truth'?", options: ["3a", "2b", "7c", "9a"], answer: 1 },
          { question: "If 'FIRE' is coded as '#@%&', and 'DEAL' is coded as '$&^*', then 'FAIL' is coded as:", options: ["#^*&", "#^%&", "#@%&", "#@*&"], answer: 3 },
          { question: "If 'LONDON' is coded as 'MPOEPO', how is 'DELHI' coded?", options: ["EFMIJ", "EFMIK", "EFMIL", "EFMIM"], answer: 0 },
          { question: "If 'HEAVEN' is coded as 'IFBWFO', how is 'HELL' coded?", options: ["IFMM", "IFMN", "IFMO", "IFMP"], answer: 0 },
          { question: "In a certain code, 'POPULAR' is coded as 'QPQVMBS'. Which word would be coded as 'GBNPVT'?", options: ["FAMOUS", "FAMOVT", "FAMPUT", "FAMPVT"], answer: 0 },
          { question: "If 'VICTORY' is coded as 'YLFWRUB', how can 'SUCCESS' be coded?", options: ["VXFFHVV", "VXEEHVV", "VYEEHVV", "VYEFHVV"], answer: 0 },
          { question: "If 'ZEBRA' can be written as '2652181', how can 'COBRA' be written?", options: ["3152181", "3152182", "3152183", "3152184"], answer: 0 },
          { question: "If 'LIGHT' is coded as 'KHFGS', how is 'SOUND' coded?", options: ["RNTMC", "RNTMC", "RNTMC", "RNTMC"], answer: 0 },
          { question: "If 'APPLE' is coded as '25', 'MANGO' is coded as '30', then 'GRAPES' is coded as:", options: ["35", "40", "45", "50"], answer: 2 }
        ],
        [
          { question: "If 'COMPUTER' is coded as 'RFUVQNPC', how is 'MEDICINE' coded?", options: ["EOJDJEFM", "EOJDEJFM", "MFEDJJOE", "MFEDJJOF"], answer: 0 },
          { question: "In a certain code, 'ORGANISATION' is written as 'CBDZMHASUHP'. How is 'OPERATION' written?", options: ["PQFASJPO", "PQFASJOP", "PQFSAJPO", "PQFSAJOP"], answer: 1 },
          { question: "If 'TRUTH' is coded as 'SUQSTVSUGI', then the code for 'FALSE' will be:", options: ["EGZBKMRDE", "EGZKMRTDE", "EGZBKMRDF", "EGZBKMRDG"], answer: 0 },
          { question: "If 'TWENTY' is coded as '863985', 'ELEVEN' is coded as '323039', how is 'TWELVE' coded?", options: ["863203", "863302", "863303", "863304"], answer: 0 },
          { question: "In a certain code, 'ROUND' is written as '@#$*%', 'DREAM' is written as '%&!@?'. How is 'ARM' written?", options: ["@&?", "@&!", "@&*", "@&#"], answer: 0 },
          { question: "If 'book' is 'pencil', 'pencil' is 'mirror', 'mirror' is 'board', what do you write with?", options: ["book", "pencil", "mirror", "board"], answer: 2 },
          { question: "If 'GO' is coded as '715', how is 'CAT' coded?", options: ["3120", "3121", "3122", "3123"], answer: 0 },
          { question: "If 'REASONING' is coded as '9511655957', how is 'ANALOGY' coded?", options: ["15116725", "15116726", "15116727", "15116728"], answer: 0 },
          { question: "In a certain code, '467' means 'leaves are green', '485' means 'green is good', '639' means 'they are playing'. Which digit stands for 'leaves'?", options: ["4", "6", "7", "3"], answer: 2 },
          { question: "If 'LOVE' is coded as '27', how is 'COME' coded?", options: ["30", "32", "34", "36"], answer: 1 },
          { question: "If 'SYSTEM' is coded as '131625', how is 'FRACTION' coded?", options: ["69132095", "69132096", "69132097", "69132098"], answer: 0 },
          { question: "If 'A' = 26, 'SUN' = 27, then 'CAT' = ?", options: ["57", "58", "59", "60"], answer: 0 },
          { question: "In a certain code, 'GIGANTIC' is written as 'GIGTANCI'. How is 'MIRACLES' written?", options: ["MIRLCAES", "MIRLACSE", "MIRLCSEA", "MIRLCESA"], answer: 0 },
          { question: "If 'TRAIN' is coded as 'RTYKL', how is 'PLANE' coded?", options: ["RNCGP", "RNCGQ", "RNCGR", "RNCGS"], answer: 0 },
          { question: "If 'BEAT' is coded as '5124', and 'CORE' is coded as '8123', what is the code for 'ROBE'?", options: ["3125", "3126", "3127", "3128"], answer: 0 },
          { question: "If 'pen' is 'table', 'table' is 'fan', 'fan' is 'chair', where do you sit?", options: ["pen", "table", "fan", "chair"], answer: 3 },
          { question: "If 'MIND' is coded as 'KGLB', and 'ARGUE' as 'YPESC', what will 'DIAGRAM' be coded as?", options: ["BGYEPYK", "BGYEPYJ", "BGYEPYI", "BGYEPYH"], answer: 0 },
          { question: "If '123' means 'hot filtered coffee', '356' means 'very hot day', '589' means 'day and night'. Which digit stands for 'very'?", options: ["9", "5", "8", "6"], answer: 3 },
          { question: "If 'Z' = 2197, 'R' = 729, then 'J' will be:", options: ["125", "144", "169", "196"], answer: 0 },
          { question: "If 'GO' = 22, 'DO' = 19, then 'IT' = ?", options: ["29", "30", "31", "32"], answer: 0 }
        ],
        [
          { question: "If 'CERTAIN' is coded as 'XVIGZRM', how is 'MUNDANE' coded?", options: ["NFMWZMV", "NFMWZNV", "NFMWZOV", "NFMWZPV"], answer: 1 },
          { question: "If 'CORPORATIONS' is written as 'PROCTAROSNOI', how is 'JUDICIAL' written?", options: ["UJIDCLA", "UJIDICLA", "UJIDICAL", "UJIDICLA"], answer: 2 },
          { question: "In a certain code, 'BELIEF' is written as 'AFKKDI'. How is 'SELDOM' written?", options: ["RDKCNL", "RFKENM", "RFKFNP", "TFKENP"], answer: 1 },
          { question: "If 'NUMBER' is coded as 'PXQGKY', how is 'SERIAL' coded?", options: ["UGTGCN", "UGTGBN", "UGTGCM", "UGTGCL"], answer: 0 },
          { question: "If 'CALM' is written as 'XZN', 'YEAR' is written as 'BVZI', then how can 'MAP' be written?", options: ["NVK", "NZK", "NZL", "NZM"], answer: 2 },
          { question: "If 'white' is 'black', 'black' is 'grey', 'grey' is 'red', what is the color of coal?", options: ["white", "black", "grey", "red"], answer: 2 },
          { question: "If 'A' = 1, 'FAT' = 27, then 'FAITH' = ?", options: ["42", "43", "44", "45"], answer: 2 },
          { question: "If 'DEAR' is coded as '6-8-3-21', what is the code for 'TRACK'?", options: ["22-21-3-6-13", "22-21-3-6-14", "22-21-3-6-15", "22-21-3-6-16"], answer: 0 },
          { question: "In a certain code, 'ke pa lo' means 'good morning all', 'so lo ka' means 'all are good'. Which word stands for 'morning'?", options: ["ke", "pa", "lo", "so"], answer: 1 },
          { question: "If 'BAT' = 40, 'CAT' = 60, then 'HEN' = ?", options: ["120", "130", "140", "150"], answer: 2 },
          { question: "If 'ROBUST' is coded as '593187', and 'BONE' as '3964', what is the code for 'SORE'?", options: ["8954", "8955", "8956", "8957"], answer: 0 },
          { question: "If 'A' = 26, 'X-RAY' = 40, then 'WHAT' = ?", options: ["54", "55", "56", "57"], answer: 2 },
          { question: "In a certain code, 'PLANT' is written as 'QMBOU'. How is 'FRUIT' written?", options: ["GSVJU", "GSVKU", "GSVLU", "GSVMU"], answer: 0 },
          { question: "If 'EARTH' is coded as 'QPMZS', how is 'HEART' coded?", options: ["SQPZM", "SQMPZ", "SQPMZ", "SQPZS"], answer: 2 },
          { question: "If '2' is '3', '3' is '4', '4' is '5', what is 2+3?", options: ["5", "6", "7", "8"], answer: 2 },
          { question: "If 'CRY' is coded as 'MRYC', 'GET' is coded as 'MTEG', then how will 'BOY' be coded?", options: ["MYOB", "MYBO", "MBOY", "MOYB"], answer: 0 },
          { question: "In a certain code, '786' means 'study very hard', '958' means 'hard work pays', '645' means 'study and work'. Which is the code for 'very'?", options: ["8", "6", "7", "Cannot be determined"], answer: 2 },
          { question: "If 'E' = 5, 'HOTEL' = 12, then 'LAMB' = ?", options: ["7", "10", "26", "28"], answer: 0 },
          { question: "If 'R' is denoted by 'N', 'D' by 'T', 'I' by 'U', 'O' by 'I', 'E' by 'G', 'C' by 'E', then the word 'CREDO' will be:", options: ["GNITU", "ENGTU", "EGNIT", "GNTUE"], answer: 2 },
          { question: "If 'GO' = 32, 'SHE' = 49, then 'SOME' = ?", options: ["56", "58", "60", "62"], answer: 0 }
        ]
      ]
    },

    {
      name: 'Letter Analogy',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Tenses
    },

    {
      name: 'Alphabet Series',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Conditionals
    },

    {
      name: 'Letter Series',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Advance Verbs
    },

    {
      name: 'Word Formation and Logican Sequence of Series',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Modals
    },

    {
      name: 'Dice',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Adverb
    },

    {
      name: 'Cube & Cuboid',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Preposition
    },

    {
      name: 'Number Series',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Conjuction
    },

    {
      name: 'Number Anology',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Question Tag
    },

    {
      name: 'Missing Number',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Passive Voice
    },

    {
      name: 'Syllogism',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Narration
    },

    {
      name: 'Ranking',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Parajumbles
    },

    {
      name: 'Clock',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Cloze Test
    },

    {
      name: 'Mirror & Water Images',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Passage
    },

    {
      name: 'Paper Cutting & Folding',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Vocabulary
    },

    {
      name: 'Figure Series',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Vocabulary
    },

    {
      name: 'Cause & Its Effect',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Vocabulary
    },

    {
      name: 'Statement & Course of Action',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Vocabulary
    },

    {
      name: 'Mathematical Operator',
      sets: [
        // 5 sets, each with 20 unique questions
        [],
        [],
        [],
        [],
        []
      ]//Complete Vocabulary
    },

  ]    
  
};
    

// Export for app.js
window.reasoningData = reasoningData;
