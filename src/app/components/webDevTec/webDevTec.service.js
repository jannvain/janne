(function() {
  'use strict';

  angular
      .module('jv3')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
     /* {
        'title': 'Me',
        'description': 'I am what I am!',
        'logo': 'edu320px.png',
        'color': '#ff0000'

      },*/
      {
        'title': 'PORTFOLIO',
        'descriptions': ['Here are some illustrations of my R&D algorithm- and software-projects.',
        '<img class="modalImage" src="../assets/images/pf_sq_wo_tx.jpg"/>'
        ],
        'logo': 'portfolio320pxn.jpg',
        'color': '#00a7e2'
      },
      {
        'title': 'HOBBIES',
        'descriptions': ['Computers have been my hobby for a long time. I read a lot (tens of books per year, both Finnish and English), do some fishing, travelling, and occasional hiking in Lapland and renovate my house, built in 1950. I also started running in 2011 as a hobby to keep myself in a good condition. I have run almost 6000 km since then and did my first marathon in 2013. Thus, I am currently in my best physical condition during my whole adult life.',
          '<img class="modalImage" src="../assets/images/hobby_square_wo_text.jpg"/>'
        ],
        'logo': 'hobby320pxn.jpg',
        'color': '#61b54f'

      },
      {
        'title': 'EDUCATION',
        'descriptions': ['<span class="high">Master of Science</span> | Computer Science | Signal and image processing<br><span class="high2">Tampere University of Technology</span>',
        '<span class="high">Master of Arts</span> | Education | Math, computer science and class teacher<br><span class="high2">Tampere University</span>'
        ],
          'logo': 'edu320pxn.jpg',
        'color': '#ff7e20'

      },
      {
        'title': 'EXPERIENCE',
        'descriptions': ['<span class="high">Project manager, Tampere University of Technology, 1/2013</span><br>R&D projects in health care and personal wellness. Utilizing educational theories for creating user-centric solutions. Work included hands on programming of web services (Amazon/ Java/ Angular/ Bootstrap/ HTML5/ MySQL/ Git/ Sass/ Google Visualization). I also contributed to the teaching of health technology related courses, so I am familiar with health technology and related standards and regulations.',
          '<span class="high">Principal Researcher, NOKIA, 1/2009 – 8/2012</span><br>R&D concepting projects for novel mobile UI solutions for Nokia phones. Work consisted mobile learning related topics including one-year pilot in school. Based on the pilot, I developed a learning notebook concept for elementary schools. It was subcontracted and I was acting as a Scrum product owner. Concept was transferred to Tampere University and then to Microsoft and it got thousands of users.',
          '<span class="high">R&D team leader, NOKIA, 1/2007 – 12/2008</span><br>Team leader and line manager in Voice technology based UI team. Team concentrated on R&D for speech interfaces for mobile platforms and to provide software for Nokia business units. The software was implemented with C/C++. Team consisted of several nationalities (Russian, Indian, Hungarian, French, and Italian).  ',
          '<span class="high">R&D manager, NOKIA, 3/2004 – 12/2006</span><br>Team leader and line manager for Human interface concepts team. We worked on different health, audio and sensor technologies. I also participated developing first Nokia Health Diary software (C++). Our team collaborated with Finnish federation of visually impaired to develop accessibility software (C++) for mobile phones.',
          '<span class="high">Senior Research Engineer, NOKIA | 5/1994 – 2/2004</span><br>Work included various telecommunication R&D activities. I contributed to several international standards as a project manager and as a Nokia delegate in standardization meetings. In addition, I developed algorithms with C/C++/DSP-assembler and used Matlab for different simulation and prototyping needs.'],
        'logo': 'experience320pxn.jpg',
        'color': '#f3703e'

      },

      {
        'title': 'SKILLS',
        'descriptions': [
          'I have very long and multifaceted career in technology R&D in international and multi-cultural environment. My experience includes several years of project and line management (budget, strategy, development discussions, recruiting) and hands on software development and mobile UI-concepting in agile teams and projects.',
          'I am competent in modern web-based services for learning and personal wellness and related behavioral theories, UI-concepting, software and algorithm development, accessibility, telecommunication and health standards, IPR, DSP, signal processing, mobile technology and services, training and mobile learning. I am highly skilled in office tools and have good presentation skills due to my education and long international experience. ',
          'I have tens of granted patents and publications as a proof of my innovativeness and out of the box thinking. I am very persistent and aim for perfection and to see my work in action. I am familiar with commercial product development and recognize the importance of deadlines and schedules. I prefer user centric approach to the problems and technologies are mainly means to solve them. Thus, I am open to work any framework or technology best suited for the underlying problem. Due to my long background, I can easily master new frameworks and have motivation to do it.',
          'I am holding both technical and humanistic university degrees. I got my latest degree in 2015, which demonstrates my continuing motivation to acquire new skills. Thus, I can also understand non-technical viewpoints and people. I like small teams, which are the best environments for good productivity and innovation. I have also participated in big matrix-type of programs.',
          'Due to my wide experience and education, I can take many roles on the need basis: I can do customer project coordination, concepting and innovation and programming concepts from scratch including backend and front-end and related usability/user testing. I can give technical assistance to the sales team and any training or teaching activities are within my competence area. I can also help with patenting and IPR.'
        ],
        'logo': 'skills320pxn.jpg',
        'color': '#eff33e'

      }
      /*,{
       'title': 'CONTACT',
       'descriptions': 'My hobbies',
       'logo': 'hobby_sq_wo_tx_320px.jpg',
       'color': '#eff33e'

       }*/
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();
