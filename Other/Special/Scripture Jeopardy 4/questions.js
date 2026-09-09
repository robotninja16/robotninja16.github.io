//question: The question
//answer: A brief answer to the question
//reference: Optional - a reference to a source
//media: Optional - HTML content for special media like audio or images
//dailyDouble: Optional boolean - indicates whether the question is a daily double
let questions = [
    { // 1st category
        "question_200": {
            question: 'Who is this prophet?',
            media: '<img src="joseph_smith.jpeg" class="question-image">',
            answer: 'Joseph Smith'
        },
        "question_400": {
            question: 'Who is this prophet?',
            media: '<img src="thomas_s_monson.jpeg" class="question-image">',
            answer: 'Thomas S. Monson'
        },
        "question_600": {
            question: 'Who is this prophet?',
            media: '<img src="ezra_taft_benson.jpeg" class="question-image">',
            answer: 'Ezra Taft Benson'
        },
        "question_800": {
            question: 'Who is this prophet?',
            media: '<img src="heber_j_grant.jpeg" class="question-image">',
            answer: 'Heber J. Grant',
            dailyDouble: true
        },
        "question_1000": {
            question: 'Who is this prophet?',
            media: '<img src="george_albert_smith.jpeg" class="question-image">',
            answer: 'George Albert Smith'
        }
    },
    { // 2nd category
        "question_200": {
            question: 'There are this many tribes of Israel.',
            answer: '12'
        },
        "question_400": {
            question: 'This is the fourth book of the Old Testament.',
            answer: 'Numbers'
        },
        "question_600": {
            question: 'According to the book of Revelation, this is the number of a man.',
            answer: '666',
            reference: 'Revelation 13:18'
        },
        "question_800": {
            question: 'This is the number of people who were saved from the flood in Noah’s Ark.',
            answer: '8',
            reference: '1 Peter 3:20'
        },
        "question_1000": {
            question: 'According to the handbook, the bishop may choose to divide the deacons quorum if there are more than this number of deacons.',
            answer: '12',
            reference: 'General Handbook 10.1.5'
        }
    },
    { // 3rd category
        "question_200": {
            question: 'This modern-day prophet had a great vision, to which many said, "it was all of the devil, ... there [are] no such things as visions or revelations in these days; ... all such things had ceased with the apostles, and ... there would never be any more of them."',
            answer: 'Joseph Smith',
            reference: 'Joseph Smith—History 1:21'
        },
        "question_400": {
            question: 'This prophet called people to repent before a great flood. But the people said, in effect, "We are the sons of God. Our children are strong. We won\'t be destroyed. That\'s impossible."',
            answer: 'Noah',
            reference: 'Moses 8:20-21'
        },
        "question_600": {
            question: 'This book in the Book of Mormon tells us that after Nephi prophesied of the destruction of Nephite cities, many wicked people tried to convince others that "this is impossible".',
            answer: 'Helaman',
            reference: 'Helaman 8:6'
        },
        "question_800": {
            question: 'This man wrote that there would be many who say, "A Bible! A Bible! We have a Bible, and there cannot be any more Bible." Or, in other words, "God can\'t have more books. That\'s impossible."',
            answer: 'Nephi',
            reference: '2 Nephi 29:3'
        },
        "question_1000": {
            question: 'This son of Mosiah was preaching to the Lamanites, but was received poorly. In fact, an Amalekite told him, in effect, "You can\'t know our thoughts. You can\'t know that there is a God. It\'s impossible, and we won\'t believe you." This man had to be rescued by his brother later on, and had better preaching opportunities afterward.',
            answer: 'Ammon',
            reference: 'Alma 21:8'
        }
    },
    { // 4th category
        "question_200": {
            question: 'Before Nephi took it, who had this sword?',
            media: '<img src="sword_of_laban.jpeg" class="question-image">',
            answer: 'Laban'
        },
        "question_400": {
            question: 'In this picture, who does the sword belong to?',
            media: '<img src="moronis_sword.jpeg" class="question-image">',
            answer: 'Moroni'
        },
        "question_600": {
            question: 'Who does this sword belong to?',
            media: '<img src="ammons_sword.jpeg" class="question-image">',
            answer: 'Ammon'
        },
        "question_800": {
            question: 'What soldier is leading the people holding these swords?',
            media: '<img src="captain_moroni_swords.jpeg" class="question-image">',
            answer: 'Captain Moroni'
        },
        "question_1000": {
            question: 'Who had the dream of this statue? (*Didn\'t necessarily have a sword in the dream, but it\'s in the art.)',
            media: '<img src="nebuchadnezzars_dream_statue.jpeg" class="question-image">',
            answer: 'Nebuchadnezzar'
        }
    },
    { // 5th category
        "question_200": {
            question: 'What is this?',
            media: '<p>Have faith and repent</p><p>Be baptized and be confirmed</p><p>Article of faith</p>',
            answer: '4th Article of Faith'
        },
        "question_400": {
            question: 'Where is this?',
            media: '<p>Here, the walls fell down</p><p>Marching and blowing their horns</p><p>Israel conquered</p>',
            answer: 'Jericho'
        },
        "question_600": {
            question: 'Who is this?',
            media: '<p>Just one chapter</p><p>Caught up in praying all day</p><p>Nephew of Nephi</p>',
            answer: 'Enos',
            dailyDouble: true
        },
        "question_800": {
            question: 'What is this?',
            media: '<p>Given much later</p><p>For the book of commandments</p><p>But often read first</p>',
            answer: 'D&C 1'
        },
        "question_1000": {
            question: 'Who is the king?',
            media: '<p>Followed the prophet</p><p>A sick king made whole again</p><p>The shadow went back</p>',
            answer: 'Hezekiah',
            reference: '2 Kings 20:1-11'
        }
    },
    { // 6th category
        "question_200": {
            question: 'Author of the first book in the Book of Mormon. Spell his name.',
            answer: 'N E P H I'
        },
        "question_400": {
            question: 'Moses went to this mountain. Also called Mount Horeb. Spell its name.',
            answer: 'S I N A I'
        },
        "question_600": {
            question: 'This man helped hold up Moses\' arms in battle along with Aaron. Spell his name.',
            answer: 'H U R'
        },
        "question_800": {
            question: 'Any two of the brothers of Ammon, the son of Mosiah. Spell their names. (You only need two.)',
            answer: 'A A R O N,  O M N E R,  H I M N I'
        },
        "question_1000": {
            question: 'The father of both James and John in the New Testament. Spell his name.',
            answer: 'Z E B E D E E'
        }
    }
];
let finalJeopardy = {
    question: 'This is the number of years that Methuselah lived.',
    answer: '969'
};