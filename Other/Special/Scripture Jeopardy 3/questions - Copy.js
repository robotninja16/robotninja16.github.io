//question: The question
//answer: A brief answer to the question
//reference: Optional - a reference to a source
//media: Optional - HTML content for special media like audio or images
//dailyDouble: Optional boolean - indicates whether the question is a daily double
let questions = [
    { // 1st category
        "question_200": {
            question: 'This man is credited for saying, "Why persecute me for telling the truth? I have actually seen a vision; and who am I that I can withstand God, or why does the world think to make me deny what I have actually seen? For I had seen a vision; I knew it, and I knew that God knew it, and I could not deny it".',
            answer: 'Joseph Smith',
            reference: 'Joseph Smith—History 1:25'
        },
        "question_400": {
            question: 'Jesus taught, "Blessed are the pure in heart: for they shall see God." In what sermon did He teach this?',
            answer: 'Sermon on the Mount',
            reference: 'Matthew 5:8'
        },
        "question_600": {
            question: 'This Antichrist attempted to justify himself by saying, "ye cannot know of things which ye do not see; therefore ye cannot know that there shall be a Christ." Ironically, he claimed to know that there would be no Christ. Alma proved him wrong and he was left unable to speak for the rest of his short life.',
            answer: 'Korihor',
            reference: 'Alma 30:15'
        },
        "question_800": {
            question: 'In the same section where we find great detail about the Plan of Salvation, these two men testified, "And now, after the many testimonies which have been given of him, this is the testimony, last of all, which we give of him: That he lives! For we saw him, even on the right hand of God".',
            answer: 'Joseph Smith and Sidney Rigdon',
            reference: 'D&C 76:22-23'
        },
        "question_1000": {
            question: 'Moses sent spies from each tribe of Israel to go and search the land of Canaan. They were to go and find out whether the Israelites should take the land by force. Ten gave an evil report. God promised that they would not see the promised land. These two gave a good report and were blessed not only to see the land, but to live there.',
            answer: 'Joshua and Caleb'
        }
    },
    { // 2nd category
        "question_200": {
            question: 'Examine the picture and see if you know what group has this set of shoes.',
            media: '<img src="apostles_shoes.png" class="question-image">',
            answer: 'The Twelve Apostles'
        },
        "question_400": {
            question: 'Examine the picture and figure out whose shoes these are.',
            media: '<img src="mormons_shoes.png" class="question-image">',
            answer: 'Mormon'
        },
        "question_600": {
            question: 'Examine the picture and determine what Jesus is doing in this picture.',
            media: '<img src="peters_shoes.png" class="question-image">',
            answer: 'Washing the apostles\' feet'
        },
        "question_800": {
            question: 'Examine the picture and figure out whose shoes these are.',
            media: '<img src="josephs_shoes.png" class="question-image">',
            answer: 'Joseph Smith'
        },
        "question_1000": {
            question: 'Examine the picture and figure out whose shoes these are.',
            media: '<img src="moses_shoes.png" class="question-image">',
            answer: 'Moses'
        }
    },
    { // 3rd category
        "question_200": {
            question: 'In the scriptures, baptism is spoken of in two ways. First, physical baptism by immersion in ____. Second, spiritual baptism with _____ and with the Holy Ghost. These two things could be considered opposites by some.',
            answer: 'Water and fire'
        },
        "question_400": {
            question: 'The Lord rained fire and brimstone on these two cities because of their incredible wickendess. Lot\'s wife is also known for looking back toward them and turning into a pillar of salt.',
            answer: 'Sodom and Gomorrah'
        },
        "question_600": {
            question: 'While this special day is given in the Old Testament and mosaic law, it is also associated with the New Testament; at this event, known as the day of ____, Peter and the apostles were able to speak with cloven tongues of fire — the crowd, full of people from different backgrounds, could all understand the words of the apostles.',
            answer: 'Pentecost',
            dailyDouble: true
        },
        "question_800": {
            question: 'After Adam and Eve could no longer dwell in Eden, the Lord placed cherubim and a flaming sword to protect them from finding this.',
            answer: 'The Tree of Life'
        },
        "question_1000": {
            question: 'Toward the beginning of the book of Matthew, this prophet taught, "And now also the axe is laid unto the root of the trees: therefore every tree which bringeth not forth good fruit is hewn down, and cast into the fire."',
            answer: 'John the Baptist',
            reference: 'Matthew 3:10'
        }
    },
    { // 4th category
        "question_200": {
            question: 'Pontius Pilate did this with his hands to signify his declaration that he was innocent of the blood of Jesus.',
            answer: 'He washed them.'
        },
        "question_400": {
            question: 'This man was commanded by God to hold his hands up; by doing so, his nation would prevail in battle. However, his hands grew heavy with weariness, and he needed help to hold them up. (+100 points for the names of the people who helped him)',
            answer: 'Moses (help from Aaron and Hur)'
        },
        "question_600": {
            question: 'These two men were brothers. One was hairy, and the other, in his own words, was smooth. The smooth man got goat hair, put it on his hands, and pretended to be his brother so he could receive a blessing.',
            answer: 'Jacob and Esau'
        },
        "question_800": {
            question: 'Jesus taught, "Wherefore if thy hand or thy foot offend thee, cut them off, and cast them from thee: it is better for thee to enter into life halt or maimed, rather than having two hands or two feet to be cast into everlasting fire." Joseph Smith specified that a man\'s hand or foot is his ____',
            answer: 'Friend',
            reference: 'JST Matthew 18:8'
        },
        "question_1000": {
            question: 'Joseph Smith received revelation that if the saints believed they saw a spirit or angel, they should ask that spirit or angel to do this. By doing so, they would be able to tell if it was a devil, righteous spirit, or an angel.',
            answer: 'Shake hands',
            reference: "See D&C 129"
        }
    },
    { // 5th category
        "question_200": {
            question: 'This man and his two companions, Shadrach and Meshach, were known for disobeying Nebuchadnezzar but remaining alive even when cast into a burning furnace. His name is an anagram of:',
            media: '<h3>BEAN DOGE</h3>',
            answer: 'Abed-nego'
        },
        "question_400": {
            question: 'These three men were apostles of the Savior during His mortal ministry. They also appeared to Joseph Smith to restore the power of the Melchizedek priesthood. Their names are an anagram of this random nonsense:',
            media: '<h3>HAMPER JET AND JONES</h3>',
            answer: 'Peter, James, and John'
        },
        "question_600": {
            question: 'This man is still alive. If you type his name all out of order you could theoretically spell:',
            media: '<h3>LIL HAND SOAK</h3>',
            answer: 'Dallin H. Oaks'
        },
        "question_800": {
            question: 'This man was a prominent Gadianton robber in the Book of Mormon. Descramble and discover his name:',
            media: '<h3>KINE K MUSH</h3>',
            answer: 'Kishkumen'
        },
        "question_1000": {
            question: 'This man was a king of Israel... but he did not last long before the kingdom split. One unique way to re-spell his name would be:',
            media: '<h3>A BRO HOME</h3>',
            answer: 'Rehoboam',
        }
    },
    { // 6th category
        "question_200": {
            question: 'After the wickedness of king Noah, the Nephites that were previously safe were in bondage under the Lamanites. This man, Noah\'s son, was king as he led the Nephites through their heavy burdens. Eventually they learned that there were still other Nephites who could help them.',
            answer: 'Limhi',
            reference: 'Mosiah 21'
        },
        "question_400": {
            question: 'Jesus taught, "Come unto me, all ye that labour and are heavy laden, and I will give you ____." What is the quote missing?',
            answer: 'Rest',
            reference: 'Matthew 11:28'
        },
        "question_600": {
            question: 'Captain Moroni had many innovations to help the Nephites win their battles. This was one of the first ways he improved their warfare. This protected the Nephites, while the Lamanites were exposed to the Nephites\' "heavy blows".',
            answer: 'Armor and shields',
            reference: 'Alma 43:37'
        },
        "question_800": {
            question: '"Make the heart of this people fat, and make their ears heavy, and shut their eyes—lest they see with their eyes, and hear with their ears, and understand with their heart, and be converted and be healed." This scripture is written in the Book of Mormon, but it is actually a quotation from this Old Testament prophet.',
            answer: 'Isaiah',
            dailyDouble: true
        },
        "question_1000": {
            question: 'Matthew 23:4 reads, "For they bind heavy burdens and grievous to be borne, and lay them on men\'s shoulders; but they themselves will not move them with one of their fingers." Who is the "they" that Jesus was referring to in this verse?',
            answer: 'The scribes and Pharisees'
        }
    }
];
let finalJeopardy = {
    question: 'This is the total number of non-apocryphal books in the Old and New Testaments (hint: it\'s more than 5).',
    answer: '66'
};