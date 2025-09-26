
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
          { question: "What was the day of the week on 15th August, 1947?", options: ["Friday", "Saturday", "Sunday", "Thursday"], answer: 0 },
          { question: "If today is Monday, after 61 days, it will be:", options: ["Wednesday", "Saturday", "Tuesday", "Thursday"], answer: 1 },
          { question: "Which of the following is not a leap year?", options: ["2000", "2004", "1900", "1996"], answer: 2 },
          { question: "The calendar for the year 2007 will be the same for the year:", options: ["2014", "2016", "2017", "2018"], answer: 3 },
          { question: "On what dates of April, 2001 did Wednesday fall?", options: ["1st, 8th, 15th, 22nd, 29th", "2nd, 9th, 16th, 23rd, 30th", "3rd, 10th, 17th, 24th", "4th, 11th, 18th, 25th"], answer: 3 },
          { question: "It was Sunday on Jan 1, 2006. What was the day of the week on Jan 1, 2010?", options: ["Sunday", "Saturday", "Friday", "Wednesday"], answer: 2 },
          { question: "The last day of a century cannot be:", options: ["Monday", "Wednesday", "Tuesday", "Friday"], answer: 2 },
          { question: "How many odd days are there in 100 years?", options: ["1", "2", "3", "5"], answer: 3 },
          { question: "If the first day of the year (other than a leap year) was Friday, then which was the last day of that year?", options: ["Wednesday", "Thursday", "Friday", "Sunday"], answer: 2 },
          { question: "What was the day of the week on 28th May, 2006?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 3 },
          { question: "If 6th March, 2005 is Monday, what was the day of the week on 6th March, 2004?", options: ["Sunday", "Saturday", "Tuesday", "Wednesday"], answer: 0 },
          { question: "The year next to 1990 will have the same calendar as that of the year 1990.", options: ["1996", "2001", "2002", "1998"], answer: 1 },
          { question: "If the day before yesterday was Thursday, when will Sunday be?", options: ["Today", "Tomorrow", "Day after tomorrow", "Two days after today"], answer: 1 },
          { question: "On 8th Feb, 2005 it was Tuesday. What was the day of the week on 8th Feb, 2004?", options: ["Tuesday", "Monday", "Sunday", "Wednesday"], answer: 2 },
          { question: "How many days are there in x weeks and x days?", options: ["7x*x", "8x", "14x", "7x"], answer: 1 },
          { question: "The first Republic Day of India was celebrated on 26th January, 1950. It was a:", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 0 },
          { question: "If 1st January 2001 was Monday, then what was the day of the week on 31st December 2001?", options: ["Wednesday", "Monday", "Tuesday", "Sunday"], answer: 1 },
          { question: "If the 3rd day of a month is Monday, which of the following will be the 5th day from 21st of that month?", options: ["Tuesday", "Monday", "Wednesday", "Thursday"], answer: 2 },
          { question: "A year starting with Monday and ending with Tuesday. How many days are there in the year?", options: ["365", "366", "364", "Cannot be determined"], answer: 1 },
          { question: "What will be the day of the week on 1st Jan, 2033?", options: ["Monday", "Friday", "Saturday", "Sunday"], answer: 2 }
        ],

        // Set 2: Questions 1-20
        [
          { question: "The calendar for the year 1996 will be the same for the year:", options: ["2012", "2020", "2024", "2028"], answer: 2 },
          { question: "If January 1, 1992 was a Wednesday, what day of the week was January 1, 1993?", options: ["Thursday", "Friday", "Saturday", "Monday"], answer: 1 },
          { question: "What was the day on 1st Jan 1901?", options: ["Monday", "Tuesday", "Wednesday", "Friday"], answer: 1 },
          { question: "If the 11th of a month is Saturday, what date will be 4 days after the 3rd Tuesday of the month?", options: ["24", "25", "26", "27"], answer: 1 },
          { question: "Mrs. Susheela celebrated her wedding anniversary on Tuesday, 30th September 1997. When will she celebrate her next wedding anniversary on the same day?", options: ["30th September 2003", "30th September 2004", "30th September 2002", "30th October 2003"], answer: 0 },
          { question: "If the national day of a country was celebrated on the 4th Saturday of a month, then find the date of celebration, given that the first day of that month is a Tuesday.", options: ["24th", "25th", "26th", "27th"], answer: 2 },
          { question: "How many times does the 29th day of the month occur in 400 consecutive years?", options: ["4497", "4400", "4800", "4922"], answer: 0 },
          { question: "If the second day of a month is a Friday, which of the following would be the last day of the next month which has 31 days?", options: ["Sunday", "Monday", "Tuesday", "Data inadequate"], answer: 3 },
          { question: "My brother is 562 days older than me, while my sister is 75 weeks older than him. If my sister was born on Tuesday, on which day was I born?", options: ["Monday", "Wednesday", "Thursday", "Tuesday"], answer: 2 },
          { question: "What was the day of the week on 16th July, 1776?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 1 },
          { question: "If the 25th of August in a year is Thursday, the number of Mondays in that month is:", options: ["3", "4", "5", "6"], answer: 2 },
          { question: "The calendar for the year 2005 is the same as for the year:", options: ["2010", "2011", "2012", "2013"], answer: 1 },
          { question: "If February 1, 1996 is Wednesday, what day is March 3, 1996?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 0 },
          { question: "If the day after tomorrow is Sunday, which day was tomorrow's day before yesterday?", options: ["Friday", "Saturday", "Monday", "Thursday"], answer: 3 },
          { question: "How many leap years are there in 400 years?", options: ["96", "97", "98", "99"], answer: 1 },
          { question: "The last day of the 20th century was:", options: ["Monday", "Wednesday", "Friday", "Sunday"], answer: 3 },
          { question: "If the third Friday of a month is on the 16th, what is the date of the fourth Tuesday of that month?", options: ["20th", "22nd", "27th", "29th"], answer: 2 },
          { question: "What was the day of the week on 17th June, 1998?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2 },
          { question: "A month starts on a Saturday and has 30 days. How many Wednesdays are in that month?", options: ["3", "4", "5", "6"], answer: 1 },
          { question: "If the 10th day of a month, having 31 days, is a Tuesday, then which day of the week will the last day of the same month be?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 0 }
        ],
        // Set 3
        [
          { question: "The calendar for 2020 will be the same for which of the following years?", options: ["2040", "2044", "2048", "2052"], answer: 2 },
          { question: "If 18th February 1997 was a Tuesday, then what was the day on 18th February 1999?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 3 },
          { question: "What was the day of the week on 2nd October 1869?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 1 },
          { question: "If the 5th day of a month is two days after Monday, what day of the week will be the 19th of the month?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 1 },
          { question: "Suresh was born on 4th October 1999. Dinesh was born 6 days before Suresh. The Independence Day of that year fell on Sunday. Which day was Dinesh born?", options: ["Tuesday", "Wednesday", "Monday", "Sunday"], answer: 2 },
          { question: "If the seventh day of a month is three days earlier than Friday, what day will it be on the nineteenth day of the month?", options: ["Sunday", "Monday", "Wednesday", "Friday"], answer: 0 },
          { question: "How many odd days are there in a period of 300 years?", options: ["0", "1", "2", "3"], answer: 1 },
          { question: "If the first day of a leap year is a Monday, then what day of the week is the last day of that year?", options: ["Monday", "Tuesday", "Wednesday", "Sunday"], answer: 1 },
          { question: "Reaching a place of appointment on Friday, I found that I was two days earlier than the scheduled day. If I had reached on the following Wednesday, how many days late would I have been?", options: ["One day", "Two days", "Three days", "Four days"], answer: 0 },
          { question: "What was the day of the week on 20th June 1837?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 1 },
          { question: "If the 23rd of a month is a Sunday, what day it would have been two weeks and four days earlier?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2 },
          { question: "The calendar for the year 1897 is the same as for the year:", options: ["1903", "1905", "1908", "1910"], answer: 0 },
          { question: "If April 1, 2003 was a Tuesday, what day is April 1, 2005?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: 2 },
          { question: "If today is Friday, what will be the day 363 days from now?", options: ["Saturday", "Sunday", "Thursday", "Friday"], answer: 2 },
          { question: "How many days are there from 2nd Jan 1995 to 15th March 1995?", options: ["71", "72", "73", "74"], answer: 1 },
          { question: "The first day of the 21st century (1st Jan 2001) was a:", options: ["Monday", "Tuesday", "Wednesday", "Sunday"], answer: 0 },
          { question: "If the fourth Saturday of a month is the 22nd day, what is the 13th day of the month?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 2 },
          { question: "What was the day of the week on 13th April 1919?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 2 },
          { question: "A month with 31 days starts on a Friday. How many Tuesdays are in that month?", options: ["3", "4", "5", "Cannot be determined"], answer: 2 },
          { question: "If the 15th day of a month, having 30 days, is a Wednesday, then which day of the week will the first day of the same month be?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 1 }
        ],
        // Set 4
        [
          { question: "The calendar for which year will be the same as for the year 2009?", options: ["2015", "2016", "2017", "2018"], answer: 0 },
          { question: "If March 1, 2008 was a Saturday, what day of the week was March 1, 2009?", options: ["Sunday", "Monday", "Tuesday", "Friday"], answer: 0 },
          { question: "What was the day on 31st December 1 AD?", options: ["Monday", "Tuesday", "Wednesday", "Friday"], answer: 0 },
          { question: "If the 1st of a month is a Sunday, what date will be 3 days after the 4th Wednesday of the month?", options: ["28", "29", "30", "31"], answer: 2 },
          { question: "Karan remembers that his sister's birthday is not after 18th August. Karan's mother remembers that his sister's birthday is before 20th August but after 17th August. On which date of August is his sister's birthday?", options: ["17th", "18th", "19th", "20th"], answer: 1 },
          { question: "If the day after tomorrow is Saturday, what day was three days before yesterday?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: 2 },
          { question: "How many odd days are there in a period of 200 years?", options: ["1", "2", "3", "5"], answer: 2 },
          { question: "If a leap year starts on a Friday, on what day will it end?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: 1 },
          { question: "A man was born on Jan 1, 1980. How many birthdays will he celebrate up to Jan 1, 2020?", options: ["39", "40", "41", "42"], answer: 1 },
          { question: "What was the day of the week on 26th November 1949?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 2 },
          { question: "If the 1st of October is a Sunday, then the 1st of November will be:", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2 },
          { question: "The calendar for the year 2002 is the same as for the year:", options: ["2008", "2010", "2012", "2013"], answer: 3 },
          { question: "If May 10, 1997 was a Monday, what was the day of the week on Oct 10, 2000?", options: ["Saturday", "Sunday", "Monday", "Tuesday"], answer: 1 },
          { question: "If today is Wednesday, what will be the day 84 days from now?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2 },
          { question: "How many days are there from 5th March 1988 to 10th August 1988 (inclusive)?", options: ["158", "159", "160", "161"], answer: 2 },
          { question: "The first day of a century must be:", options: ["Monday, Tuesday, or Wednesday", "Monday, Wednesday, or Friday", "Monday, Tuesday, Thursday, or Saturday", "Monday, Wednesday, Friday, or Sunday"], answer: 2 },
          { question: "If the second day of a month is a Sunday, which of the following would be the 31st day of that month?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: 2 },
          { question: "What was the day of the week on 25th December 1995?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: 1 },
          { question: "A month with 28 days starts on a Tuesday. How many Fridays are in that month?", options: ["3", "4", "5", "Cannot be determined"], answer: 1 },
          { question: "If the 20th day of a month is a Thursday, what day of the week was the 1st day of that month?", options: ["Monday", "Tuesday", "Wednesday", "Sunday"], answer: 0 }
        ],
        // Set 5
        [
          { question: "The calendar for 2011 will be the same for which of the following years?", options: ["2017", "2021", "2022", "2024"], answer: 2 },
          { question: "If June 1, 2000 was a Thursday, what day of the week was June 1, 2001?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 1 },
          { question: "What was the day on 1st January, 1 AD?", options: ["Sunday", "Monday", "Tuesday", "Saturday"], answer: 1 },
          { question: "If the 2nd of a month is a Sunday, what date will be the 4th Friday of the month?", options: ["24th", "25th", "26th", "27th"], answer: 2 },
          { question: "Ashish's birthday is on Monday 29th May. On what day of the week will be Rachna's Birthday in the same year if Rachna was born on 17th November?", options: ["Saturday", "Wednesday", "Friday", "Sunday"], answer: 2 },
          { question: "If the day before yesterday was Saturday, what day will be the day after tomorrow?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 1 },
          { question: "Which two months in a year have the same calendar?", options: ["June, October", "April, November", "April, July", "October, December"], answer: 2 },
          { question: "If a year (which is not a leap year) has 53 Sundays, what is the day on the 1st of January of that year?", options: ["Sunday", "Monday", "Saturday", "Cannot be determined"], answer: 0 },
          { question: "A man was born on 29th Feb 1896. How many birthdays did he celebrate up to the year 1920?", options: ["5", "6", "7", "8"], answer: 1 },
          { question: "What was the day of the week on 1st April 2000?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 2 },
          { question: "If the 30th of January 2013 was a Thursday, what was the day on 2nd March 2013?", options: ["Tuesday", "Thursday", "Saturday", "Sunday"], answer: 3 },
          { question: "The calendar for the year 1982 is the same as for the year:", options: ["1988", "1990", "1993", "1994"], answer: 2 },
          { question: "If July 4, 1776 was a Thursday, what day was July 4, 1777?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: 2 },
          { question: "If today is Tuesday, what will be the day 100 days from now?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: 2 },
          { question: "How many odd days are there in the period from 2001 to 2010 (inclusive)?", options: ["10", "11", "12", "13"], answer: 2 },
          { question: "The first day of the 19th century (1st Jan 1801) was a:", options: ["Monday", "Tuesday", "Wednesday", "Friday"], answer: 2 },
          { question: "If the third day of a month is a Tuesday, which of the following will be the 25th day of the month?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 1 },
          { question: "What was the day of the week on 22nd February 2012?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2 },
          { question: "A month with 31 days ends on a Wednesday. How many Saturdays are in that month?", options: ["3", "4", "5", "Cannot be determined"], answer: 1 },
          { question: "If the 1st day of a month is a Friday, what day of the week will the 29th day of that month be?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: 1 }
        ],
     ]
    },
    // End of Pronoun

    {
      name: 'Direction and Distance',
      sets: [
        // Set 1: Questions 1-20
        [
          { question: "A man walks 5 km toward the south and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?", options: ["West", "South", "North-East", "South-West"], answer: 3 },
          { question: "Rahul put his timepiece on the table in such a way that at 6 P.M. hour hand points to the North. In which direction the minute hand will point at 9.15 P.M.?", options: ["South-East", "South", "North", "West"], answer: 3 },
          { question: "A man is facing north. He turns 45 degrees in the clockwise direction and then another 180 degrees in the same direction and then 45 degrees in the anticlockwise direction. Find which direction he is facing now.", options: ["North", "East", "West", "South"], answer: 3 },
          { question: "One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. To which direction was he facing?", options: ["East", "West", "South", "North"], answer: 2 },
          { question: "A man walks 1 km to East, then he turns to South and walks 5 km. Again he turns to East and walks 2 km, after this he turns to North and walks 9 km. Now, how far is he from his starting point?", options: ["3 km", "4 km", "5 km", "7 km"], answer: 2 },
          { question: "Starting from a point P, Sachin walked 20 metres towards South. He turned left and walked 30 metres. He then turned left and walked 20 metres. He again turned left and walked 40 metres and reached a point Q. How far and in which direction is the point Q from the point P?", options: ["20 metres, West", "10 metres, West", "10 metres, East", "30 metres, North"], answer: 1 },
          { question: "A man is facing west. He turns 45° in the clockwise direction and then another 180° in the same direction and then 270° in the anti-clockwise direction. Which direction is he facing now?", options: ["North-West", "South-West", "South", "West"], answer: 1 },
          { question: "I am facing East. I turn 100° in the clockwise direction and then 145° in the anti-clockwise direction. Which direction am I facing now?", options: ["East", "North-East", "North", "South-East"], answer: 1 },
          { question: "A river flows west to east and on the way turns left and goes in a semi-circle round a hillock, and then turns left at right angles. In which direction is the river finally flowing?", options: ["West", "East", "North", "South"], answer: 1 },
          { question: "A man walks 30 metres towards South. Then, turning to his right, he walks 30 metres. Then, turning to his left, he walks 20 metres. Again, he turns to his left and walks 30 metres. How far is he from his initial position?", options: ["20 metres", "30 metres", "50 metres", "60 metres"], answer: 2 },
          { question: "Kunal walks 10 km towards North. From there, he walks 6 km towards South. Then, he walks 3 km towards East. How far and in which direction is he with reference to his starting point?", options: ["5 km, West", "5 km, North-East", "7 km, East", "7 km, West"], answer: 1 },
          { question: "If South-East becomes North, North-East becomes West and so on. What will West become?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 2 },
          { question: "A man walks 2 km towards North. Then he turns to East and walks 10 km. After this he turns to North and walks 3 km. Again he turns to East and walks 2 km. How far is he from the starting point?", options: ["10 km", "13 km", "15 km", "17 km"], answer: 1 },
          { question: "The town of Paranda is located on Green lake. The town of Akram is West of Paranda. Tokhada is East of Akram but West of Paranda. Kakran is East of Bopri but West of Tokhada and Akram. If they are all in the same district, which town is the farthest West?", options: ["Paranda", "Kakran", "Akram", "Bopri"], answer: 3 },
          { question: "From his house, Lokesh went 15 km to the North. Then he turned West and covered 10 km. Then he turned South and covered 5 km. Finally turning to East, he covered 10 km. In which direction is he from his house?", options: ["East", "West", "North", "South"], answer: 2 },
          { question: "A child is looking for his father. He went 90 metres in the East before turning to his right. He went 20 metres before turning to his right again to look for his father at his uncle's place 30 metres from this point. His father was not there. From there, he went 100 metres to his North before meeting his father in a street. How far did the son meet his father from the starting point?", options: ["80 metres", "100 metres", "140 metres", "260 metres"], answer: 1 },
          { question: "A person starts from a point A and travels 3 km eastwards to B and then turns left and travels thrice that distance to reach C. He again turns left and travels five times the distance he covered between A and B and reaches his destination D. The shortest distance between the starting point and the destination is:", options: ["12 km", "15 km", "16 km", "18 km"], answer: 1 },
          { question: "One evening before sunset, two friends Sumit and Mohit were talking to each other face to face. If Mohit's shadow was exactly to his right side, which direction was Sumit facing?", options: ["North", "South", "West", "East"], answer: 1 },
          { question: "A boy rode his bicycle Northward, then turned left and rode 1 km and again turned left and rode 2 km. He found himself 1 km west of his starting point. How far did he ride Northward initially?", options: ["1 km", "2 km", "3 km", "5 km"], answer: 1 },
          { question: "A postman was returning to the post office which was in front of him to the north. When the post office was 100m away from him, he turned to the left and moved 50m to deliver the last letter. He then moved in the same direction for 40m, turned to his right and moved 100m. How many meters was he away from the post office?", options: ["0 m", "90 m", "150 m", "100 m"], answer: 1 }
        ],

        // Set 2: Questions 21–40
        [
          { question: "Ram walks 10m South from his house, turns left and walks 25m, again turns left and walks 40m, then turns right and walks 5m to reach the school. In which direction is the school from his house?", options: ["North", "South-West", "North-East", "East"], answer: 2 },
          { question: "A clock is so placed that at 12 noon its minute hand points towards North-East. In which direction does its hour hand point at 1.30 PM?", options: ["North", "South", "East", "West"], answer: 2 },
          { question: "A person walks 4 km towards west, then turns to his right to travel 9 km. He turns towards east and travels 12 km. Finally, he travels 3 km towards south. How far is he from the initial position?", options: ["10 km", "12 km", "15 km", "8 km"], answer: 0 },
          { question: "One morning, Uday and Vishal were talking to each other face to face at a crossing. If Vishal's shadow was exactly to the left of Uday, which direction was Uday facing?", options: ["East", "West", "North", "South"], answer: 2 },
          { question: "Y is in the East of X which is in the North of Z. If P is in the South of Z, then in which direction of Y, is P?", options: ["North", "South", "South-East", "South-West"], answer: 3 },
          { question: "A man starts from a point, walks 8 km towards North, turns right and walks 12 km, turns left and walks 7 km, turns and walks 24 km towards South, turns right and walks 12 km. In which direction is he from the starting point?", options: ["North", "South", "West", "East"], answer: 1 },
          { question: "A man is facing South. He turns 135° in the anti-clockwise direction and then 180° in the clockwise direction. Which direction is he facing now?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 3 },
          { question: "I am facing south. I turn right and walk 20 m. Then I turn right again and walk 10 m. Then I turn left and walk 10 m and then turning right walk 20 m. Then I turn right again and walk 60 m. In which direction am I from the starting point?", options: ["North", "North-west", "East", "North-east"], answer: 3 },
          { question: "A rat runs 20' towards East and turns to right, runs 10', and turns to right, runs 9', and again turns to left, runs 5', and then turns to left, runs 12', and finally turns to left and runs 6'. Now, which direction is the rat facing?", options: ["East", "West", "North", "South"], answer: 2 },
          { question: "Starting from her house, a girl walked 5 km towards East. Then she turned right and walked 3 km. Again she turned right and walked 2 km. Finally, she turned left and walked 2 km. What is the shortest distance between her house and her final position?", options: ["5 km", "sqrt(34) km", "6 km", "sqrt(41) km"], answer: 1 },
          { question: "A person starts walking from his home towards his friend's place. He walks for 25 m towards West. He takes a 90° right turn and walks for 20 m. He again takes a 90° right turn and walks for 10 m. He then walks for another 10 m after taking a 90° left turn. Turning 90° towards his right, he walks for 15 m to reach his friend's place. How far and in which direction is the friend's place from his home?", options: ["30 m, North", "30 m, South", "30 m, East", "30 m, West"], answer: 0 },
          { question: "If North is called North-west, West is called South-west, South is called South-east and so on. A person walks straight from South-west to North-east and then turns left. Walks straight and again turns left. Now in which direction he is facing?", options: ["South", "South-east", "North-west", "North-east"], answer: 1 },
          { question: "A car travels 25 km towards south from a garage. It turns left and travels 30 km, then turns west and travels 45 km. It then turns north and travels 10 km. Where is it with respect to the garage?", options: ["15 km South-West", "20 km North-West", "15 km North-West", "20 km South-West"], answer: 3 },
          { question: "A man is performing yoga with his head down and legs up. His face is towards the West. In which direction will his left hand be?", options: ["North", "South", "East", "West"], answer: 0 },
          { question: "A tourist drives 10 km towards west and turns to left and takes a drive of another 4 km. He then drives towards east another 4 km and then turns to his right and drives 5 km. Afterwards he turns to his left and travels 6 km. In which direction is he from the starting point?", options: ["North", "East", "West", "South"], answer: 3 },
          { question: "Two buses start from the opposite points of a main road, 150 km apart. The first bus runs for 25 km and takes a right turn and then runs for 15 km. It then turns left and runs for another 25 km and takes the direction back to reach the main road. In the meantime, due to a minor breakdown, the other bus has run only 35 km along the main road. What would be the distance between the two buses at this point?", options: ["65 km", "75 km", "80 km", "85 km"], answer: 0 },
          { question: "A person is standing on a point. He walks 20 m towards East. He then walks 10 m towards North. He then walks 35 m towards West. He then walks 5 m towards South. He then walks 15 m towards East. What is the straight distance in meters between the starting point and the point he is now at?", options: ["0 m", "5 m", "10 m", "20 m"], answer: 1 },
          { question: "At 12.30, the hour hand of a clock faces North and the minute hand faces South. At 2.45, the hour hand will be in which direction?", options: ["North-West", "West", "South-East", "East"], answer: 3 },
          { question: "A man walks 6 km towards East, then 5 km towards South, then 6 km towards West and then 10 km towards North. How far is he from his starting point?", options: ["5 km", "10 km", "12 km", "15 km"], answer: 0 },
          { question: "A person walks 1 mile South, then 1 mile East, then 1 mile North. He is now ___ from his starting point.", options: ["1 mile East", "1 mile North", "1 mile South", "1 mile West"], answer: 0 }
        ],
        // Set 3
        [
          { question: "A man walks 15 m south. Then he turns to his right and walks 15 m. Then turning to his left, he walks 10 m. Again he turns to his left and walks 15 m. How far is he from his initial position?", options: ["10 m", "25 m", "15 m", "30 m"], answer: 1 },
          { question: "A person starts from point A, walks 10 m in south direction. He takes a left turn and walks 15 m. He again takes a left turn and walks 10 m. He finally takes a right turn and stops at point B. What is the distance and direction of B from A?", options: ["15 m, East", "20 m, East", "25 m, East", "15 m, West"], answer: 1 },
          { question: "If A is to the south of B and C is to the east of B, in what direction is A with respect to C?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 3 },
          { question: "A man starts from his office and goes 5 km East. Then, he turns to the left and again walks for 3 km. Again he turns left and walks 5 km. At what distance is he from the starting point?", options: ["3 km", "4 km", "5 km", "6 km"], answer: 0 },
          { question: "A girl leaves from her home. She first walks 30 metres in North-west direction and then 30 metres in South-west direction. Next, she walks 30 metres in South-east direction. Finally, she turns towards her home. In which direction is she moving?", options: ["North-West", "North-East", "South-East", "South-West"], answer: 1 },
          { question: "A man is facing North-West. He turns 90° in the clockwise direction, then 180° in the anti-clockwise direction and then another 90° in the same direction. Which direction is he facing now?", options: ["South", "South-West", "West", "South-East"], answer: 3 },
          { question: "A starts from a point and walks 5 kms north, then turns left and walks 3 kms, then again turns left and walks 5 kms. In which direction is he now from the starting point?", options: ["North", "South", "East", "West"], answer: 3 },
          { question: "A man walks 40 meters towards North. He then turns to his left and walks 40 meters. He again turns to his left and walks 15 meters. He finally turns to his right and walks 40 meters. How far and in which direction is he from his starting point?", options: ["80 m, West", "80 m, East", "100 m, West", "100 m, East"], answer: 0 },
          { question: "A watch reads 4.30. If the minute hand points East, in what direction will the hour hand point?", options: ["North", "North-West", "North-East", "South-East"], answer: 2 },
          { question: "A person travels 12 km North, then 5 km East. How far is he from the starting point?", options: ["17 km", "15 km", "14 km", "13 km"], answer: 3 },
          { question: "A man walks 10 km towards west, then turns right and walks 10 km, then turns left and walks 10 km. In which direction is he now from the starting point?", options: ["North-West", "North-East", "South-West", "South-East"], answer: 0 },
          { question: "If 'A x B' means A is to the south of B; 'A + B' means A is to the north of B; 'A % B' means A is to the east of B; 'A - B' means A is to the west of B; then in P % Q + R - S, S is in which direction with respect to Q?", options: ["South-West", "South-East", "North-East", "North-West"], answer: 1 },
          { question: "A man walks 1 km East, then 1 km South, then 1 km East, then 1 km South, then 1 km East. What is the shortest distance from the starting point?", options: ["sqrt(13) km", "sqrt(10) km", "5 km", "3 km"], answer: 0 },
          { question: "A boy starts walking towards West, he turns right, then right again and finally turns left. Towards which direction is he walking now?", options: ["North", "South", "West", "East"], answer: 0 },
          { question: "A man is facing east. He turns 60° clockwise, then 150° anti-clockwise. Which direction is he facing now?", options: ["North-East", "South-East", "North-West", "South-West"], answer: 0 },
          { question: "A person walks 10 meters in front and 10 meters to the right. Then every time turning to his left, he walks 5, 15 and 15 meters respectively. How far is he now from his starting point?", options: ["5 meters", "10 meters", "15 meters", "20 meters"], answer: 0 },
          { question: "A house faces North. A man coming out of his house walked straight for 10 m, turned left and walked 25 m. He then turned right and walked 5 m and again turned right and walked 25 m. How far is he from his house?", options: ["15 m", "55 m", "60 m", "65 m"], answer: 0 },
          { question: "A person starts from point P and travels 3 km eastwards to Q. Then he turns left and travels thrice that distance to reach R. He again turns left and travels five times the distance he covered between P and Q and reaches his destination S. The shortest distance between P and S is:", options: ["12 km", "15 km", "18 km", "21 km"], answer: 1 },
          { question: "A man walks 5 km East, then 5 km South-West. He again turns and walks 5 km North-West. Which is his final position with respect to the starting point?", options: ["At the starting point", "5 km East", "5 km West", "5 km North"], answer: 2 },
          { question: "A person is facing North. He walks 10m, turns 45° right, walks 5m, turns 135° left, walks 10m. What is his final direction?", options: ["North", "North-West", "West", "South-West"], answer: 2 }
        ],
        // Set 4
        [
          { question: "A man walks 6 km east, then 10 km south, then 6 km west. How far is he from his starting point?", options: ["6 km", "10 km", "12 km", "22 km"], answer: 1 },
          { question: "A person starts from point A, walks 20 m North, turns right and walks 10 m to reach B. Then he turns left and walks 15 m, then turns right and walks 20 m to reach C. In which direction is C from A?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 0 },
          { question: "A man is facing west. He turns 120° clockwise and then 165° anti-clockwise. Which direction is he facing now?", options: ["North-East", "South-East", "North-West", "South-West"], answer: 3 },
          { question: "A car starts from point P, goes 10 km East, turns right, goes 5 km, turns right, goes 10 km. What is the shortest distance from P?", options: ["5 km", "10 km", "15 km", "20 km"], answer: 0 },
          { question: "A person walks 10 m North, then 20 m East. He then turns right and walks 25 m, then turns right and walks 20 m. How far is he from the starting point?", options: ["10 m", "15 m", "20 m", "25 m"], answer: 1 },
          { question: "A man is facing south. He turns 135° anti-clockwise, then 45° clockwise. Which direction is he facing now?", options: ["East", "West", "North-East", "South-East"], answer: 0 },
          { question: "A starts and walks 10 km North. He turns right and walks 10 km. He again turns right and walks 10 km. He turns left and walks 10 km. How far and in which direction is he from the starting point?", options: ["20 km East", "20 km West", "10 km East", "10 km West"], answer: 0 },
          { question: "A man walks 30 m East, then turns right and walks 40 m. What is his distance from the starting point?", options: ["50 m", "60 m", "70 m", "80 m"], answer: 0 },
          { question: "A clock shows 3 PM. If the minute hand points to the North-East, the hour hand will point to the:", options: ["South", "South-West", "North-West", "South-East"], answer: 3 },
          { question: "A person walks 12 m North, then 16 m East. How far is he from the starting point?", options: ["20 m", "22 m", "24 m", "28 m"], answer: 0 },
          { question: "A man walks 7 km East, then 7 km South. He then turns left and walks 5 km, then turns left again and walks 12 km. Where is he now with respect to his starting point?", options: ["13 km North-East", "12 km East", "13 km South-East", "12 km West"], answer: 0 },
          { question: "If South-West becomes North, what will North-East be?", options: ["West", "South-East", "East", "South"], answer: 3 },
          { question: "A man walks 20 m North, turns right and walks 3 m, then turns left and walks 4 m, then turns right and walks 4 m. How far is he from the starting point?", options: ["25 m", "28 m", "30 m", "32 m"], answer: 0 },
          { question: "A boy walks 12 km North, then 10 km East and 12 km South. How far is he from the starting point?", options: ["10 km", "12 km", "14 km", "16 km"], answer: 0 },
          { question: "A man is facing North-East. He turns 90° clockwise. What is his new direction?", options: ["South-East", "South-West", "North-West", "North-East"], answer: 0 },
          { question: "A person walks 15 m East, then 20 m North. What is the shortest distance from the starting point?", options: ["25 m", "30 m", "35 m", "40 m"], answer: 0 },
          { question: "A man walks 10 m West, then 10 m South. He then turns East and walks 25 m. How far is he from the starting point?", options: ["15 m", "sqrt(325) m", "sqrt(425) m", "20 m"], answer: 1 },
          { question: "A person starts from point X, walks 15 m South, turns left and walks 20 m, turns left again and walks 15 m. How far and in which direction is he from X?", options: ["20 m East", "20 m West", "35 m East", "35 m West"], answer: 0 },
          { question: "A man walks 8 m East, then 6 m North. What is his distance from the starting point?", options: ["10 m", "12 m", "14 m", "16 m"], answer: 0 },
          { question: "A person walks 5 m North, turns right and walks 10 m, turns right and walks 10 m, turns left and walks 5 m. In which direction is he from the starting point?", options: ["North-East", "South-East", "North-West", "South-West"], answer: 1 }
        ],
        // Set 5
        [
          { question: "A man walks 20 m East, then 10 m South, then 35 m West, then 5 m North, then 15 m East. Where is he now with respect to his starting point?", options: ["At the starting point", "5 m North", "5 m South", "5 m West"], answer: 2 },
          { question: "A person starts from point P, walks 10 m East, turns left and walks 5 m, turns left again and walks 10 m. How far is he from P?", options: ["5 m", "10 m", "15 m", "20 m"], answer: 0 },
          { question: "A man is facing North. He turns 90° clockwise, then 135° anti-clockwise. Which direction is he facing now?", options: ["North-West", "North-East", "South-West", "South-East"], answer: 0 },
          { question: "A car travels 15 km South, then 8 km East. What is the shortest distance from the starting point?", options: ["17 km", "19 km", "21 km", "23 km"], answer: 0 },
          { question: "A person walks 20 m West, then 15 m North, then 35 m East, then 15 m South. How far is he from the starting point?", options: ["10 m East", "15 m East", "10 m West", "15 m West"], answer: 1 },
          { question: "A man is facing West. He turns 45° clockwise, then 180° clockwise, then 270° anti-clockwise. Which direction is he facing now?", options: ["South-West", "North-West", "South-East", "North-East"], answer: 0 },
          { question: "A starts and walks 15 km South. He turns right and walks 25 km. He again turns right and walks 15 km. How far is he from the starting point?", options: ["25 km", "30 km", "35 km", "40 km"], answer: 0 },
          { question: "A man walks 40 m South, then 30 m East. What is his distance from the starting point?", options: ["50 m", "60 m", "70 m", "80 m"], answer: 0 },
          { question: "A clock is placed such that at 9 AM, the minute hand points towards South-West. In which direction does the hour hand point at 6 PM?", options: ["West", "East", "North", "South"], answer: 1 },
          { question: "A person walks 9 m South, then 12 m East. How far is he from the starting point?", options: ["15 m", "18 m", "21 m", "25 m"], answer: 0 },
          { question: "A man walks 5 km North, then 10 km East, then 15 km South. How far is he from the starting point?", options: ["10 * sqrt(2) km", "15 km", "20 km", "25 km"], answer: 0 },
          { question: "If East is replaced by South-East, then West will be replaced by which direction?", options: ["North-East", "North-West", "South-West", "North"], answer: 1 },
          { question: "A man walks 10 m North, turns left and walks 20 m, then turns right and walks 10 m. How far is he from the starting point?", options: ["20 * sqrt(2) m", "30 m", "40 m", "50 m"], answer: 0 },
          { question: "A boy walks 15 m South, then 20 m West, then 15 m North. How far is he from the starting point?", options: ["15 m", "20 m", "25 m", "35 m"], answer: 1 },
          { question: "A man is facing South-West. He turns 180° clockwise. What is his new direction?", options: ["North-East", "North-West", "South-East", "South-West"], answer: 0 },
          { question: "A person walks 24 m West, then 7 m North. What is the shortest distance from the starting point?", options: ["25 m", "28 m", "31 m", "33 m"], answer: 0 },
          { question: "A man walks 12 m North, then 5 m West, then 8 m South. How far is he from the starting point?", options: ["sqrt(41) m", "sqrt(51) m", "sqrt(61) m", "sqrt(71) m"], answer: 0 },
          { question: "A person starts from point Y, walks 10 m North, turns right and walks 10 m, turns right again and walks 10 m. How far and in which direction is he from Y?", options: ["10 m East", "10 m West", "20 m East", "20 m West"], answer: 0 },
          { question: "A man walks 10 m South, then 24 m West. What is his distance from the starting point?", options: ["26 m", "28 m", "30 m", "34 m"], answer: 0 },
          { question: "A person walks 8 m East, turns left and walks 6 m, turns left and walks 8 m. In which direction is he from the starting point?", options: ["North", "South", "East", "West"], answer: 0 }
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
        [
          { question: "ACEG : IKMO :: QSUW : ?", options: ["YACE", "YACF", "YBCE", "ZBDF"], answer: 0 },
          { question: "CAT : DDY :: BIG : ?", options: ["CLL", "CLM", "DMM", "DLN"], answer: 0 },
          { question: "WEST : DVEG :: EAST : ?", options: ["VZHG", "VGHZ", "VHHG", "VZHG"], answer: 3 },
          { question: "AFKP : ZUPK :: BGLQ : ?", options: ["YTOJ", "YTJO", "XTOJ", "YSOJ"], answer: 0 },
          { question: "DE : 10 :: HI : ?", options: ["36", "45", "17", "72"], answer: 0 },
          { question: "BC : F :: DE : ?", options: ["J", "K", "I", "L"], answer: 0 },
          { question: "LOM : NMK :: PKI : ?", options: ["QJH", "QKI", "RJH", "QJH"], answer: 3 },
          { question: "RATIONAL : RATNIOLA :: TRIBAL : ?", options: ["TRIALB", "TRILBA", "TIRBAL", "TRBLIA"], answer: 1 },
          { question: "AG : IO :: EK : ?", options: ["LR", "MS", "PV", "SY"], answer: 2 },
          { question: "F : 216 :: L : ?", options: ["1728", "1600", "1331", "1700"], answer: 0 },
          { question: "BDFH : JLNP :: RTVX : ?", options: ["ZBDF", "BDFZ", "ZBDF", "BDFZ"], answer: 0 },
          { question: "EGIK : FILO :: FHJL : ?", options: ["GIMP", "GIMQ", "GHMP", "GHMQ"], answer: 1 },
          { question: "PALE : LEAP :: POSH : ?", options: ["SHOP", "SHPO", "SPHO", "SHPX"], answer: 0 },
          { question: "TSR : FED :: WVU : ?", options: ["LKI", "KJI", "IHG", "CBA"], answer: 2 },
          { question: "BAD : CBE :: IJK : ?", options: ["JLM", "JKL", "LMN", "KLM"], answer: 1 },
          { question: "NOTE : RSXI :: TASK : ?", options: ["ZEWP", "ZEWO", "YFWP", "YDWP"], answer: 0 },
          { question: "GLOW : FJNU :: PTEL : ?", options: ["ORFN", "ORDN", "OSFN", "OSDN"], answer: 2 },
          { question: "BORN : APQO :: LACK : ?", options: ["KBCL", "KCBK", "JCBK", "JBCK"], answer: 1 },
          { question: "WORK : 4-12-9-16 :: LOVE : ?", options: ["15-12-5-22", "12-15-22-5", "12-15-5-22", "15-12-22-5"], answer: 1 },
          { question: "ADHM : ZWSN :: CFJO : ?", options: ["XUQL", "XUQJ", "XUQK", "XVQK"], answer: 0 }
        ],
        [
          { question: "BANK : WZMP :: IDOL : ?", options: ["RWLO", "RWOV", "RXLO", "RVLO"], answer: 3 },
          { question: "CLOSE : DNRWH :: OPEN : ?", options: ["QRGV", "QRHW", "PRGV", "PQGV"], answer: 0 },
          { question: "PNS : OOT :: DBH : ?", options: ["CCI", "CBI", "BCI", "CBJ"], answer: 0 },
          { question: "EIGHTY : GIEYTH :: OUTPUT : ?", options: ["UTOPTU", "UTOPUT", "UTPUTO", "TUOPUT"], answer: 1 },
          { question: "SOUND : FMWXA :: HORNS : ?", options: "SLIMH, SLIMT, SLIMN, SLIMJ", answer: 0 },
          { question: "BEH : DGJ :: NQT : ?", options: ["PRW", "PQS", "PSV", "PQV"], answer: 0 },
          { question: "GHI : JKL :: PQR : ?", options: ["STU", "TUV", "UVW", "VWX"], answer: 2 },
          { question: "CIRCLE : RICELC :: SQUARE : ?", options: ["QSUERA", "QUSERA", "QSUARE", "QSAURE"], answer: 0 },
          { question: "MAJOR : NCKQT :: BLAST : ?", options: ["CMCVU", "DNDWU", "CMDVU", "DMCWU"], answer: 0 },
          { question: "ACFJ : OUZJ :: SUXB : ?", options: ["HJMQ", "HIMQ", "HJLQ", "HIMR"], answer: 1 },
          { question: "LMN : O :: PQR : ?", options: ["S", "T", "U", "V"], answer: 2 },
          { question: "ROPE : 45 :: COAT : ?", options: ["39", "40", "41", "42"], answer: 0 },
          { question: "FADE : 16 :: GAG : ?", options: ["21", "22", "23", "24"], answer: 2 },
          { question: "XYZ : Cba :: UVW : ?", options: ["FGH", "fgh", "Fgh", "fGh"], answer: 1 },
          { question: "EARTH : FZSSI :: VENUS : ?", options: ["WDMVR", "WDMTR", "WFNVT", "WFMVT"], answer: 3 },
          { question: "QPRS : TUVW :: JIKL : ?", options: ["NMOP", "MNOP", "MNPO", "MPNO"], answer: 1 },
          { question: "BACE : DAGG :: HKIJ : ?", options: ["JMLM", "JNLN", "JMLN", "JNLM"], answer: 0 },
          { question: "FRAME : IUDPH :: POWER : ?", options: ["SRZHU", "SSZIV", "STZIV", "SSZJU"], answer: 3 },
          { question: "LAVA : 27 :: FIRE : ?", options: ["38", "39", "40", "41"], answer: 1 },
          { question: "DGIL : WTRO :: EHKN : ?", options: ["VSQM", "VSPM", "VRPM", "VRQM"], answer: 3 }
        ],
        [
          { question: "AWAKE : ZDZJD :: FRIEND : ?", options: ["GSHDMG", "GSHDMC", "GSHDMD", "GSHDMF"], answer: 2 },
          { question: "PRAYER : SQBDFS :: SALUTE : ?", options: ["TBMVUF", "TBNVUF", "TBMVVF", "TBNVVF"], answer: 0 },
          { question: "CFI : LOR :: GJL : ?", options: ["SUV", "SVW", "SUW", "SVX"], answer: 0 },
          { question: "SYSTEM : METSYS :: NORMAL : ?", options: ["LAMRON", "LAMORN", "LAMNOR", "LANMOR"], answer: 0 },
          { question: "BREAD : 218514 :: WORLD : ?", options: ["231518124", "231518123", "231518122", "231518121"], answer: 0 },
          { question: "FGH : 21 :: LMN : ?", options: ["39", "40", "41", "42"], answer: 0 },
          { question: "KMP : HJM :: RUX : ?", options: ["OTU", "OUV", "OVW", "OWX"], answer: 0 },
          { question: "DRIVEN : EIDRVN :: BEGUM : ?", options: ["EUBGM", "EUBMG", "EUGMB", "EUGMB"], answer: 0 },
          { question: "MASTER : 13-1-19-20-5-18 :: FATHER : ?", options: ["6-1-20-8-5-18", "6-1-20-8-5-19", "6-1-20-8-5-20", "6-1-20-8-5-21"], answer: 0 },
          { question: "BDF : HJL :: NPR : ?", options: ["TVX", "TVW", "TWX", "TUX"], answer: 0 },
          { question: "HEART : SQPMZ :: BLOOD : ?", options: ["YOLWW", "YOLXV", "YOLXW", "YOLVW"], answer: 3 },
          { question: "QDXM : SFYN :: UIOZ : ?", options: ["WKPA", "VKPA", "WJPA", "WJPB"], answer: 0 },
          { question: "NUMBER : UNBMRE :: GHOST : ?", options: ["HGSOT", "HGOTS", "HGOST", "HGSTO"], answer: 2 },
          { question: "AFZ : BGY :: CHX : ?", options: ["DIW", "DJV", "DKU", "DLT"], answer: 0 },
          { question: "LPR : 46 :: TVX : ?", options: ["66", "67", "68", "69"], answer: 0 },
          { question: "EAC : 9 :: GDF : ?", options: ["17", "18", "19", "20"], answer: 0 },
          { question: "YXZ : Bca :: VUW : ?", options: ["Efg", "Egf", "Feg", "Fge"], answer: 0 },
          { question: "OCEAN : CEANO :: MOUNTAIN : ?", options: ["UNTAINMO", "UNTANIMO", "UNTAINOM", "UNTAINMO"], answer: 3 },
          { question: "PQR : 8 :: STU : ?", options: ["10", "11", "12", "13"], answer: 0 },
          { question: "FLOWER : 6-12-15-23-5-18 :: GARDEN : ?", options: ["7-1-18-4-5-14", "7-1-18-4-5-15", "7-1-18-4-5-16", "7-1-18-4-5-17"], answer: 0 }
        ],
        [
          { question: "REASON : SFBTPO :: BELIEVE : ?", options: ["CFMJFWF", "CFMJFWE", "CFMJFWG", "CFMJFWH"], answer: 0 },
          { question: "HOCKEY : KLFNHB :: CRICKET : ?", options: ["FUJFNLG", "FUJFMHG", "FUJFMHF", "FUJFMHD"], answer: 1 },
          { question: "BDFH : KMOQ :: CEGI : ?", options: ["LNPR", "LMPR", "LNPQ", "LMPQ"], answer: 0 },
          { question: "AUTHOR : AHTUOR :: READER : ?", options: ["RAEEDR", "RAEDER", "RAEEDR", "RAEDRE"], answer: 2 },
          { question: "LMN : 42 :: RST : ?", options: ["57", "58", "59", "60"], answer: 0 },
          { question: "ACE : 9 :: GIK : ?", options: ["27", "28", "29", "30"], answer: 0 },
          { question: "PQR : TUV :: WXY : ?", options: ["ZAB", "ZBC", "ZCD", "ZDE"], answer: 0 },
          { question: "PLASTIC : ALPCITS :: SUBJECT : ?", options: ["JBUSCET", "JBUCSET", "JBUSCET", "JBUSCTE"], answer: 0 },
          { question: "MANGO : 50 :: APPLE : ?", options: ["48", "49", "50", "51"], answer: 2 },
          { question: "DFH : 18 :: KMO : ?", options: ["39", "40", "41", "42"], answer: 0 },
          { question: "EAGLE : FBHMF :: CROW : ?", options: ["DSPX", "DSQX", "DSRX", "DSSX"], answer: 0 },
          { question: "QWERTY : YTREWQ :: ASDFGH : ?", options: ["HGFDSA", "HGFDAS", "HGFDS", "HGFD"], answer: 0 },
          { question: "BCE : 10 :: FGH : ?", options: ["21", "22", "23", "24"], answer: 0 },
          { question: "INDIA : 9-14-4-9-1 :: CHINA : ?", options: ["3-8-9-14-1", "3-8-9-14-2", "3-8-9-14-3", "3-8-9-14-4"], answer: 0 },
          { question: "LION : 50 :: TIGER : ?", options: ["65", "66", "67", "68"], answer: 0 },
          { question: "ACEG : 16 :: IKMO : ?", options: ["48", "49", "50", "51"], answer: 0 },
          { question: "PQRST : 85 :: UVWXY : ?", options: ["115", "116", "117", "118"], answer: 0 },
          { question: "ABCDE : 15 :: FGHIJ : ?", options: ["35", "40", "45", "50"], answer: 1 },
          { question: "Zebra : 2652181 :: Cobra : ?", options: ["3152181", "3152182", "3152183", "3152184"], answer: 0 },
          { question: "BDFH : 20 :: JLNP : ?", options: ["42", "43", "44", "45"], answer: 0 }
        ],
        [
          { question: "PROBLEM : MELBORP :: SOLUTION : ?", options: ["NOITULOS", "NOITULSO", "NOITULOS", "NOITULOS"], answer: 0 },
          { question: "AFKPU : BHQLV :: CGMRW : ?", options: ["DINSX", "DHNSX", "DHNTX", "DHNSY"], answer: 1 },
          { question: "BDFH : 2468 :: ACEG : ?", options: ["1357", "1358", "1359", "1350"], answer: 0 },
          { question: "CAT : 24 :: DOG : ?", options: ["26", "27", "28", "29"], answer: 0 },
          { question: "LMN : 12-13-14 :: PQR : ?", options: ["16-17-18", "16-17-19", "16-17-20", "16-17-21"], answer: 0 },
          { question: "ACE : 135 :: GIK : ?", options: ["7911", "7912", "7913", "7914"], answer: 0 },
          { question: "PQR : 51 :: STU : ?", options: ["60", "61", "62", "63"], answer: 0 },
          { question: "WXYZ : 90 :: STUV : ?", options: ["78", "79", "80", "81"], answer: 0 },
          { question: "ABCDE : ZYXWV :: FGHIJ : ?", options: ["UTSRQ", "UTSRQP", "UTSRQPO", "UTSRQPON"], answer: 0 },
          { question: "BDFH : 4 :: JLNP : ?", options: ["4", "5", "6", "7"], answer: 0 },
          { question: "ACEG : 4 :: IKMO : ?", options: ["4", "5", "6", "7"], answer: 0 },
          { question: "PQRST : 5 :: UVWXY : ?", options: ["5", "6", "7", "8"], answer: 0 },
          { question: "ABCDE : 5 :: FGHIJ : ?", options: ["5", "6", "7", "8"], answer: 0 },
          { question: "Zebra : 5 :: Cobra : ?", options: ["5", "6", "7", "8"], answer: 0 },
          { question: "BDFH : 4 :: JLNP : ?", options: ["4", "5", "6", "7"], answer: 0 },
          { question: "ACEG : 4 :: IKMO : ?", options: ["4", "5", "6", "7"], answer: 0 },
          { question: "PQRST : 5 :: UVWXY : ?", options: ["5", "6", "7", "8"], answer: 0 },
          { question: "ABCDE : 5 :: FGHIJ : ?", options: ["5", "6", "7", "8"], answer: 0 },
          { question: "Zebra : 5 :: Cobra : ?", options: ["5", "6", "7", "8"], answer: 0 },
          { question: "BDFH : 4 :: JLNP : ?", options: ["4", "5", "6", "7"], answer: 0 }
        ]
      ]
    },

    {
      name: 'Alphabet Series',
      sets: [
        [
          { question: "Find the next two letters in the series: A, C, F, J, ?, ?", options: ["O, U", "L, P", "M, Q", "N, R"], answer: 0 },
          { question: "Complete the series: Z, X, V, T, R, ?, ?", options: ["O, M", "P, N", "Q, O", "R, P"], answer: 1 },
          { question: "What comes next in the series: B, E, I, N, T, ?", options: ["Z", "A", "Y", "B"], answer: 1 },
          { question: "Find the missing term: AZ, CX, FU, ?", options: ["IR", "IV", "JQ", "JR"], answer: 3 },
          { question: "Which letter completes the series: C, E, G, K, M, Q, ?", options: ["S", "T", "U", "V"], answer: 2 },
          { question: "Find the next letter in the series: R, U, X, A, D, ?", options: ["F", "G", "H", "I"], answer: 1 },
          { question: "Complete the series: AB, DEF, HIJK, ?, PQRSTU", options: ["LMNOP", "LMNPQ", "KLMNO", "MNOPQ"], answer: 0 },
          { question: "Find the next two letters: W, V, T, S, Q, P, ?, ?", options: ["N, M", "O, N", "M, L", "P, O"], answer: 0 },
          { question: "What comes next in the series: D, H, L, P, T, ?", options: ["V", "W", "X", "Y"], answer: 2 },
          { question: "Complete the series: A, Z, B, Y, C, X, ?, ?", options: ["D, W", "W, D", "E, V", "V, E"], answer: 0 },
          { question: "Find the next term: B3, E6, H10, K15, ?", options: ["N21", "M20", "N20", "M21"], answer: 0 },
          { question: "Which term completes the series: Z, Y, W, T, P, ?", options: ["K", "L", "M", "N"], answer: 0 },
          { question: "Find the next term in the series: J, L, N, P, R, T, ?", options: ["U", "V", "W", "X"], answer: 1 },
          { question: "Complete the series: A, D, I, P, ?", options: ["W", "X", "Y", "Z"], answer: 2 },
          { question: "What comes next: B, C, E, G, K, M, ?", options: ["P", "Q", "R", "S"], answer: 1 },
          { question: "Find the missing term: BCD, FGH, JKL, ?", options: ["MNO", "NOP", "OPQ", "PQR"], answer: 1 },
          { question: "Complete the series: A, E, I, M, Q, U, ?", options: ["X", "Y", "Z", "A"], answer: 1 },
          { question: "Find the next term: Z, W, S, N, H, ?", options: ["A", "B", "C", "D"], answer: 0 },
          { question: "What comes next in the series: A, B, D, G, K, ?", options: ["O", "P", "Q", "R"], answer: 1 },
          { question: "Complete the series: Y, W, U, S, Q, ?, ?", options: ["O, M", "P, N", "N, L", "M, K"], answer: 0 }
        ],
        [
          { question: "Find the next term in the series: C, G, L, R, Y, ?", options: ["E", "F", "G", "H"], answer: 2 },
          { question: "Complete the series: AZ, BY, CX, DW, ?", options: ["EV", "EU", "FU", "FV"], answer: 0 },
          { question: "What comes next: A, D, G, J, M, P, ?", options: ["R", "S", "T", "U"], answer: 1 },
          { question: "Find the missing term: B, F, J, N, R, V, ?", options: ["Y", "Z", "A", "X"], answer: 3 },
          { question: "Complete the series: Z, A, Y, B, X, C, ?, ?", options: ["D, W", "W, D", "E, V", "V, E"], answer: 1 },
          { question: "Find the next term: A, C, E, G, I, K, ?", options: ["L", "M", "N", "O"], answer: 1 },
          { question: "What comes next in the series: Z, L, X, J, V, H, T, F, ?, ?", options: ["R, D", "S, E", "Q, C", "R, E"], answer: 0 },
          { question: "Complete the series: A, B, F, G, K, L, ?", options: ["P", "Q", "R", "S"], answer: 0 },
          { question: "Find the next term: D, F, I, M, R, ?", options: ["U", "V", "W", "X"], answer: 3 },
          { question: "What comes next: A, H, N, S, W, ?", options: ["Z", "A", "B", "C"], answer: 0 },
          { question: "Complete the series: B, D, G, K, P, ?", options: ["T", "U", "V", "W"], answer: 2 },
          { question: "Find the next term: Z, U, Q, N, L, ?", options: ["J", "K", "I", "H"], answer: 0 },
          { question: "What comes next in the series: A, F, K, P, U, ?", options: ["Y", "Z", "A", "B"], answer: 1 },
          { question: "Complete the series: C, D, F, I, M, ?", options: ["P", "Q", "R", "S"], answer: 2 },
          { question: "Find the next term: A, I, P, V, A, E, ?", options: ["H", "I", "J", "K"], answer: 3 },
          { question: "What comes next: Z, Y, X, U, T, S, P, O, N, ?", options: ["K", "L", "M", "J"], answer: 0 },
          { question: "Complete the series: A, G, L, P, S, U, ?", options: ["V", "W", "X", "Y"], answer: 2 },
          { question: "Find the next term: B, C, F, G, J, K, ?", options: ["N", "O", "P", "Q"], answer: 0 },
          { question: "What comes next in the series: E, J, O, T, Y, D, ?", options: ["H", "I", "J", "K"], answer: 1 },
          { question: "Complete the series: A, Z, C, X, F, U, J, ?", options: ["Q", "R", "S", "T"], answer: 0 }
        ],
        [
          { question: "Find the next term in the series: B, E, H, K, N, Q, ?", options: ["S", "T", "U", "V"], answer: 1 },
          { question: "Complete the series: A, C, D, F, G, I, J, ?", options: ["K", "L", "M", "N"], answer: 1 },
          { question: "What comes next: Z, A, X, C, V, E, ?", options: ["T", "U", "S", "G"], answer: 0 },
          { question: "Find the missing term: A, D, E, H, I, L, M, ?", options: ["O", "P", "Q", "R"], answer: 1 },
          { question: "Complete the series: C, F, I, L, O, R, ?", options: ["T", "U", "V", "W"], answer: 1 },
          { question: "Find the next term: A, B, E, F, I, J, M, N, ?", options: ["O", "P", "Q", "R"], answer: 2 },
          { question: "What comes next in the series: A, Z, D, Y, G, X, J, ?", options: ["V", "W", "U", "T"], answer: 1 },
          { question: "Complete the series: B, D, H, N, V, ?", options: ["D", "E", "F", "G"], answer: 2 },
          { question: "Find the next term: A, C, G, M, U, ?", options: ["B", "C", "D", "E"], answer: 0 },
          { question: "What comes next: Y, X, V, S, O, ?", options: ["J", "K", "L", "M"], answer: 0 },
          { question: "Complete the series: A, B, D, H, P, ?", options: ["Z", "A", "B", "C"], answer: 2 },
          { question: "Find the next term: Z, T, O, K, H, ?", options: ["D", "E", "F", "G"], answer: 3 },
          { question: "What comes next in the series: A, E, J, P, W, ?", options: ["D", "E", "F", "G"], answer: 0 },
          { question: "Complete the series: A, C, F, K, R, ?", options: ["B", "C", "D", "A"], answer: 3 },
          { question: "Find the next term: B, C, E, H, L, Q, ?", options: ["W", "X", "Y", "Z"], answer: 0 },
          { question: "What comes next: Z, X, S, K, D, ?", options: ["V", "W", "X", "Y"], answer: 3 },
          { question: "Complete the series: A, D, I, P, Y, J, ?", options: ["U", "V", "W", "X"], answer: 0 },
          { question: "Find the next term: C, E, I, O, W, ?", options: ["G", "H", "I", "J"], answer: 2 },
          { question: "What comes next in the series: A, B, C, F, E, D, G, H, I, ?", options: ["J", "K", "L", "M"], answer: 2 },
          { question: "Complete the series: Z, A, Y, B, X, C, W, D, V, ?", options: ["E", "F", "G", "H"], answer: 0 }
        ],
        [
          { question: "Find the next term in the series: A, Z, B, Y, C, X, D, ?", options: ["V", "W", "U", "T"], answer: 1 },
          { question: "Complete the series: A, E, I, O, U, Y, E, ?", options: ["I", "J", "K", "L"], answer: 0 },
          { question: "What comes next: B, F, L, T, ?", options: ["D", "E", "F", "G"], answer: 2 },
          { question: "Find the missing term: A, G, M, S, Y, E, ?", options: ["J", "K", "L", "M"], answer: 1 },
          { question: "Complete the series: Z, Y, W, U, R, N, ?", options: ["I", "J", "K", "L"], answer: 0 },
          { question: "Find the next term: A, C, B, D, C, E, D, ?", options: ["E", "F", "G", "H"], answer: 1 },
          { question: "What comes next in the series: A, D, C, F, E, H, G, ?", options: ["I", "J", "K", "L"], answer: 1 },
          { question: "Complete the series: A, B, D, G, L, S, ?", options: ["B", "C", "D", "E"], answer: 2 },
          { question: "Find the next term: Z, X, U, Q, L, ?", options: ["F", "G", "H", "I"], answer: 0 },
          { question: "What comes next: A, C, F, H, K, M, P, ?", options: ["Q", "R", "S", "T"], answer: 1 },
          { question: "Complete the series: A, Z, D, W, I, T, P, ?", options: ["Q", "R", "S", "P"], answer: 0 },
          { question: "Find the next term: B, C, E, G, K, M, Q, S, ?", options: ["T", "U", "V", "W"], answer: 3 },
          { question: "What comes next in the series: A, F, J, M, O, ?", options: ["P", "Q", "R", "S"], answer: 1 },
          { question: "Complete the series: Z, W, P, I, B, ?", options: ["U", "V", "W", "X"], answer: 3 },
          { question: "Find the next term: A, E, D, H, G, K, J, ?", options: ["M", "N", "O", "P"], answer: 1 },
          { question: "What comes next: A, C, E, B, D, F, C, E, ?", options: ["F", "G", "H", "I"], answer: 1 },
          { question: "Complete the series: A, B, C, E, F, G, I, J, K, ?", options: ["L", "M", "N", "O"], answer: 3 },
          { question: "Find the next term: Z, Y, A, X, W, B, V, U, ?", options: ["C", "D", "E", "F"], answer: 0 },
          { question: "What comes next in the series: A, D, G, K, P, V, ?", options: ["B", "C", "D", "E"], answer: 2 },
          { question: "Complete the series: A, B, E, J, Q, Z, ?", options: ["I", "J", "K", "L"], answer: 0 }
        ],
        [
          { question: "Find the next term in the series: A, B, F, O, F, ?", options: ["K", "L", "M", "N"], answer: 0 },
          { question: "Complete the series: A, C, G, O, C, ?", options: ["K", "L", "M", "N"], answer: 2 },
          { question: "What comes next: A, D, I, P, A, ?", options: ["L", "M", "N", "O"], answer: 0 },
          { question: "Find the missing term: A, E, H, L, O, S, ?", options: ["V", "W", "X", "Y"], answer: 0 },
          { question: "Complete the series: Z, Y, W, T, P, K, E, ?", options: ["X", "Y", "Z", "A"], answer: 3 },
          { question: "Find the next term: A, B, D, E, G, H, J, K, ?", options: ["L", "M", "N", "O"], answer: 2 },
          { question: "What comes next in the series: A, Z, E, V, I, R, M, ?", options: ["N", "O", "P", "Q"], answer: 0 },
          { question: "Complete the series: B, C, E, F, H, I, K, L, ?", options: ["M", "N", "O", "P"], answer: 1 },
          { question: "Find the next term: A, C, F, J, O, U, ?", options: ["B", "C", "D", "E"], answer: 0 },
          { question: "What comes next: Z, X, W, V, T, S, Q, P, N, ?", options: ["M", "L", "K", "J"], answer: 0 },
          { question: "Complete the series: A, E, C, G, E, I, G, ?", options: ["J", "K", "L", "M"], answer: 1 },
          { question: "Find the next term: A, B, D, F, I, L, P, ?", options: ["S", "T", "U", "V"], answer: 1 },
          { question: "What comes next in the series: A, C, D, G, G, K, J, ?", options: ["O", "P", "Q", "R"], answer: 0 },
          { question: "Complete the series: A, Z, X, C, V, T, E, R, ?", options: ["P", "Q", "G", "H"], answer: 2 },
          { question: "Find the next term: A, B, C, G, H, I, M, N, O, ?", options: ["P", "Q", "R", "S"], answer: 3 },
          { question: "What comes next: A, D, F, I, K, N, P, ?", options: ["R", "S", "T", "U"], answer: 1 },
          { question: "Complete the series: A, E, I, N, T, C, ?", options: ["H", "I", "J", "K"], answer: 0 },
          { question: "Find the next term: B, E, J, Q, Z, K, ?", options: ["X", "Y", "Z", "A"], answer: 3 },
          { question: "What comes next in the series: A, C, F, I, L, O, ?", options: ["Q", "R", "S", "T"], answer: 1 },
          { question: "Complete the series: A, B, D, C, E, F, H, G, I, J, ?", options: ["K", "L", "M", "N"], answer: 1 }
        ]
      ]
    },

    {
      name: 'Letter Series',
      sets: [
        [
          { question: "Find the missing letters: a _ b a _ c b a _ c b a d _ b a d c", options: ["c, d, c, b", "c, c, d, b", "b, d, c, a", "c, d, b, c"], answer: 0 },
          { question: "Complete the series: _ a b _ _ b _ b b _ a", options: ["b, a, a, b", "a, b, a, b", "b, b, a, a", "a, a, b, b"], answer: 0 },
          { question: "Find the missing letters: _ _ b a b _ _ a b _ _ a b b", options: ["a, b, a, b, a", "b, a, b, a, b", "a, a, b, b, a", "b, b, a, a, b"], answer: 0 },
          { question: "Complete the series: a _ c a _ c a _ c a b _ a b _", options: ["b, b, c, c", "a, b, c, a", "b, c, a, b", "c, a, b, c"], answer: 0 },
          { question: "Find the missing letters: _ b c _ _ b c a _ _ b c a b _", options: ["a, a, c, b", "b, b, a, c", "a, c, a, b", "c, a, b, a"], answer: 0 },
          { question: "Complete the series: g f e _ i g _ e i i _ f e i _ g f _ i i", options: ["i, f, g, i", "f, i, g, i", "i, g, f, i", "g, f, i, i"], answer: 0 },
          { question: "Find the missing letters: _ a c _ b d _ c e _ d f _", options: ["b, a, c, b, e", "a, b, c, d, e", "b, c, d, e, f", "c, d, e, f, g"], answer: 0 },
          { question: "Complete the series: m _ n m _ n _ a n m a _ m a n _", options: ["a, a, m, n", "a, m, a, n", "m, a, n, a", "n, a, m, a"], answer: 0 },
          { question: "Find the missing letters: x _ z _ y x y _ y z _ y z x _ z", options: ["y, z, x, x, y", "y, x, z, y, x", "x, y, z, x, y", "z, y, x, y, z"], answer: 0 },
          { question: "Complete the series: _ t t _ s s t _ t t s _ s t t s s _", options: ["s, t, s, t", "t, s, t, s", "s, s, t, t", "t, t, s, s"], answer: 0 },
          { question: "Find the missing letters: a _ b _ a _ _ b b _ a b b b", options: ["b, a, b, a", "a, b, a, b", "b, b, a, a", "a, a, b, b"], answer: 0 },
          { question: "Complete the series: _ _ b c d _ c d e _ d e f _", options: ["a, b, c, e", "a, c, b, e", "b, a, c, e", "c, b, a, e"], answer: 0 },
          { question: "Find the missing letters: a _ b b _ c c _ d d d _ e e e e", options: ["a, b, c, d", "b, c, d, e", "a, c, b, d", "c, b, d, a"], answer: 0 },
          { question: "Complete the series: c _ b b a _ c a b _ a c _ a b _ a", options: ["a, c, b, c", "c, a, b, c", "b, c, a, c", "a, b, c, c"], answer: 0 },
          { question: "Find the missing letters: _ a a _ b a _ b b a _ a b", options: ["b, a, a, a", "a, b, a, b", "b, b, a, a", "a, a, b, b"], answer: 0 },
          { question: "Complete the series: a _ b c _ a _ b c d _ a b _ d e", options: ["b, d, a, c", "d, b, c, a", "b, c, d, e", "c, d, e, f"], answer: 0 },
          { question: "Find the missing letters: a b _ d _ a b c _ e _ a b c d _ f", options: ["c, d, f, e", "c, e, d, f", "d, c, e, f", "e, f, c, d"], answer: 0 },
          { question: "Complete the series: _ _ c _ b c _ a c _ b c _ a c _ b", options: ["a, b, a, a, a, c", "a, c, a, b, a, c", "b, a, c, a, b, c", "c, b, a, c, b, a"], answer: 0 },
          { question: "Find the missing letters: p _ r s _ q r s p _ r s p q _ s p q r", options: ["q, p, q, r", "q, q, p, r", "p, q, r, s", "r, s, p, q"], answer: 0 },
          { question: "Complete the series: _ y z _ z x _ x y _ y z", options: ["x, y, z, x", "y, z, x, y", "z, x, y, z", "x, z, y, x"], answer: 0 }
        ],
        [
          { question: "Find the missing letters: b _ a c _ a a c _ a a _ b a a c", options: ["a, a, b, a", "b, b, a, a", "a, b, a, c", "c, a, b, a"], answer: 3 },
          { question: "Complete the series: _ _ b a _ b b _ a b _ b", options: ["a, b, a, a, a", "b, a, b, b, a", "a, a, b, b, b", "b, b, a, a, a"], answer: 3 },
          { question: "Find the missing letters: a _ c c _ b a _ c c d _ a b c _ d d", options: ["b, d, c, c", "b, c, d, c", "a, b, c, d", "d, c, b, a"], answer: 1 },
          { question: "Complete the series: _ x _ z z _ y y _ x y z _", options: ["y, y, x, z, z", "y, z, x, y, z", "z, y, x, z, y", "x, y, z, y, x"], answer: 0 },
          { question: "Find the missing letters: l _ n _ m l _ n m _ l m n _ m", options: ["m, m, l, n", "n, m, l, m", "m, l, m, n", "l, m, n, m"], answer: 2 },
          { question: "Complete the series: _ _ a b b _ b b a _ b b a a _", options: ["a, a, a, b, b", "b, b, b, a, a", "a, b, a, b, a", "b, a, b, a, b"], answer: 0 },
          { question: "Find the missing letters: c _ a _ b c c a _ b c _ a a b _", options: ["a, b, c, a", "b, c, a, b", "c, a, b, c", "a, c, b, a"], answer: 3 },
          { question: "Complete the series: _ t u _ r t _ s _ _ u s r t u", options: ["r, s, u, t, r", "s, r, t, u, s", "r, t, s, u, r", "t, s, r, u, t"], answer: 0 },
          { question: "Find the missing letters: _ _ a c c _ c c a _ c c a b _ c", options: ["a, b, b, b, c", "b, a, a, a, b", "a, b, a, b, c", "b, c, b, a, a"], answer: 1 },
          { question: "Complete the series: a _ b c d _ b c d e _ c d e f _", options: ["a, a, a, a", "b, c, d, g", "a, b, c, d", "d, e, f, g"], answer: 0 },
          { question: "Find the missing letters: _ _ y z x _ x y z _ z y x _ y", options: ["x, z, y, x, z", "z, x, y, z, x", "y, x, z, y, x", "x, y, z, x, y"], answer: 3 },
          { question: "Complete the series: h _ j h _ i j h i _ h i j _", options: ["i, i, j, i", "j, j, i, j", "i, j, i, j", "j, i, j, i"], answer: 2 },
          { question: "Find the missing letters: _ b c _ b _ c _ b c d _ c d", options: ["a, a, b, c, d", "c, a, a, b, c", "b, c, a, d, e", "a, c, a, b, c"], answer: 3 },
          { question: "Complete the series: _ _ d _ c d d _ c _ d c _ d", options: ["c, c, c, d, d, c", "d, d, c, c, c, d", "c, d, c, d, c, d", "d, c, d, c, d, c"], answer: 0 },
          { question: "Find the missing letters: a _ c _ a b _ b a _ c c a b _ c", options: ["b, c, a, c, b", "c, b, a, b, c", "b, a, c, b, a", "a, b, c, a, b"], answer: 0 },
          { question: "Complete the series: _ _ p q r _ s p _ r s _ p q _ s", options: ["s, s, q, p, r", "p, q, r, s, p", "q, r, s, p, q", "r, s, p, q, r"], answer: 0 },
          { question: "Find the missing letters: _ _ b c _ b c _ b c _ b c c", options: ["b, c, b, c, b", "c, b, c, b, c", "b, b, c, c, b", "c, c, b, b, c"], answer: 1 },
          { question: "Complete the series: m n _ m _ n n m _ n n _ m n n m", options: ["n, m, m, n", "m, n, n, m", "n, n, m, m", "m, m, n, n"], answer: 2 },
          { question: "Find the missing letters: _ a _ c a a _ c a a a _ c", options: ["a, b, b, b", "b, a, b, a", "a, a, b, b", "b, b, a, a"], answer: 1 },
          { question: "Complete the series: e _ g _ f g e _ g f _ e f _", options: ["f, e, f, g, g", "e, f, g, f, e", "f, g, e, f, g", "g, f, e, g, f"], answer: 0 }
        ],
        [
          { question: "Find the missing letters: a _ b b c _ a b _ c c a _ b c c", options: ["b, a, c, b", "a, c, b, a", "c, b, a, c", "b, c, a, b"], answer: 1 },
          { question: "Complete the series: _ _ a a _ b a _ b b _ a b", options: ["b, a, a, b", "a, b, a, b", "b, b, a, a", "a, a, b, b"], answer: 0 },
          { question: "Find the missing letters: _ _ b c d _ c d e _ d e f _", options: ["a, b, c, e", "b, c, d, f", "a, c, b, f", "c, b, a, e"], answer: 0 },
          { question: "Complete the series: _ y _ z x _ x y z _ z y x _ y", options: ["x, z, y, x, z", "z, x, y, z, x", "y, x, z, y, x", "x, y, z, x, y"], answer: 3 },
          { question: "Find the missing letters: _ a _ c a a _ c a a a _ c", options: ["a, b, b, b", "b, a, b, a", "a, a, b, b", "b, b, a, a"], answer: 1 },
          { question: "Complete the series: _ t u _ r t _ s _ _ u s r t u", options: ["r, s, u, t, r", "s, r, t, u, s", "r, t, s, u, r", "t, s, r, u, t"], answer: 0 },
          { question: "Find the missing letters: _ _ a b b _ b b a _ b b a a _", options: ["a, a, a, b, b", "b, b, b, a, a", "a, b, a, b, a", "b, a, b, a, b"], answer: 0 },
          { question: "Complete the series: h _ j h _ i j h i _ h i j _", options: ["i, i, j, i", "j, j, i, j", "i, j, i, j", "j, i, j, i"], answer: 2 },
          { question: "Find the missing letters: _ _ d _ c d d _ c _ d c _ d", options: ["c, c, c, d, d, c", "d, d, c, c, c, d", "c, d, c, d, c, d", "d, c, d, c, d, c"], answer: 0 },
          { question: "Complete the series: a _ b c d _ b c d e _ c d e f _", options: ["a, a, a, a", "b, c, d, g", "a, b, c, d", "d, e, f, g"], answer: 0 },
          { question: "Find the missing letters: _ _ p q r _ s p _ r s _ p q _ s", options: ["s, s, q, p, r", "p, q, r, s, p", "q, r, s, p, q", "r, s, p, q, r"], answer: 0 },
          { question: "Complete the series: m n _ m _ n n m _ n n _ m n n m", options: ["n, m, m, n", "m, n, n, m", "n, n, m, m", "m, m, n, n"], answer: 2 },
          { question: "Find the missing letters: e _ g _ f g e _ g f _ e f _", options: ["f, e, f, g, g", "e, f, g, f, e", "f, g, e, f, g", "g, f, e, g, f"], answer: 0 },
          { question: "Complete the series: _ _ c _ b c _ a c _ b c _ a c _ b", options: ["a, b, a, a, a, c", "a, c, a, b, a, c", "b, a, c, a, b, c", "c, b, a, c, b, a"], answer: 0 },
          { question: "Find the missing letters: p _ r s _ q r s p _ r s p q _ s p q r", options: ["q, p, q, r", "q, q, p, r", "p, q, r, s", "r, s, p, q"], answer: 0 },
          { question: "Complete the series: _ y z _ z x _ x y _ y z", options: ["x, y, z, x", "y, z, x, y", "z, x, y, z", "x, z, y, x"], answer: 0 },
          { question: "Find the missing letters: b _ a c _ a a c _ a a _ b a a c", options: ["a, a, b, a", "b, b, a, a", "a, b, a, c", "c, a, b, a"], answer: 3 },
          { question: "Complete the series: _ _ b a _ b b _ a b _ b", options: ["a, b, a, a, a", "b, a, b, b, a", "a, a, b, b, b", "b, b, a, a, a"], answer: 3 },
          { question: "Find the missing letters: a _ c c _ b a _ c c d _ a b c _ d d", options: ["b, a, c, b", "b, c, d, c", "a, b, c, d", "d, c, b, a"], answer: 1 },
          { question: "Complete the series: _ x _ z z _ y y _ x y z _", options: ["y, y, x, z, z", "y, z, x, y, z", "z, y, x, z, y", "x, y, z, y, x"], answer: 0 }
        ],
        [
          { question: "Find the missing letters: a _ c a _ c a _ c a b _ a b _", options: ["b, b, c, c", "a, b, c, a", "b, c, a, b", "c, a, b, c"], answer: 0 },
          { question: "Complete the series: _ b c _ _ b c a _ _ b c a b _", options: ["a, a, c, b", "b, b, a, c", "a, c, a, b", "c, a, b, a"], answer: 0 },
          { question: "Find the missing letters: g f e _ i g _ e i i _ f e i _ g f _ i i", options: ["i, f, g, i", "f, i, g, i", "i, g, f, i", "g, f, i, i"], answer: 0 },
          { question: "Complete the series: _ a c _ b d _ c e _ d f _", options: ["b, a, c, b, e", "a, b, c, d, e", "b, c, d, e, f", "c, d, e, f, g"], answer: 0 },
          { question: "Find the missing letters: m _ n m _ n _ a n m a _ m a n _", options: ["a, a, m, n", "a, m, a, n", "m, a, n, a", "n, a, m, a"], answer: 0 },
          { question: "Complete the series: x _ z _ y x y _ y z _ y z x _ z", options: ["y, z, x, x, y", "y, x, z, y, x", "x, y, z, x, y", "z, y, x, y, z"], answer: 0 },
          { question: "Find the missing letters: _ t t _ s s t _ t t s _ s t t s s _", options: ["s, t, s, t", "t, s, t, s", "s, s, t, t", "t, t, s, s"], answer: 0 },
          { question: "Complete the series: a _ b _ a _ _ b b _ a b b b", options: ["b, a, b, a", "a, b, a, b", "b, b, a, a", "a, a, b, b"], answer: 0 },
          { question: "Find the missing letters: _ _ b c d _ c d e _ d e f _", options: ["a, b, c, e", "a, c, b, e", "b, a, c, e", "c, b, a, e"], answer: 0 },
          { question: "Complete the series: a _ b b _ c c _ d d d _ e e e e", options: ["a, b, c, d", "b, c, d, e", "a, c, b, d", "c, b, d, a"], answer: 0 },
          { question: "Find the missing letters: c _ b b a _ c a b _ a c _ a b _ a", options: ["a, c, b, c", "c, a, b, c", "b, c, a, c", "a, b, c, c"], answer: 0 },
          { question: "Complete the series: _ a a _ b a _ b b a _ a b", options: ["b, a, a, a", "a, b, a, b", "b, b, a, a", "a, a, b, b"], answer: 0 },
          { question: "Find the missing letters: a _ b c _ a _ b c d _ a b _ d e", options: ["b, d, a, c", "d, b, c, a", "b, c, d, e", "c, d, e, f"], answer: 0 },
          { question: "Complete the series: a b _ d _ a b c _ e _ a b c d _ f", options: ["c, d, f, e", "c, e, d, f", "d, c, e, f", "e, f, c, d"], answer: 0 },
          { question: "Find the missing letters: _ _ c _ b c _ a c _ b c _ a c _ b", options: ["a, b, a, a, a, c", "a, c, a, b, a, c", "b, a, c, a, b, c", "c, b, a, c, b, a"], answer: 0 },
          { question: "Complete the series: p _ r s _ q r s p _ r s p q _ s p q r", options: ["q, p, q, r", "q, q, p, r", "p, q, r, s", "r, s, p, q"], answer: 0 },
          { question: "Find the missing letters: _ y z _ z x _ x y _ y z", options: ["x, y, z, x", "y, z, x, y", "z, x, y, z", "x, z, y, x"], answer: 0 },
          { question: "Complete the series: a _ b a _ c b a _ c b a d _ b a d c", options: ["c, d, c, b", "c, c, d, b", "b, d, c, a", "c, d, b, c"], answer: 0 },
          { question: "Find the missing letters: _ a b _ _ b _ b b _ a", options: ["b, a, a, b", "a, b, a, b", "b, b, a, a", "a, a, b, b"], answer: 0 },
          { question: "Complete the series: _ _ b a b _ _ a b _ _ a b b", options: ["a, b, a, b, a", "b, a, b, a, b", "a, a, b, b, a", "b, b, a, a, b"], answer: 0 }
        ],
        [
          { question: "Find the missing letters: l _ n _ m l _ n m _ l m n _ m", options: ["m, m, l, n", "n, m, l, m", "m, l, m, n", "l, m, n, m"], answer: 2 },
          { question: "Complete the series: _ _ a b b _ b b a _ b b a a _", options: ["a, a, a, b, b", "b, b, b, a, a", "a, b, a, b, a", "b, a, b, a, b"], answer: 0 },
          { question: "Find the missing letters: c _ a _ b c c a _ b c _ a a b _", options: ["a, b, c, a", "b, c, a, b", "c, a, b, c", "a, c, b, a"], answer: 3 },
          { question: "Complete the series: _ t u _ r t _ s _ _ u s r t u", options: ["r, s, u, t, r", "s, r, t, u, s", "r, t, s, u, r", "t, s, r, u, t"], answer: 0 },
          { question: "Find the missing letters: _ _ a c c _ c c a _ c c a b _ c", options: ["a, b, b, b, c", "b, a, a, a, b", "a, b, a, b, c", "b, c, b, a, a"], answer: 1 },
          { question: "Complete the series: a _ b c d _ b c d e _ c d e f _", options: ["a, a, a, a", "b, c, d, g", "a, b, c, d", "d, e, f, g"], answer: 0 },
          { question: "Find the missing letters: _ _ y z x _ x y z _ z y x _ y", options: ["x, z, y, x, z", "z, x, y, z, x", "y, x, z, y, x", "x, y, z, x, y"], answer: 3 },
          { question: "Complete the series: h _ j h _ i j h i _ h i j _", options: ["i, i, j, i", "j, j, i, j", "i, j, i, j", "j, i, j, i"], answer: 2 },
          { question: "Find the missing letters: _ b c _ b _ c _ b c d _ c d", options: ["a, a, b, c, d", "c, a, a, b, c", "b, c, a, d, e", "a, c, a, b, c"], answer: 3 },
          { question: "Complete the series: _ _ d _ c d d _ c _ d c _ d", options: ["c, c, c, d, d, c", "d, d, c, c, c, d", "c, d, c, d, c, d", "d, c, d, c, d, c"], answer: 0 },
          { question: "Find the missing letters: a _ c _ a b _ b a _ c c a b _ c", options: ["b, c, a, c, b", "c, b, a, b, c", "b, a, c, b, a", "a, b, c, a, b"], answer: 0 },
          { question: "Complete the series: _ _ p q r _ s p _ r s _ p q _ s", options: ["s, s, q, p, r", "p, q, r, s, p", "q, r, s, p, q", "r, s, p, q, r"], answer: 0 },
          { question: "Find the missing letters: _ _ b c _ b c _ b c _ b c c", options: ["b, c, b, c, b", "c, b, c, b, c", "b, b, c, c, b", "c, c, b, b, c"], answer: 1 },
          { question: "Complete the series: m n _ m _ n n m _ n n _ m n n m", options: ["n, m, m, n", "m, n, n, m", "n, n, m, m", "m, m, n, n"], answer: 2 },
          { question: "Find the missing letters: _ a _ c a a _ c a a a _ c", options: ["a, b, b, b", "b, a, b, a", "a, a, b, b", "b, b, a, a"], answer: 1 },
          { question: "Complete the series: e _ g _ f g e _ g f _ e f _", options: ["f, e, f, g, g", "e, f, g, f, e", "f, g, e, f, g", "g, f, e, g, f"], answer: 0 },
          { question: "Find the missing letters: a _ b b c _ a b _ c c a _ b c c", options: ["b, a, c, b", "a, c, b, a", "c, b, a, c", "b, c, a, b"], answer: 1 },
          { question: "Complete the series: _ _ a a _ b a _ b b _ a b", options: ["b, a, a, b", "a, b, a, b", "b, b, a, a", "a, a, b, b"], answer: 0 },
          { question: "Find the missing letters: _ _ b c d _ c d e _ d e f _", options: ["a, b, c, e", "b, c, d, f", "a, c, b, f", "c, b, a, e"], answer: 0 },
          { question: "Complete the series: _ y _ z x _ x y z _ z y x _ y", options: ["x, z, y, x, z", "z, x, y, z, x", "y, x, z, y, x", "x, y, z, x, y"], answer: 3 }
        ]
      ]
    },

    {
      name: 'Word Formation and Logical Sequence of Series',
      sets: [
        [
          { question: "Arrange the words in a meaningful sequence: 1. Police, 2. Punishment, 3. Crime, 4. Judge, 5. Judgment", options: ["3, 1, 4, 5, 2", "3, 1, 2, 4, 5", "1, 2, 4, 3, 5", "5, 4, 3, 2, 1"], answer: 0 },
          { question: "From the word 'INTERNATIONAL', which word CANNOT be formed?", options: ["ORIENT", "TERMINAL", "RATION", "NATION"], answer: 1 },
          { question: "Arrange the words in a logical order: 1. Leaf, 2. Fruit, 3. Stem, 4. Root, 5. Flower", options: ["4, 3, 1, 5, 2", "4, 1, 3, 5, 2", "3, 4, 5, 1, 2", "1, 3, 4, 5, 2"], answer: 0 },
          { question: "From the word 'CONSTITUTIONAL', which word can be formed?", options: ["LOCATION", "TUTION", "TALENT", "CONSULT"], answer: 3 },
          { question: "Arrange the following in a logical sequence: 1. Nation, 2. Village, 3. City, 4. District, 5. State", options: ["2, 3, 4, 5, 1", "2, 4, 5, 3, 1", "2, 4, 3, 5, 1", "1, 3, 5, 4, 2"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'ESRO' using each letter only once in each word?", options: ["One", "Two", "Three", "Four"], answer: 1 },
          { question: "Arrange the following: 1. Study, 2. Job, 3. Examination, 4. Earn, 5. Apply", options: ["1, 3, 5, 2, 4", "1, 2, 3, 4, 5", "1, 3, 2, 5, 4", "1, 5, 3, 2, 4"], answer: 0 },
          { question: "From the word 'EXAMINATION', which word CANNOT be formed?", options: ["NATION", "ACTION", "NOTE", "MINT"], answer: 1 },
          { question: "Arrange in a meaningful order: 1. Infant, 2. Old, 3. Adult, 4. Adolescent, 5. Child", options: ["1, 5, 4, 3, 2", "1, 5, 3, 4, 2", "2, 3, 4, 5, 1", "1, 4, 5, 3, 2"], answer: 0 },
          { question: "From the word 'MEASUREMENT', which word can be formed?", options: ["MASTER", "SURE", "MANTLE", "SUMMIT"], answer: 0 },
          { question: "Arrange the following: 1. Cutting, 2. Dish, 3. Vegetable, 4. Market, 5. Cooking", options: ["4, 3, 1, 5, 2", "3, 4, 1, 5, 2", "4, 1, 3, 5, 2", "1, 3, 4, 5, 2"], answer: 0 },
          { question: "From the word 'CHARACTER', which word CANNOT be formed?", options: ["HEART", "TRACE", "CHARTER", "CREATE"], answer: 3 },
          { question: "Arrange in a logical order: 1. House, 2. Street, 3. Room, 4. Town, 5. District", options: ["3, 1, 2, 4, 5", "3, 2, 1, 4, 5", "3, 1, 4, 2, 5", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'ACT' using each letter only once in each word?", options: ["One", "Two", "Three", "Four"], answer: 1 },
          { question: "Arrange the following: 1. Consultation, 2. Illness, 3. Doctor, 4. Treatment, 5. Recovery", options: ["2, 3, 1, 4, 5", "2, 1, 3, 4, 5", "3, 2, 1, 4, 5", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "From the word 'REASONING', which word can be formed?", options: ["SEASON", "ORANGE", "SONAR", "IGNORE"], answer: 2 },
          { question: "Arrange in a meaningful sequence: 1. Yarn, 2. Plant, 3. Saree, 4. Cotton, 5. Cloth", options: ["2, 4, 1, 5, 3", "2, 4, 5, 1, 3", "2, 1, 4, 5, 3", "4, 2, 1, 5, 3"], answer: 0 },
          { question: "From 'INTELLIGENCE', which word CANNOT be formed?", options: ["GENTLE", "INCITE", "NEGLECT", "CLIENT"], answer: 1 },
          { question: "Arrange the following: 1. Reading, 2. Composing, 3. Writing, 4. Printing, 5. Binding", options: ["2, 3, 1, 4, 5", "3, 2, 1, 4, 5", "2, 3, 4, 1, 5", "3, 1, 2, 4, 5"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'EAP' using each letter only once in each word?", options: ["One", "Two", "Three", "None"], answer: 1 }
        ],
        [
          { question: "Arrange the words in a logical order: 1. Sentence, 2. Chapter, 3. Letter, 4. Book, 5. Word", options: ["3, 5, 1, 2, 4", "3, 1, 5, 2, 4", "3, 5, 2, 1, 4", "1, 3, 5, 2, 4"], answer: 0 },
          { question: "From the word 'SIGNATURE', which word CANNOT be formed?", options: ["NATURE", "SIGNET", "GIANT", "GUEST"], answer: 3 },
          { question: "Arrange the following: 1. Probation, 2. Interview, 3. Selection, 4. Appointment, 5. Advertisement", options: ["5, 2, 3, 4, 1", "5, 3, 2, 4, 1", "5, 2, 4, 3, 1", "4, 5, 2, 3, 1"], answer: 0 },
          { question: "From the word 'WONDERFUL', which word can be formed?", options: ["OWNER", "FLOWN", "WOUND", "FROWN"], answer: 3 },
          { question: "Arrange in a meaningful sequence: 1. Shoulder, 2. Wrist, 3. Elbow, 4. Palm, 5. Finger", options: ["5, 4, 2, 3, 1", "1, 3, 2, 4, 5", "1, 2, 3, 4, 5", "3, 4, 5, 2, 1"], answer: 1 },
          { question: "How many meaningful English words can be formed with the letters 'OFRM' using each letter only once in each word?", options: ["One", "Two", "Three", "Four"], answer: 0 },
          { question: "Arrange the following: 1. Income, 2. Status, 3. Education, 4. Well-being, 5. Job", options: ["3, 5, 1, 2, 4", "3, 1, 5, 2, 4", "1, 3, 5, 2, 4", "5, 1, 3, 2, 4"], answer: 0 },
          { question: "From the word 'KNOWLEDGE', which word CANNOT be formed?", options: ["WEDGE", "Ledge", "KNOW", "GOWN"], answer: 0 },
          { question: "Arrange in a logical order: 1. Rain, 2. Vaporization, 3. Water, 4. Condensation, 5. Cloud", options: ["3, 2, 5, 4, 1", "3, 2, 4, 5, 1", "2, 3, 4, 5, 1", "1, 3, 2, 4, 5"], answer: 0 },
          { question: "From the word 'THERMOLYSIS', which word can be formed?", options: ["SISTER", "LORIS", "METRO", "LOTTERY"], answer: 1 },
          { question: "Arrange the following: 1. Presentation, 2. Recommendation, 3. Arrival, 4. Discussion, 5. Introduction", options: ["3, 5, 1, 4, 2", "3, 5, 4, 1, 2", "5, 3, 1, 4, 2", "5, 3, 4, 1, 2"], answer: 0 },
          { question: "From the word 'CONTAMINATE', which word CANNOT be formed?", options: ["TENT", "NATION", "MINT", "COME"], answer: 1 },
          { question: "Arrange in a meaningful sequence: 1. Birth, 2. Death, 3. Funeral, 4. Marriage, 5. Education", options: ["1, 5, 4, 2, 3", "1, 4, 5, 2, 3", "2, 3, 4, 5, 1", "1, 5, 4, 3, 2"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'DREI' using each letter only once in each word?", options: ["One", "Two", "Three", "None"], answer: 1 },
          { question: "Arrange the following: 1. Key, 2. Door, 3. Lock, 4. Room, 5. Switch on", options: ["1, 3, 2, 4, 5", "1, 2, 3, 4, 5", "3, 1, 2, 4, 5", "2, 3, 1, 4, 5"], answer: 0 },
          { question: "From the word 'ORGANIZATION', which word can be formed?", options: ["NATION", "GRANT", "ORANGE", "GIANT"], answer: 0 },
          { question: "Arrange in a logical order: 1. Site, 2. Plan, 3. Rent, 4. Money, 5. Building", options: ["4, 1, 2, 5, 3", "4, 2, 1, 5, 3", "1, 2, 3, 4, 5", "2, 3, 5, 1, 4"], answer: 0 },
          { question: "From 'ENVIRONMENT', which word CANNOT be formed?", options: ["MOTOR", "ENTER", "IRON", "RENT"], answer: 0 },
          { question: "Arrange the following: 1. Index, 2. Contents, 3. Title, 4. Chapters, 5. Introduction", options: ["3, 2, 5, 1, 4", "3, 5, 2, 4, 1", "3, 1, 2, 4, 5", "2, 3, 5, 4, 1"], answer: 1 },
          { question: "How many meaningful English words can be formed with the letters 'LGEU' using each letter only once in each word?", options: ["One", "Two", "Three", "Four"], answer: 1 }
        ],
        [
          { question: "Arrange the words in a meaningful sequence: 1. Wall, 2. Clay, 3. House, 4. Room, 5. Bricks", options: ["2, 5, 1, 4, 3", "2, 1, 5, 4, 3", "5, 2, 1, 4, 3", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "From the word 'CHAMPIONSHIP', which word CANNOT be formed?", options: ["COMPASSION", "ACTION", "NATION", "CAMP"], answer: 0 },
          { question: "Arrange the following: 1. Poverty, 2. Population, 3. Death, 4. Unemployment, 5. Disease", options: ["2, 4, 1, 5, 3", "2, 1, 4, 5, 3", "1, 2, 3, 4, 5", "4, 1, 2, 5, 3"], answer: 0 },
          { question: "From the word 'SUPERINTENDENT', which word can be formed?", options: ["INTENSE", "DENTIST", "NURSE", "DOCTOR"], answer: 0 },
          { question: "Arrange in a logical order: 1. Galaxy, 2. Sun, 3. Planet, 4. Star, 5. Universe", options: ["5, 1, 4, 3, 2", "5, 1, 2, 4, 3", "1, 5, 4, 2, 3", "5, 1, 2, 3, 4"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'AER' using each letter only once in each word?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Arrange the following: 1. Travel, 2. Destination, 3. Payment, 4. Berth/Seat number, 5. Reservation", options: ["3, 5, 4, 1, 2", "5, 3, 4, 1, 2", "3, 4, 5, 1, 2", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "From the word 'INCONVENIENCE', which word CANNOT be formed?", options: ["CONVINCE", "CONVENE", "CONSCIENCE", "CONCEIVE"], answer: 2 },
          { question: "Arrange in a meaningful sequence: 1. Mother, 2. Child, 3. Milk, 4. Cry, 5. Smile", options: ["2, 4, 1, 3, 5", "1, 2, 4, 3, 5", "2, 4, 3, 1, 5", "4, 2, 1, 3, 5"], answer: 0 },
          { question: "From the word 'PERFORMANCE', which word can be formed?", options: ["ROAM", "FORMER", "MANOR", "FRAME"], answer: 0 },
          { question: "Arrange the following: 1. Country, 2. Furniture, 3. Forest, 4. Wood, 5. Trees", options: ["1, 3, 5, 4, 2", "1, 5, 3, 4, 2", "3, 5, 4, 2, 1", "5, 3, 4, 2, 1"], answer: 0 },
          { question: "From the word 'TREMENDOUS', which word CANNOT be formed?", options: ["TREND", "MEND", "DOUSE", "DRUM"], answer: 3 },
          { question: "Arrange in a logical order: 1. Heel, 2. Shoulder, 3. Skull, 4. Neck, 5. Knee", options: ["3, 4, 2, 5, 1", "3, 2, 4, 5, 1", "1, 5, 2, 4, 3", "5, 1, 2, 4, 3"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'OTN' using each letter only once in each word?", options: ["One", "Two", "Three", "None"], answer: 1 },
          { question: "Arrange the following: 1. Gold, 2. Iron, 3. Sand, 4. Platinum, 5. Diamond", options: ["3, 2, 1, 5, 4", "2, 3, 1, 5, 4", "3, 2, 1, 4, 5", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "From the word 'CONCENTRATION', which word can be formed?", options: ["CONCERN", "NATION", "RATIO", "CENTRE"], answer: 1 },
          { question: "Arrange in a meaningful sequence: 1. Frog, 2. Eagle, 3. Grasshopper, 4. Snake, 5. Grass", options: ["5, 3, 1, 4, 2", "5, 1, 3, 4, 2", "3, 5, 1, 4, 2", "1, 3, 5, 2, 4"], answer: 0 },
          { question: "From 'COMMUNICATION', which word CANNOT be formed?", options: ["ACTION", "NATION", "UNION", "CAUTION"], answer: 3 },
          { question: "Arrange the following: 1. College, 2. Child, 3. Salary, 4. School, 5. Employment", options: ["2, 4, 1, 5, 3", "1, 4, 2, 5, 3", "2, 1, 4, 5, 3", "4, 1, 2, 5, 3"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'EKA' using each letter only once in each word?", options: ["One", "Two", "Three", "None"], answer: 3 }
        ],
        [
          { question: "Arrange the words in a logical order: 1. Windows, 2. Walls, 3. Floor, 4. Foundation, 5. Roof", options: ["4, 3, 2, 1, 5", "4, 2, 1, 5, 3", "4, 1, 2, 5, 3", "3, 4, 2, 1, 5"], answer: 0 },
          { question: "From the word 'CARPENTER', which word CANNOT be formed?", options: ["PAINTER", "CARPET", "REPENT", "NECTAR"], answer: 0 },
          { question: "Arrange the following: 1. Curd, 2. Grass, 3. Butter, 4. Milk, 5. Cow", options: ["5, 2, 4, 1, 3", "5, 4, 2, 1, 3", "2, 5, 4, 1, 3", "4, 5, 2, 1, 3"], answer: 0 },
          { question: "From the word 'BLACKSMITH', which word can be formed?", options: ["HACK", "BACK", "SMITH", "BLACK"], answer: 2 },
          { question: "Arrange in a meaningful sequence: 1. Doctor, 2. Fever, 3. Prescription, 4. Diagnosis, 5. Medicine", options: ["2, 1, 4, 3, 5", "2, 1, 3, 4, 5", "1, 2, 4, 3, 5", "1, 4, 3, 2, 5"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'STPO' using each letter only once in each word?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Arrange the following: 1. Weaving, 2. Cotton, 3. Cloth, 4. Thread", options: ["2, 4, 1, 3", "2, 1, 4, 3", "4, 2, 1, 3", "1, 2, 4, 3"], answer: 0 },
          { question: "From the word 'IMMEDIATELY', which word CANNOT be formed?", options: ["DIALECT", "LIMITED", "DIAMETER", "MEDIATE"], answer: 0 },
          { question: "Arrange in a logical order: 1. Study, 2. Service, 3. Examination, 4. Earning, 5. Result", options: ["1, 3, 5, 2, 4", "1, 2, 3, 5, 4", "3, 1, 5, 2, 4", "5, 3, 1, 2, 4"], answer: 0 },
          { question: "From the word 'DEPARTMENT', which word can be formed?", options: ["PART", "TREAT", "MATURE", "ENTER"], answer: 0 },
          { question: "Arrange the following: 1. Adult, 2. Baby, 3. Child, 4. Youth", options: ["2, 3, 4, 1", "2, 4, 3, 1", "1, 4, 3, 2", "4, 3, 2, 1"], answer: 0 },
          { question: "From the word 'BACKGROUND', which word CANNOT be formed?", options: ["GROUND", "BAND", "AROUND", "DRAGON"], answer: 2 },
          { question: "Arrange in a meaningful sequence: 1. Seed, 2. Plant, 3. Tree, 4. Flower, 5. Fruit", options: ["1, 2, 4, 5, 3", "1, 2, 3, 4, 5", "2, 1, 3, 4, 5", "1, 3, 2, 4, 5"], answer: 1 },
          { question: "How many meaningful English words can be formed with the letters 'TEAR' using each letter only once in each word?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Arrange the following: 1. Table, 2. Tree, 3. Wood, 4. Seed, 5. Plant", options: ["4, 5, 2, 3, 1", "4, 5, 3, 2, 1", "1, 3, 2, 4, 5", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "From the word 'CHOCOLATE', which word can be formed?", options: ["LATE", "HEALTH", "COOLER", "TELLER"], answer: 0 },
          { question: "Arrange in a logical order: 1. Phrase, 2. Letter, 3. Sentence, 4. Word", options: ["2, 4, 1, 3", "2, 1, 4, 3", "1, 2, 4, 3", "4, 2, 1, 3"], answer: 0 },
          { question: "From 'ADMINISTRATION', which word CANNOT be formed?", "options": ["RATION", "MIND", "STRAIN", "TRADITION"], "answer": 3 },
          { question: "Arrange the following: 1. Evening, 2. Dawn, 3. Noon, 4. Night, 5. Dusk", options: ["2, 3, 1, 5, 4", "2, 1, 3, 5, 4", "1, 2, 3, 4, 5", "3, 1, 5, 4, 2"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'NOW' using each letter only once in each word?", options: ["One", "Two", "Three", "None"], answer: 1 }
        ],
        [
          { question: "Arrange the words in a meaningful sequence: 1. Publication, 2. Author, 3. Reader, 4. Printing, 5. Content", options: ["2, 5, 4, 1, 3", "2, 5, 1, 4, 3", "5, 2, 4, 1, 3", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "From the word 'PSYCHOMETRIC', which word CANNOT be formed?", options: ["METRIC", "PSYCHO", "CHEMIST", "ROME"], answer: 2 },
          { question: "Arrange the following: 1. Application, 2. Selection, 3. Exam, 4. Interview, 5. Advertisement", options: ["5, 1, 3, 4, 2", "5, 1, 4, 3, 2", "1, 5, 3, 4, 2", "5, 3, 1, 4, 2"], answer: 0 },
          { question: "From the word 'PROCASTINATION', which word can be formed?", options: ["ACTION", "PRINT", "RATION", "NATION"], answer: 0 },
          { question: "Arrange in a logical order: 1. Elephant, 2. Cat, 3. Mosquito, 4. Tiger, 5. Whale", options: ["3, 2, 4, 1, 5", "2, 3, 4, 1, 5", "1, 2, 3, 4, 5", "5, 4, 1, 2, 3"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'EASL' using each letter only once in each word?", options: ["One", "Two", "Three", "Four"], answer: 2 },
          { question: "Arrange the following: 1. District, 2. Country, 3. State, 4. Continent, 5. Village", options: ["5, 1, 3, 2, 4", "5, 3, 1, 2, 4", "1, 3, 5, 2, 4", "4, 2, 3, 1, 5"], answer: 0 },
          { question: "From the word 'RHINOCEROS', which word CANNOT be formed?", options: ["SHINE", "HORN", "RISE", "HORSE"], answer: 3 },
          { question: "Arrange in a meaningful sequence: 1. Dough, 2. Flour, 3. Cake, 4. Wheat, 5. Bake", options: ["4, 2, 1, 5, 3", "4, 1, 2, 5, 3", "2, 4, 1, 5, 3", "1, 2, 4, 5, 3"], answer: 0 },
          { question: "From the word 'EXPERIENCE', which word can be formed?", options: ["EXPIRE", "PRICE", "PERCEIVE", "RECIPE"], answer: 0 },
          { question: "Arrange the following: 1. Sentence, 2. Word, 3. Paragraph, 4. Alphabet, 5. Essay", options: ["4, 2, 1, 3, 5", "4, 1, 2, 3, 5", "2, 4, 1, 3, 5", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "From the word 'GOVERNMENT', which word CANNOT be formed?", options: ["GOVERN", "MENTOR", "MOVE", "VOTE"], answer: 1 },
          { question: "Arrange in a logical order: 1. Design, 2. Analysis, 3. Planning, 4. Implementation, 5. Testing", options: ["3, 2, 1, 4, 5", "2, 3, 1, 4, 5", "3, 1, 2, 4, 5", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'RVED' using each letter only once in each word?", options: ["One", "Two", "Three", "None"], answer: 3 },
          { question: "Arrange the following: 1. Diagnosis, 2. Doctor, 3. Sickness, 4. Medicine, 5. Health", options: ["3, 2, 1, 4, 5", "2, 3, 1, 4, 5", "3, 1, 2, 4, 5", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "From the word 'EVALUATION', which word can be formed?", options: ["VALUE", "NATIVE", "VIOLENT", "LINT"], answer: 0 },
          { question: "Arrange in a meaningful sequence: 1. River, 2. Ocean, 3. Tributary, 4. Sea, 5. Glacier", options: ["5, 3, 1, 4, 2", "5, 1, 3, 4, 2", "3, 1, 5, 4, 2", "1, 3, 5, 2, 4"], answer: 0 },
          { question: "From 'CONVERSATION', which word CANNOT be formed?", options: ["VERSION", "NATION", "STATION", "REASON"], answer: 2 },
          { question: "Arrange the following: 1. Result, 2. Campaign, 3. Swearing-in, 4. Nomination, 5. Polling", options: ["4, 2, 5, 1, 3", "4, 5, 2, 1, 3", "2, 4, 5, 1, 3", "1, 2, 3, 4, 5"], answer: 0 },
          { question: "How many meaningful English words can be formed with the letters 'ILP' using each letter only once in each word?", options: ["One", "Two", "Three", "None"], answer: 0 }
        ]
      ]
    },

    {
      name: 'Dice',
      sets: [
        [
          { question: "Two positions of a dice are shown. When 4 is at the top, what number is at the bottom? The faces shown are (1, 2, 4) and (4, 5, 6).", options: ["1", "2", "3", "5"], answer: 2 },
          { question: "From the given four positions of a single dice, find the number on the face opposite to the face showing 6.", options: ["1", "2", "4", "5"], answer: 0 },
          { question: "A dice is thrown four times and its four different positions are shown below. Find the number on the face opposite the face showing 2.", options: ["3", "4", "5", "6"], answer: 2 },
          { question: "Which digit will appear on the face opposite to the face with number 4? The faces shown are (1, 2, 3) and (3, 4, 5).", options: ["1", "2", "5", "6"], answer: 0 },
          { question: "Two positions of a dice are shown below. When number 1 is on the top, which number will be at the bottom? The faces shown are (1, 2, 3) and (1, 4, 5).", options: ["2", "3", "5", "6"], answer: 3 },
          { question: "An unfolded dice is shown. Which of the given options can be formed by folding it? (1 is opposite 3, 2 is opposite 4, 5 is opposite 6)", options: ["A die showing 1, 3, 5", "A die showing 1, 2, 5", "A die showing 2, 4, 6", "A die showing 5, 6, 1"], answer: 1 },
          { question: "Three positions of a dice are given. Find the number on the face opposite to the one with 2. The faces shown are (1,2,3), (2,3,4), (1,4,5).", options: ["1", "4", "5", "6"], answer: 2 },
          { question: "If the total number of dots on opposite faces of a cubical block is always 7, find the figure which is correct.", options: ["A die showing 1, 6 adjacent", "A die showing 3, 4 adjacent", "A die showing 2, 5 adjacent", "A die showing 1, 2, 3"], answer: 3 },
          { question: "When the following figure is folded to form a cube, how many dots lie opposite the face bearing five dots?", options: ["1", "2", "3", "4"], answer: 2 },
          { question: "Two positions of a block are shown. When 5 is at the top, which number is at the bottom? The faces shown are (2, 3, 5) and (1, 4, 6). This is a standard die.", options: ["1", "2", "3", "4"], answer: 1 },
          { question: "What number is opposite to 3 in the dice shown? The faces shown are (1, 2, 3) and (4, 5, 6). This is a standard die.", options: ["1", "2", "4", "5"], answer: 2 },
          { question: "A dice is numbered from 1 to 6 in such a way that 1 is adjacent to 2, 3 and 5. Which number is opposite to 1?", options: ["4", "6", "2", "5"], answer: 0 },
          { question: "From the given options, which answer figure can be formed by folding the figure given in the question? (A is opposite C, B is opposite D, E is opposite F)", options: ["A, C, E shown together", "B, D, F shown together", "A, B, E shown together", "E, F, A shown together"], answer: 2 },
          { question: "Two positions of a dice are shown. If there are two dots at the bottom, then how many dots are on the top? The faces shown are (1, 3, 5) and (1, 2, 4).", options: ["1", "5", "6", "3"], answer: 2 },
          { question: "If a standard die has 4 at the top, what is at the bottom?", options: ["1", "2", "3", "5"], answer: 2 },
          { question: "Three views of a cube are shown. What is the letter opposite to A? The faces shown are (A,B,C), (B,D,E), (C,E,F).", options: ["D", "E", "F", "C"], answer: 1 },
          { question: "Which number is on the face opposite to 6? The faces shown are (1, 2, 6) and (1, 3, 5).", options: ["1", "2", "3", "4"], answer: 2 },
          { question: "A dice is rolled twice and the positions are shown. What is the number opposite to 4? The faces shown are (2, 3, 4) and (1, 5, 6). This is a standard die.", options: ["1", "2", "3", "5"], answer: 2 },
          { question: "An unfolded dice shows numbers 1, 2, 3, 4 in a row, and 5 above 2, 6 below 2. Which number is opposite to 2?", options: ["1", "3", "4", "Cannot be determined"], answer: 3 },
          { question: "Two positions of a dice are shown. When 2 is at the bottom, what is at the top? The faces shown are (1, 2, 6) and (2, 4, 6).", options: ["1", "3", "5", "4"], answer: 1 }
        ],
        [
          { question: "Two positions of a dice are shown. Which number is opposite to 5? The faces shown are (1, 3, 5) and (2, 4, 6). This is a standard die.", options: ["1", "2", "3", "4"], answer: 1 },
          { question: "From the given two positions of a single dice, find the digit at the face opposite to the face having digit 4. The faces shown are (1, 2, 3) and (1, 4, 5).", options: ["2", "3", "5", "6"], answer: 1 },
          { question: "A dice is thrown three times. The positions are (A, B, C), (C, D, E), (E, F, A). What is the letter opposite to A?", options: ["D", "E", "F", "C"], answer: 0 },
          { question: "Which digit will appear on the face opposite to the face with number 3? The faces shown are (1, 6, 3) and (1, 5, 2).", options: ["1", "2", "4", "5"], answer: 2 },
          { question: "Two positions of a dice are shown. When 'A' is at the top, what is at the bottom? The faces shown are (A, B, F) and (A, C, D).", options: ["B", "C", "E", "F"], answer: 2 },
          { question: "An unfolded dice is shown. 1 is opposite 6, 2 is opposite 4, 3 is opposite 5. Which option is a valid folded die?", options: ["A die showing 1, 6, 2", "A die showing 2, 4, 3", "A die showing 3, 5, 1", "A die showing 1, 2, 3"], answer: 3 },
          { question: "Three positions of a dice are given. Find the number on the face opposite to the one with 6. The faces shown are (1,2,6), (2,3,4), (4,5,6).", options: ["1", "3", "4", "5"], answer: 1 },
          { question: "If a die is NOT standard, and it shows 1, 2, and 4 on adjacent faces, which of the following is a possible pair of opposite faces?", options: ["1-6", "2-5", "1-2", "3-4"], answer: 2 },
          { question: "When the following figure is folded, which face is opposite to the face with 'C'? The net is A, B, C, D in a row, E above B, F below B.", options: ["A", "B", "D", "E"], answer: 2 },
          { question: "Two positions of a block are shown. When 'Red' is at the top, which color is at the bottom? Faces: (Red, Blue, Green) and (Red, Yellow, Orange).", options: ["Blue", "Green", "Violet", "Yellow"], answer: 2 },
          { question: "What number is opposite to 1 in a standard die?", options: ["3", "4", "5", "6"], answer: 3 },
          { question: "A dice is numbered 1 to 6. 1 is opposite 5, 2 is opposite 4, and 3 is opposite 6. Is this a standard die?", options: ["Yes", "No", "Cannot be determined", "Sometimes"], answer: 1 },
          { question: "From the given options, which answer figure can be formed by folding the figure? (Net shows '+' opposite '-', '*' opposite '/', and '$' opposite '#')", options: ["A die showing +, -, $", "A die showing *, /, #", "A die showing +, *, $", "A die showing #, $, /"], answer: 2 },
          { question: "Two positions of a dice are shown. If there are four dots at the bottom, then how many dots are on the top? Faces: (1, 2, 3) and (3, 4, 5).", options: ["1", "2", "5", "6"], answer: 1 },
          { question: "If a standard die is rolled and shows 5 on the top face, what is the sum of dots on the top and bottom faces?", options: ["6", "7", "8", "9"], answer: 1 },
          { question: "Three views of a cube are shown. What is the symbol opposite to the circle? Faces: (Circle, Triangle, Square), (Triangle, Plus, Star), (Square, Plus, Hexagon).", options: ["Triangle", "Square", "Plus", "Star"], answer: 2 },
          { question: "Which number is on the face opposite to 1? The faces shown are (1, 2, 3) and (1, 3, 4).", options: ["2", "4", "5", "6"], answer: 3 },
          { question: "A dice is rolled twice. Positions are (6, 1, 4) and (2, 3, 5). This is a standard die. Are these positions possible for the same die?", options: ["Yes", "No", "Data insufficient", "Only one is possible"], answer: 1 },
          { question: "An unfolded dice shows symbols. '@' is opposite '#', '$' is opposite '%', '&' is opposite '*'. Which is a valid folded die?", options: ["@, #, $ shown together", "&, *, % shown together", "@, $, & shown together", "%, $, # shown together"], answer: 2 },
          { question: "Two positions of a dice are shown. When 6 is at the bottom, what is at the top? Faces: (1, 5, 6) and (1, 4, 2).", options: ["1", "3", "4", "5"], answer: 1 }
        ],
        [
          { question: "Two positions of a dice are shown. What is the number opposite to 1? Faces: (1, 2, 3) and (2, 3, 4).", options: ["3", "4", "5", "6"], answer: 1 },
          { question: "From the given two positions of a single dice, find the digit at the face opposite to the face having digit 2. Faces: (2, 6, 4) and (2, 1, 3).", options: ["1", "3", "5", "6"], answer: 2 },
          { question: "A dice is thrown three times. Positions are (1, 6, 3), (1, 3, 5), (2, 4, 6). What is the number opposite to 6?", options: ["1", "3", "4", "5"], answer: 3 },
          { question: "Which digit will appear on the face opposite to the face with number 5? Faces: (1, 2, 5) and (3, 4, 5).", options: ["1", "2", "6", "4"], answer: 2 },
          { question: "Two positions of a dice are shown. When 3 is at the top, what is at the bottom? Faces: (3, 6, 2) and (3, 5, 1).", options: ["1", "2", "4", "5"], answer: 2 },
          { question: "An unfolded dice is shown. Which of the given options can be formed? (1-2, 3-4, 5-6 are opposite pairs)", options: ["1, 2, 3 shown", "3, 4, 5 shown", "1, 3, 5 shown", "5, 6, 1 shown"], answer: 2 },
          { question: "Three positions of a dice are given. Find the number opposite to 3. Faces: (1, 3, 5), (2, 3, 6), (3, 4, 5).", options: ["1", "2", "6", "Cannot be determined"], answer: 3 },
          { question: "A standard die is shown with face 1 on top. Which of these numbers cannot be on any of the four adjacent side faces?", options: ["2", "3", "5", "6"], answer: 3 },
          { question: "When the following figure is folded, which face is opposite to 'E'? Net: A-B-C-D in a row, E above B, F below B.", options: ["A", "B", "D", "F"], answer: 3 },
          { question: "Two positions of a block are shown. When 'Triangle' is at the top, what is at the bottom? Faces: (Triangle, Circle, Square) and (Triangle, Star, Plus).", options: ["Circle", "Square", "Hexagon", "Star"], answer: 2 },
          { question: "What is the sum of numbers on the opposite faces of a standard die?", options: ["6", "7", "8", "Varies"], answer: 1 },
          { question: "A dice has A, B, C, D, E, F on its faces. A is opposite D, B is opposite E. Which is true?", options: ["C is opposite F", "A is adjacent to D", "B is adjacent to E", "C is adjacent to A, B, D, E"], answer: 0 },
          { question: "From the given options, which figure can be formed by folding the given net? (Net: 1-2-3-4 in a row, 5 above 2, 6 below 2)", options: ["1, 2, 5 shown", "1, 3, 5 shown", "3, 4, 6 shown", "2, 5, 6 shown"], answer: 1 },
          { question: "Two positions of a dice are shown. If there are 6 dots at the bottom, how many are on top? Faces: (1, 2, 6) and (3, 4, 5). This is a standard die.", options: ["1", "2", "3", "4"], answer: 0 },
          { question: "If a die is not standard, and 1 is opposite 2, 3 is opposite 4, what is opposite 5?", options: ["1", "2", "6", "Cannot be determined"], answer: 2 },
          { question: "Three views of a cube are shown. What color is opposite to Yellow? Faces: (Yellow, Blue, Orange), (Blue, Red, Green), (Orange, Green, Violet).", options: ["Blue", "Red", "Green", "Violet"], answer: 2 },
          { question: "Which number is opposite to 5? Faces: (1, 5, 4) and (2, 5, 3).", options: ["1", "2", "4", "6"], answer: 3 },
          { question: "A dice is rolled twice. Positions are (1, 2, 3) and (4, 5, 6). Can this be a single standard die?", options: ["Yes", "No", "Maybe", "Data insufficient"], answer: 0 },
          { question: "An unfolded dice shows letters. P is opposite S, Q is opposite T, R is opposite U. Which is a valid folded die?", options: ["P, S, Q shown", "Q, T, R shown", "P, Q, R shown", "R, U, S shown"], answer: 2 },
          { question: "Two positions of a dice are shown. When 4 is at the bottom, what is at the top? Faces: (1, 3, 4) and (2, 5, 4).", options: ["1", "3", "6", "5"], answer: 2 }
        ],
        [
          { question: "Two positions of a dice are shown. Which number is opposite to 3? Faces: (1, 2, 3) and (1, 4, 5).", options: ["2", "4", "5", "6"], answer: 3 },
          { question: "From the given two positions, find the digit opposite to 6. Faces: (1, 2, 6) and (3, 4, 5). This is a standard die.", options: ["1", "2", "3", "4"], answer: 0 },
          { question: "A dice is thrown three times. Positions are (Red, Green, Blue), (Green, Yellow, Orange), (Blue, Yellow, Black). What is opposite Green?", options: ["Red", "Blue", "Black", "Orange"], answer: 2 },
          { question: "Which digit is opposite to 2? Faces: (1, 2, 6) and (2, 4, 5).", options: ["1", "3", "5", "6"], answer: 1 },
          { question: "Two positions of a dice are shown. When 'M' is at the top, what is at the bottom? Faces: (M, N, O) and (M, P, Q).", options: ["N", "O", "R", "P"], answer: 2 },
          { question: "An unfolded dice is shown. Which option can be formed? (1-5, 2-4, 3-6 are opposite pairs)", options: ["1, 5, 2 shown", "2, 4, 3 shown", "1, 2, 3 shown", "3, 6, 4 shown"], answer: 2 },
          { question: "Three positions of a dice are given. Find the number opposite to 1. Faces: (1, 2, 3), (1, 3, 4), (1, 4, 5).", options: ["2", "3", "6", "Cannot be determined"], answer: 2 },
          { question: "A standard die is rolled. If the sum of the top and front faces is 5, what is the number on the bottom face?", options: ["2", "3", "4", "5"], answer: 3 },
          { question: "When the following figure is folded, which face is opposite to the blank face? Net: A, B, Blank, D in a row.", options: ["A", "B", "D", "Cannot be determined"], answer: 3 },
          { question: "Two positions of a block are shown. When 6 is at the top, what is at the bottom? Faces: (1, 2, 6) and (3, 4, 5). This is a standard die.", options: ["1", "2", "3", "4"], answer: 0 },
          { question: "What number is opposite to 2 in a standard die?", options: ["3", "4", "5", "6"], answer: 2 },
          { question: "A dice has symbols. Star is adjacent to Circle, Triangle, and Square. Which symbol is opposite to Star?", options: ["Circle", "Plus", "Hexagon", "Triangle"], answer: 2 },
          { question: "From the given options, which figure can be formed by folding the given net? (Net: A-B-C-D in a row, E above B, F below B)", options: ["A, B, E shown", "A, C, F shown", "D, B, F shown", "C, D, E shown"], answer: 0 },
          { question: "Two positions of a dice are shown. If there is 1 dot at the bottom, how many are on top? Faces: (1, 2, 4) and (1, 3, 5).", options: ["2", "4", "6", "5"], answer: 2 },
          { question: "If a die is standard, which of the following pairs CANNOT be on opposite faces?", options: ["1 and 6", "2 and 5", "3 and 4", "1 and 2"], answer: 3 },
          { question: "Three views of a cube are shown. What number is opposite to 3? Faces: (1, 2, 3), (2, 4, 5), (3, 5, 6).", options: ["1", "2", "4", "5"], answer: 3 },
          { question: "Which number is opposite to 4? Faces: (2, 3, 4) and (3, 5, 6).", options: ["1", "2", "3", "6"], answer: 3 },
          { question: "A dice is rolled twice. Positions are (1, 3, 5) and (2, 4, 6). Can this be a single die?", options: ["Yes", "No", "Only if it's not standard", "Only if it's standard"], answer: 0 },
          { question: "An unfolded dice shows numbers. 1 is adjacent to 2, 3, 4, 5. Which number is opposite to 1?", options: ["2", "3", "6", "Cannot be determined"], answer: 2 },
          { question: "Two positions of a dice are shown. When 5 is at the bottom, what is at the top? Faces: (1, 2, 5) and (2, 3, 4).", options: ["1", "3", "6", "4"], answer: 2 }
        ],
        [
          { question: "Two positions of a dice are shown. Which number is opposite to 2? Faces: (1, 2, 3) and (2, 4, 5).", options: ["1", "3", "6", "5"], answer: 2 },
          { question: "From the given two positions, find the digit opposite to 1. Faces: (1, 6, 5) and (1, 4, 2).", options: ["2", "3", "4", "5"], answer: 1 },
          { question: "A dice is thrown three times. Positions are (P, Q, R), (Q, S, T), (R, T, U). What is opposite to T?", options: ["P", "Q", "R", "S"], answer: 2 },
          { question: "Which digit is opposite to 6? Faces: (1, 2, 6) and (2, 3, 4).", options: ["1", "3", "4", "5"], answer: 2 },
          { question: "Two positions of a dice are shown. When 'Z' is at the top, what is at the bottom? Faces: (X, Y, Z) and (U, V, W). This is a standard die.", options: ["A", "B", "C", "Cannot be determined"], answer: 3 },
          { question: "An unfolded dice is shown. Which option can be formed? (A-D, B-E, C-F are opposite pairs)", options: ["A, D, B shown", "B, E, C shown", "A, B, C shown", "C, F, A shown"], answer: 2 },
          { question: "Three positions of a dice are given. Find the number opposite to 5. Faces: (1, 2, 5), (2, 3, 4), (4, 5, 6).", options: ["1", "2", "3", "4"], answer: 2 },
          { question: "A standard die is rolled. The top face is an even number. Which of the following CANNOT be the number on the bottom face?", options: ["1", "3", "5", "2"], answer: 3 },
          { question: "When the following figure is folded, which face is opposite to the face with '3'? Net: 1-2-3 in a row, 4 above 2, 5 below 2, 6 right of 3.", options: ["1", "2", "4", "5"], answer: 0 },
          { question: "Two positions of a block are shown. When 'Apple' is at the top, what is at the bottom? Faces: (Apple, Ball, Cat) and (Apple, Dog, Elephant).", options: ["Ball", "Cat", "Fish", "Dog"], answer: 2 },
          { question: "What number is never adjacent to its consecutive number on a standard die?", options: ["1", "3", "5", "6"], answer: 3 },
          { question: "A dice has colors. Red is opposite Green, Blue is opposite Yellow. What is opposite Orange?", options: ["Violet", "Red", "Green", "Blue"], answer: 0 },
          { question: "From the given options, which figure can be formed by folding the given net? (Net: 1-2-3-4 in a column, 5 left of 2, 6 right of 2)", "options": ["1, 2, 5 shown", "1, 3, 5 shown", "3, 4, 6 shown", "2, 5, 6 shown"], "answer": 1 },
          { question: "Two positions of a dice are shown. If there are 3 dots at the bottom, how many are on top? Faces: (1, 2, 3) and (4, 5, 6). This is a standard die.", options: ["1", "2", "4", "5"], answer: 2 },
          { question: "If a die is not standard, and the faces 1, 2, 3, 4, 5, 6 are randomly placed, how many possible arrangements are there?", options: ["120", "360", "720", "480"], answer: 3 },
          { question: "Three views of a cube are shown. What number is opposite to 2? Faces: (1, 2, 3), (2, 3, 4), (1, 4, 5).", options: ["1", "3", "5", "6"], answer: 2 },
          { question: "Which number is opposite to 'B'? Faces: (A, B, C) and (C, D, E).", options: ["A", "D", "E", "F"], answer: 2 },
          { question: "A dice is rolled twice. Positions are (1, 2, 4) and (3, 5, 6). Can this be a single die?", options: ["Yes", "No", "Only if it's not standard", "Data insufficient"], answer: 0 },
          { question: "An unfolded dice shows numbers. 6 is adjacent to 2, 3, 4, 5. Which number is opposite to 6?", options: ["1", "2", "3", "Cannot be determined"], answer: 0 },
          { question: "Two positions of a dice are shown. When 1 is at the bottom, what is at the top? Faces: (1, 2, 3) and (1, 3, 4).", options: ["2", "4", "5", "6"], answer: 2 }
        ]
      ]
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

